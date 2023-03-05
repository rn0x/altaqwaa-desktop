const moment = require('moment-timezone');
const momentDurationFormatSetup = require("moment-duration-format");
const { Coordinates, CalculationMethod, PrayerTimes } = require('adhan');
momentDurationFormatSetup(moment);

module.exports = function adhanModule(path, fs, App_Path, location) {
    const settings = fs.readJsonSync(path.join(App_Path, './data/settings.json'));

    let coordinates = new Coordinates(location?.lat, location?.lon);
    let params = settings?.Calculation === 'MuslimWorldLeague' ? CalculationMethod.MuslimWorldLeague() : settings?.Calculation === 'Egyptian' ? CalculationMethod.Egyptian() : settings?.Calculation === 'Karachi' ? CalculationMethod.Karachi() : settings?.Calculation === 'UmmAlQura' ? CalculationMethod.UmmAlQura() : settings?.Calculation === 'Dubai' ? CalculationMethod.Dubai() : settings?.Calculation === 'Qatar' ? CalculationMethod.Qatar() : settings?.Calculation === 'Kuwait' ? CalculationMethod.Kuwait() : settings?.Calculation === 'Singapore' ? CalculationMethod.Singapore() : settings?.Calculation === 'Turkey' ? CalculationMethod.Turkey() : settings?.Calculation === 'Tehran' ? CalculationMethod.NorthAmerica() : CalculationMethod.NorthAmerica();
    let date = new Date();

    const prayerTimes = new PrayerTimes(coordinates, date, params);
    const nextPrayer = prayerTimes.nextPrayer();

    let now = moment().tz(location?.timezone);
    let end = moment(prayerTimes.timeForPrayer(nextPrayer)).tz(location?.timezone);
    let duration = moment.duration(end.diff(now));
    let remaining = duration.format('hh:mm:ss');

    return {
        isha: moment(prayerTimes.isha).tz(location?.timezone).format('h:mm A'),
        maghrib: moment(prayerTimes.maghrib).tz(location?.timezone).format('h:mm A'),
        asr: moment(prayerTimes.asr).tz(location?.timezone).format('h:mm A'),
        dhuhr: moment(prayerTimes.dhuhr).tz(location?.timezone).format('h:mm A'),
        fajr: moment(prayerTimes.fajr).tz(location?.timezone).format('h:mm A'),
        nextPrayer: nextPrayer,
        remainingNext: remaining,
        currentPrayer: prayerTimes.currentPrayer(),
    };
};