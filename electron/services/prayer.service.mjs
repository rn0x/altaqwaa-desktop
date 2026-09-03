/* Prayer times service: 100% local — computes from coordinates stored in
 * settings (user-entered). No external APIs. */

import moment from 'moment-timezone';
import momentDurationFormatSetup from 'moment-duration-format';
import { Coordinates, CalculationMethod, CalculationParameters, PrayerTimes } from 'adhan';
import logger from '../core/logger.mjs';

momentDurationFormatSetup(moment);

export const METHODS = ['UmmAlQura', 'MuslimWorldLeague', 'Egyptian', 'Karachi', 'Dubai', 'Qatar', 'Kuwait', 'Singapore', 'Turkey', 'Tehran', 'France'];

const ORDER = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];

function paramsFor(method) {
    const map = {
        MuslimWorldLeague: CalculationMethod.MuslimWorldLeague(),
        Egyptian: CalculationMethod.Egyptian(),
        Karachi: CalculationMethod.Karachi(),
        UmmAlQura: CalculationMethod.UmmAlQura(),
        Dubai: CalculationMethod.Dubai(),
        Qatar: CalculationMethod.Qatar(),
        Kuwait: CalculationMethod.Kuwait(),
        Singapore: CalculationMethod.Singapore(),
        Turkey: CalculationMethod.Turkey(),
        Tehran: CalculationMethod.NorthAmerica(),
        /* The adhan library does not ship a "France" method in v4, so build
         * it from the UOIF (Union des organisations islamiques de France)
         * parameters: a fixed angle method (Approximate) with 12° for both
         * Fajr and Isha (Issue #58). */
        France: (() => {
            const p = new CalculationParameters('France');
            p.fajrAngle = 12;
            p.ishaAngle = 12;
            return p;
        })(),
    };
    return map[method] || CalculationMethod.NorthAmerica();
}

function tzOf(settings) {
    return settings?.prayer_timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
}

/* The location's civil date expressed as a UTC-based Date. The adhan
 * library derives the calendar day from the date it is given (via
 * getFullYear/getMonth/getDate). Using Date.UTC ensures the civil date
 * matches the prayer location regardless of the device's timezone.
 *
 * NOTE: we read the date components with numeric getters (m.year(),
 * m.month(), m.date()) rather than .format('YYYY-MM-DD'). The calendar
 * service imports `moment-hijri`, which switches the GLOBAL moment locale
 * to `ar-sa`; under that locale .format() emits Arabic-Indic digits
 * (٢٠٢٦) which Number() cannot parse, silently producing an Invalid Date.
 * Numeric getters are locale-independent, so the civil date is always
 * correct. */
function locationMidnight(now, tz) {
    const m = moment.tz(now, tz);
    return new Date(Date.UTC(m.year(), m.month(), m.date()));
}

/* The adhan library builds its results as absolute UTC instants. */
function toInstant(dt) {
    return dt && !Number.isNaN(dt.getTime()) ? dt.getTime() : null;
}

/* All five instants (plus sunrise) as absolute ms timestamps — the same
 * values used for display, countdown and the notification timers, so every
 * consumer sees one consistent, exact schedule. */
function computeInstants(settings, at) {
    const lat = Number(settings?.prayer_lat);
    const lon = Number(settings?.prayer_lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        return { error: 'no_location' };
    }
    try {
        const tz = tzOf(settings);
        const now = at instanceof Date ? at : new Date();
        const params = paramsFor(settings?.Calculation || 'UmmAlQura');
        const pt = new PrayerTimes(new Coordinates(lat, lon), locationMidnight(now, tz), params);
        return {
            tz,
            now,
            instants: {
                fajr: toInstant(pt.fajr),
                sunrise: toInstant(pt.sunrise),
                dhuhr: toInstant(pt.dhuhr),
                asr: toInstant(pt.asr),
                maghrib: toInstant(pt.maghrib),
                isha: toInstant(pt.isha),
            },
        };
    } catch (e) {
        logger.error('Prayer times failed', { error: e.message, stack: String(e && e.stack || '') });
        return { error: 'calculation_failed' };
    }
}

/* Coordinates come from settings (prayer_lat / prayer_lon) — user-entered, local. */
export function times(settings) {
    const r = computeInstants(settings);
    if (r.error) return { error: r.error };
    const { instants, tz, now } = r;
    const nowMs = now.getTime();

    /* next prayer = first instant strictly after now; after Isha roll to
     * tomorrow's Fajr (matches the old sunrise/none handling). */
    let nextKey = null;
    let nextMs = null;
    for (const key of ORDER) {
        const ms = instants[key];
        if (ms != null && ms > nowMs) { nextKey = key; nextMs = ms; break; }
    }
    if (!nextMs || nextMs <= nowMs) {
        /* After Isha: compute tomorrow's Fajr. Use locationMidnight with
         * +1 day in the location's timezone so the civil date is always
         * correct even when the device timezone differs. */
        const tomorrowLoc = moment.tz(now, tz).add(1, 'day').toDate();
        const tomorrow = computeInstants(settings, tomorrowLoc);
        if (!tomorrow.error && tomorrow.instants.fajr != null && tomorrow.instants.fajr > nowMs) {
            nextKey = 'fajr';
            nextMs = tomorrow.instants.fajr;
        }
    }

    const dur = nextMs != null ? moment.duration(nextMs - nowMs) : null;
    const remaining = dur && dur.isValid() && dur.asMilliseconds() > 0
        ? dur.locale('en').format('hh:mm:ss', { trim: false })
        : '00:00:00';
    /* Arabic locale renders numbers as Arabic-Indic digits (٠١٢…) which breaks
     * the renderer countdown regex — return plain ASCII digits for the timer. */
    const toAscii = (s) => String(s).replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
    /* Force English formatting: moment-hijri sets the global locale to
     * `ar-sa`, whose format('h:mm A') emits Arabic-Indic digits (٤:٣٢ ص)
     * that the renderer countdown regex cannot parse. Rendering in English
     * keeps the display consistent and machine-parseable. */
    const fmt = (ms) => (ms != null ? moment(ms).tz(tz).locale('en').format('h:mm A') : '--:--');

    /* current prayer = most recently started (sunrise is not a prayer);
     * currentPrayerAt = its adhan instant (ms) so the UI can show an
     * elapsed-since-adhan counter */
    let current = 'none';
    let currentAt = null;
    for (const key of ORDER) {
        if (key === 'sunrise') continue;
        const ms = instants[key];
        if (ms != null && ms <= nowMs) { current = key; currentAt = ms; }
    }

    return {
        fajr: fmt(instants.fajr),
        sunrise: fmt(instants.sunrise),
        dhuhr: fmt(instants.dhuhr),
        asr: fmt(instants.asr),
        maghrib: fmt(instants.maghrib),
        isha: fmt(instants.isha),
        nextPrayer: nextKey || 'none',
        remainingNext: remaining === '00:00:00' ? '00:00:00' : toAscii(remaining),
        currentPrayer: current,
        currentPrayerAt: currentAt,
    };
}

/* Absolute timestamps (ms) of today's five prayer instants — used by the
 * notification service to arm precise timers without doing timezone math
 * on the formatted strings. */
export function targets(settings) {
    const r = computeInstants(settings);
    if (r.error) return { error: r.error };
    return r.instants;
}
