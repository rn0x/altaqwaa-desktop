const momentHj = require('moment-hijri');
const moment = require('moment-timezone');
const fs = require('fs-extra');
const path = require('path');
const {
    fajrTime,
    dhuhrTime,
    asrTime,
    maghribTime,
    ishaTime,
    remaining,
    NextPrayer,
    NewPrayerTimes
} = require('../module/adhan.js')
momentHj.locale('en-EN')

module.exports = function prayer_time(App_Path) {

    if (document.getElementById('prayer_time')) {

        let location = fs.readJsonSync(path.join(App_Path, './data/location.json'));
        let data_hijri = document.getElementById('data_hijri');
        let data_Gregorian = document.getElementById('data_Gregorian');
        let datoday = document.getElementById('datoday');
        let country = document.getElementById('country');
        let hour_minutes = document.getElementById('hour_minutes');
        let seconds = document.getElementById('seconds');
        let time_fajr = document.getElementById('time_fajr');
        let time_dhuhr = document.getElementById('time_dhuhr');
        let time_asr = document.getElementById('time_asr');
        let time_maghrib = document.getElementById('time_maghrib');
        let time_isha = document.getElementById('time_isha');
        let fajr_li = document.getElementById('fajr_li');
        let dhuhr_li = document.getElementById('dhuhr_li');
        let asr_li = document.getElementById('asr_li');
        let maghrib_li = document.getElementById('maghrib_li');
        let isha_li = document.getElementById('isha_li');
        let remaining_ = document.getElementById('remaining');
        let remaining_time = document.getElementById('remaining_time');
        let remaining_name = document.getElementById('remaining_name');
        data_hijri.innerText = momentHj().format('iYYYY/iM/iD');
        data_Gregorian.innerText = momentHj().format('YYYY/M/D');
        datoday.innerText = momentHj().locale('ar-SA').format('dddd');
        hour_minutes.innerText = moment().tz(location?.timezone).format('h:mm');
        seconds.innerText = moment().tz(location?.timezone).format(': ss A');
        remaining_time.innerText = remaining(NewPrayerTimes(App_Path), App_Path);
        remaining_name.innerText = NextPrayer(NewPrayerTimes(App_Path));
        time_fajr.innerText = fajrTime(NewPrayerTimes(App_Path), App_Path);
        time_dhuhr.innerText = dhuhrTime(NewPrayerTimes(App_Path), App_Path);
        time_asr.innerText = asrTime(NewPrayerTimes(App_Path), App_Path);
        time_maghrib.innerText = maghribTime(NewPrayerTimes(App_Path), App_Path);
        time_isha.innerText = ishaTime(NewPrayerTimes(App_Path), App_Path);

        if (location?.country && location?.regionName && location?.city) {

            country.innerHTML = `${location?.country} ${location?.regionName} <span id="city">${location?.city}</span>`
            country.style.display = 'block'
        }

        else if (location?.country === undefined) {

            country.innerHTML = ''
            country.style.display = 'none'
        }

        else if (NextPrayer(NewPrayerTimes(App_Path)) === 'لايوجد') {

            remaining_.style.display = 'none'
            remaining_time.style.display = 'none'
            fajr_li.style.background = null
            dhuhr_li.style.background = null
            asr_li.style.background = null
            maghrib_li.style.background = null
            isha_li.style.background = null

        }

        else if (NextPrayer(NewPrayerTimes(App_Path)) === 'الفجر') {

            remaining_.style.display = 'block'
            remaining_time.style.display = 'block'
            fajr_li.style.background = '#6bc077'
            dhuhr_li.style.background = null
            asr_li.style.background = null
            maghrib_li.style.background = null
            isha_li.style.background = null

        }

        else if (NextPrayer(NewPrayerTimes(App_Path)) === 'الظهر') {

            remaining_.style.display = 'block'
            remaining_time.style.display = 'block'
            fajr_li.style.background = null
            dhuhr_li.style.background = '#6bc077'
            asr_li.style.background = null
            maghrib_li.style.background = null
            isha_li.style.background = null

        }

        else if (NextPrayer(NewPrayerTimes(App_Path)) === 'العصر') {

            remaining_.style.display = 'block'
            remaining_time.style.display = 'block'
            fajr_li.style.background = null
            dhuhr_li.style.background = null
            asr_li.style.background = '#6bc077'
            maghrib_li.style.background = null
            isha_li.style.background = null

        }

        else if (NextPrayer(NewPrayerTimes(App_Path)) === 'المغرب') {

            remaining_.style.display = 'block'
            remaining_time.style.display = 'block'
            fajr_li.style.background = null
            dhuhr_li.style.background = null
            asr_li.style.background = null
            maghrib_li.style.background = '#6bc077'
            isha_li.style.background = null

        }

        else if (NextPrayer(NewPrayerTimes(App_Path)) === 'العشاء') {

            remaining_.style.display = 'block'
            remaining_time.style.display = 'block'
            fajr_li.style.background = null
            dhuhr_li.style.background = null
            asr_li.style.background = null
            maghrib_li.style.background = null
            isha_li.style.background = '#6bc077'

        }

        setInterval(() => {

            data_hijri.innerText = momentHj().format('iYYYY/iM/iD');
            data_Gregorian.innerText = momentHj().format('YYYY/M/D');
            datoday.innerText = momentHj().locale('ar-SA').format('dddd');
            hour_minutes.innerText = moment().tz(location?.timezone).format('h:mm');
            seconds.innerText = moment().tz(location?.timezone).format(': ss A');
            remaining_time.innerText = remaining(NewPrayerTimes(App_Path), App_Path);
            remaining_name.innerText = NextPrayer(NewPrayerTimes(App_Path));
            time_fajr.innerText = fajrTime(NewPrayerTimes(App_Path), App_Path);
            time_dhuhr.innerText = dhuhrTime(NewPrayerTimes(App_Path), App_Path);
            time_asr.innerText = asrTime(NewPrayerTimes(App_Path), App_Path);
            time_maghrib.innerText = maghribTime(NewPrayerTimes(App_Path), App_Path);
            time_isha.innerText = ishaTime(NewPrayerTimes(App_Path), App_Path);

            if (NextPrayer(NewPrayerTimes(App_Path)) === 'لايوجد') {

                remaining_.style.display = 'none'
                remaining_time.style.display = 'none'
                fajr_li.style.background = null
                dhuhr_li.style.background = null
                asr_li.style.background = null
                maghrib_li.style.background = null
                isha_li.style.background = null

            }

            else if (NextPrayer(NewPrayerTimes(App_Path)) === 'الفجر') {

                remaining_.style.display = 'block'
                remaining_time.style.display = 'block'
                fajr_li.style.background = '#6bc077'
                dhuhr_li.style.background = null
                asr_li.style.background = null
                maghrib_li.style.background = null
                isha_li.style.background = null

            }

            else if (NextPrayer(NewPrayerTimes(App_Path)) === 'الظهر') {

                remaining_.style.display = 'block'
                remaining_time.style.display = 'block'
                fajr_li.style.background = null
                dhuhr_li.style.background = '#6bc077'
                asr_li.style.background = null
                maghrib_li.style.background = null
                isha_li.style.background = null

            }

            else if (NextPrayer(NewPrayerTimes(App_Path)) === 'العصر') {

                remaining_.style.display = 'block'
                remaining_time.style.display = 'block'
                fajr_li.style.background = null
                dhuhr_li.style.background = null
                asr_li.style.background = '#6bc077'
                maghrib_li.style.background = null
                isha_li.style.background = null

            }

            else if (NextPrayer(NewPrayerTimes(App_Path)) === 'المغرب') {

                remaining_.style.display = 'block'
                remaining_time.style.display = 'block'
                fajr_li.style.background = null
                dhuhr_li.style.background = null
                asr_li.style.background = null
                maghrib_li.style.background = '#6bc077'
                isha_li.style.background = null

            }

            else if (NextPrayer(NewPrayerTimes(App_Path)) === 'العشاء') {

                remaining_.style.display = 'block'
                remaining_time.style.display = 'block'
                fajr_li.style.background = null
                dhuhr_li.style.background = null
                asr_li.style.background = null
                maghrib_li.style.background = null
                isha_li.style.background = '#6bc077'

            }
        }, 1000);




    }

}