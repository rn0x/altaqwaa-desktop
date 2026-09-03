import { test } from 'node:test';
import assert from 'node:assert';
import { METHODS, times } from '../electron/services/prayer.service.mjs';

const paris = {
    prayer_lat: '48.8566',
    prayer_lon: '2.3522',
    prayer_timezone: 'Europe/Paris',
    Calculation: 'France',
};

test('METHODS includes the France (UOIF) calculation method', () => {
    assert.ok(METHODS.includes('France'), 'France should be listed in METHODS');
});

test('times() works with the France method for Paris', () => {
    const r = times(paris);
    assert.ok(!r.error, `should not error, got ${r.error}`);
    for (const key of ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha']) {
        assert.notStrictEqual(r[key], '--:--', `${key} should have a value`);
    }
});

test('times() still works for other methods (Egyptian, Cairo)', () => {
    const egypt = {
        prayer_lat: '30.0444',
        prayer_lon: '31.2357',
        prayer_timezone: 'Africa/Cairo',
        Calculation: 'Egyptian',
    };
    const r = times(egypt);
    assert.ok(!r.error, `should not error, got ${r.error}`);
    assert.notStrictEqual(r.maghrib, '--:--');
});

test('times() reports no_location when coordinates are missing', () => {
    const r = times({ Calculation: 'France' });
    assert.strictEqual(r.error, 'no_location');
});
