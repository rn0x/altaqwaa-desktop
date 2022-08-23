const moment = require('moment-timezone');
const momentDurationFormatSetup = require("moment-duration-format");
const fs = require('fs-extra');
const path = require('path');
const {
    Coordinates,
    CalculationMethod,
    PrayerTimes,
    Prayer,
    Madhab
} = require('adhan');
const { ipcRenderer } = require('electron');

momentDurationFormatSetup(moment);

function NewPrayerTimes(App_Path) {

    let location = fs.readJsonSync(path.join(App_Path, './data/location.json'));
    let settings = fs.readJsonSync(path.join(App_Path, './data/settings.json'));
    let coordinates = new Coordinates(location?.lat, location?.lon);
    let params = settings?.Calculation === 'MuslimWorldLeague' ? CalculationMethod.MuslimWorldLeague() : settings?.Calculation === 'Egyptian' ? CalculationMethod.Egyptian() : settings?.Calculation === 'Karachi' ? CalculationMethod.Karachi() : settings?.Calculation === 'UmmAlQura' ? CalculationMethod.UmmAlQura() : settings?.Calculation === 'Dubai' ? CalculationMethod.Dubai() : settings?.Calculation === 'Qatar' ? CalculationMethod.Qatar() : settings?.Calculation === 'Kuwait' ? CalculationMethod.Kuwait() : settings?.Calculation === 'Singapore' ? CalculationMethod.Singapore() : settings?.Calculation === 'Turkey' ? CalculationMethod.Turkey() : settings?.Calculation === 'Tehran' ? CalculationMethod.NorthAmerica() : CalculationMethod.NorthAmerica();
    let date = new Date();

    return new PrayerTimes(coordinates, date, params);

}

function CurrentPrayer(NewPrayerTimes) {

    let prayerTimes = NewPrayerTimes;

    if (prayerTimes.currentPrayer() === 'fajr') {
        return 'الفجر'
    }
    else if (prayerTimes.currentPrayer() === 'dhuhr') {
        return 'الظهر'
    }
    else if (prayerTimes.currentPrayer() === 'asr') {
        return 'العصر'
    }
    else if (prayerTimes.currentPrayer() === 'maghrib') {
        return 'المغرب'
    }
    else if (prayerTimes.currentPrayer() === 'isha') {
        return 'العشاء'
    }
    else {
        return 'لايوجد'
    }

}


function NextPrayer(NewPrayerTimes) {

    let prayerTimes = NewPrayerTimes;

    if (prayerTimes.nextPrayer() === 'fajr') {
        return 'الفجر'
    }
    else if (prayerTimes.nextPrayer() === 'dhuhr') {
        return 'الظهر'
    }
    else if (prayerTimes.nextPrayer() === 'asr') {
        return 'العصر'
    }
    else if (prayerTimes.nextPrayer() === 'maghrib') {
        return 'المغرب'
    }
    else if (prayerTimes.nextPrayer() === 'isha') {
        return 'العشاء'
    }
    else {
        return 'لايوجد'
    }

}

function remaining(NewPrayerTimes, App_Path) {

    let prayerTimes = NewPrayerTimes;
    let location = fs.readJsonSync(path.join(App_Path, './data/location.json'));
    let now = moment().tz(location?.timezone);
    let end = moment(prayerTimes.timeForPrayer(prayerTimes.nextPrayer())).tz(location?.timezone);
    let duration = moment.duration(end.diff(now));
    // let remaining = duration.format('h [ساعة] m [دقيقة] s [ثانية]');
    let remaining = duration.format('hh:mm:ss');

    return remaining

}

function fajrTime(NewPrayerTimes, App_Path) {

    let prayerTimes = NewPrayerTimes;
    let location = fs.readJsonSync(path.join(App_Path, './data/location.json'));
    return moment(prayerTimes.fajr).tz(location?.timezone).format('h:mm A');
    
}

function dhuhrTime(NewPrayerTimes, App_Path) {

    let prayerTimes = NewPrayerTimes;
    let location = fs.readJsonSync(path.join(App_Path, './data/location.json'));
    return moment(prayerTimes.dhuhr).tz(location?.timezone).format('h:mm A');
    
}

 function asrTime(NewPrayerTimes, App_Path) {

    let prayerTimes = NewPrayerTimes;
    let location = fs.readJsonSync(path.join(App_Path, './data/location.json'));
    return moment(prayerTimes.asr).tz(location?.timezone).format('h:mm A');
    
}

function maghribTime(NewPrayerTimes, App_Path) {

    let prayerTimes = NewPrayerTimes;
    let location = fs.readJsonSync(path.join(App_Path, './data/location.json'));
    return moment(prayerTimes.maghrib).tz(location?.timezone).format('h:mm A');
    
}

function ishaTime(NewPrayerTimes, App_Path) {

    let prayerTimes = NewPrayerTimes;
    let location = fs.readJsonSync(path.join(App_Path, './data/location.json'));
    return moment(prayerTimes.isha).tz(location?.timezone).format('h:mm A');
    
}


module.exports = {
    fajrTime,
    dhuhrTime,
    asrTime,
    maghribTime,
    ishaTime,
    remaining,
    NextPrayer,
    CurrentPrayer,
    NewPrayerTimes
}

