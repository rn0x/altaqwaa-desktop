const { ipcRenderer } = require('electron');
const adhan = require('adhan');
const moment = require('moment-timezone');
const fs = require('fs-extra');
const time_header_id = require('../time_header_id');
const path = require('path');

module.exports = async function class_adhan() {

    let App_Path = await ipcRenderer.invoke('electron-app-get-path');
    let json_city = fs.readJsonSync(path.join(App_Path, '/json/city.json'));
    let prayerTimes = new adhan.PrayerTimes(new adhan.Coordinates(json_city.latitude, json_city.longitude), new Date(), adhan.CalculationMethod.MuslimWorldLeague());

    document.getElementById('adhan_now').innerHTML = prayerTimes.currentPrayer().toLocaleLowerCase() === 'none' ? 'لايوجد' : prayerTimes.currentPrayer().toLocaleLowerCase() === 'fajr' ? 'الفجر' : prayerTimes.currentPrayer().toLocaleLowerCase() === 'sunrise' ? 'الضحى' : prayerTimes.currentPrayer().toLocaleLowerCase() === 'dhuhr' ? 'الظهر' : prayerTimes.currentPrayer().toLocaleLowerCase() === 'asr' ? 'العصر' : prayerTimes.currentPrayer().toLocaleLowerCase() === 'maghrib' ? 'المغرب' : prayerTimes.currentPrayer().toLocaleLowerCase() === 'isha' ? 'العشاء' : ' ';
    document.getElementById('adhan_next').innerHTML = prayerTimes.nextPrayer().toLocaleLowerCase() === 'none' ? 'لايوجد' : prayerTimes.nextPrayer().toLocaleLowerCase() === 'fajr' ? 'الفجر' : prayerTimes.nextPrayer().toLocaleLowerCase() === 'sunrise' ? 'الضحى' : prayerTimes.nextPrayer().toLocaleLowerCase() === 'dhuhr' ? 'الظهر' : prayerTimes.nextPrayer().toLocaleLowerCase() === 'asr' ? 'العصر' : prayerTimes.nextPrayer().toLocaleLowerCase() === 'maghrib' ? 'المغرب' : prayerTimes.nextPrayer().toLocaleLowerCase() === 'isha' ? 'العشاء' : ' ';
    document.getElementById('time_adhan_next').innerHTML = moment(prayerTimes.timeForPrayer(prayerTimes.nextPrayer())).tz(json_city.timezone).format('h:mm A'); // وقت الصلاة القادمة
    document.getElementById('fajr').innerHTML = moment(prayerTimes.fajr).tz(json_city.timezone).format('h:mm A');
    document.getElementById('sunrise').innerHTML = moment(prayerTimes.sunrise).tz(json_city.timezone).format('h:mm A');
    document.getElementById('dhuhr').innerHTML = moment(prayerTimes.dhuhr).tz(json_city.timezone).format('h:mm A');
    document.getElementById('asr').innerHTML = moment(prayerTimes.asr).tz(json_city.timezone).format('h:mm A');
    document.getElementById('maghrib').innerHTML = moment(prayerTimes.maghrib).tz(json_city.timezone).format('h:mm A');
    document.getElementById('isha').innerHTML = moment(prayerTimes.isha).tz(json_city.timezone).format('h:mm A');
    document.getElementById('city').innerHTML = json_city.name

    setInterval(async () => {
        let date = new Date();
        let options = '';
        let sleep = (time) => new Promise(resolve => setTimeout(resolve, time));
        let json_city = fs.readJsonSync(path.join(App_Path, '/json/city.json'));
        let coordinates = new adhan.Coordinates(json_city.latitude, json_city.longitude);
        let params = adhan.CalculationMethod.MuslimWorldLeague()
        let prayerTimes = new adhan.PrayerTimes(coordinates, date, params);
        let current = prayerTimes.currentPrayer()
        let next = prayerTimes.nextPrayer();
        let timezone = json_city.timezone;
        let nextPrayerTime = prayerTimes.timeForPrayer(next);
        let fajrTime = moment(prayerTimes.fajr).tz(timezone).format('h:mm A');
        let sunriseTime = moment(prayerTimes.sunrise).tz(timezone).format('h:mm A');
        let dhuhrTime = moment(prayerTimes.dhuhr).tz(timezone).format('h:mm A');
        let asrTime = moment(prayerTimes.asr).tz(timezone).format('h:mm A');
        let maghribTime = moment(prayerTimes.maghrib).tz(timezone).format('h:mm A');
        let ishaTime = moment(prayerTimes.isha).tz(timezone).format('h:mm A');
        let adhan_now = document.getElementById('adhan_now');
        let adhan_next = document.getElementById('adhan_next');
        let time_adhan_next = document.getElementById('time_adhan_next');
        let fajr = document.getElementById('fajr');
        let sunrise = document.getElementById('sunrise');
        let dhuhr = document.getElementById('dhuhr');
        let asr = document.getElementById('asr');
        let maghrib = document.getElementById('maghrib');
        let isha = document.getElementById('isha');
        let city = document.getElementById('city');
        let current_ar = current.toLocaleLowerCase() === 'none' ? 'لايوجد' : current.toLocaleLowerCase() === 'fajr' ? 'الفجر' : current.toLocaleLowerCase() === 'sunrise' ? 'الضحى' : current.toLocaleLowerCase() === 'dhuhr' ? 'الظهر' : current.toLocaleLowerCase() === 'asr' ? 'العصر' : current.toLocaleLowerCase() === 'maghrib' ? 'المغرب' : current.toLocaleLowerCase() === 'isha' ? 'العشاء' : ' ';
        let next_ar = next.toLocaleLowerCase() === 'none' ? 'لايوجد' : next.toLocaleLowerCase() === 'fajr' ? 'الفجر' : next.toLocaleLowerCase() === 'sunrise' ? 'الضحى' : next.toLocaleLowerCase() === 'dhuhr' ? 'الظهر' : next.toLocaleLowerCase() === 'asr' ? 'العصر' : next.toLocaleLowerCase() === 'maghrib' ? 'المغرب' : next.toLocaleLowerCase() === 'isha' ? 'العشاء' : ' ';

        adhan_now.innerHTML = current_ar // الصلاة الحالية
        adhan_next.innerHTML = next_ar // = الصلاة القادمة
        time_adhan_next.innerHTML = moment(nextPrayerTime).tz(timezone).format('h:mm A'); // وقت الصلاة القادمة
        fajr.innerHTML = fajrTime
        sunrise.innerHTML = sunriseTime
        dhuhr.innerHTML = dhuhrTime
        asr.innerHTML = asrTime
        maghrib.innerHTML = maghribTime
        isha.innerHTML = ishaTime
        city.innerHTML = json_city.name

        document.querySelector('#submit_country_Submit').onclick = async (event) => {

            event.preventDefault();
            let country = document.querySelector('#select_country').value
            let json_country = fs.readJsonSync(path.join(App_Path, `/json/${country}.json`));

            for (let lop of json_country) {

                options += `<option id="${lop.name}">` + lop.name + "</option>";
            }

            document.getElementById('select_city').innerHTML = options
            options = null

            document.querySelector('#submit_city_Submit').onclick = async (event) => {

                event.preventDefault();


                for (let lop2 of json_country) {

                    //fs.writeJsonSync('./json/sa.json',Object.assign([], json_sa, delete lop2.regionCode), { spaces: '\t' })

                    if (lop2.name === document.querySelector('#select_city').value) {

                        let date = new Date();
                        let json_city = fs.readJsonSync(path.join(App_Path, '/json/city.json'));
                        let coordinates = new adhan.Coordinates(lop2.latitude, lop2.longitude);
                        let params = adhan.CalculationMethod.MuslimWorldLeague();
                        let prayerTimes = new adhan.PrayerTimes(coordinates, date, params);
                        let current = prayerTimes.currentPrayer()
                        let next = prayerTimes.nextPrayer();
                        let nextPrayerTime = prayerTimes.timeForPrayer(next);
                        let timezone = lop2.timezone;
                        let fajrTime = moment(prayerTimes.fajr).tz(timezone).format('h:mm A');
                        let sunriseTime = moment(prayerTimes.sunrise).tz(timezone).format('h:mm A');
                        let dhuhrTime = moment(prayerTimes.dhuhr).tz(timezone).format('h:mm A');
                        let asrTime = moment(prayerTimes.asr).tz(timezone).format('h:mm A');
                        let maghribTime = moment(prayerTimes.maghrib).tz(timezone).format('h:mm A');
                        let ishaTime = moment(prayerTimes.isha).tz(timezone).format('h:mm A');
                        let current_ar = current.toLocaleLowerCase() === 'none' ? 'لايوجد' : current.toLocaleLowerCase() === 'fajr' ? 'الفجر' : current.toLocaleLowerCase() === 'sunrise' ? 'الضحى' : current.toLocaleLowerCase() === 'dhuhr' ? 'الظهر' : current.toLocaleLowerCase() === 'asr' ? 'العصر' : current.toLocaleLowerCase() === 'maghrib' ? 'المغرب' : current.toLocaleLowerCase() === 'isha' ? 'العشاء' : ' ';
                        let next_ar = next.toLocaleLowerCase() === 'none' ? 'لايوجد' : next.toLocaleLowerCase() === 'fajr' ? 'الفجر' : next.toLocaleLowerCase() === 'sunrise' ? 'الضحى' : next.toLocaleLowerCase() === 'dhuhr' ? 'الظهر' : next.toLocaleLowerCase() === 'asr' ? 'العصر' : next.toLocaleLowerCase() === 'maghrib' ? 'المغرب' : next.toLocaleLowerCase() === 'isha' ? 'العشاء' : ' '


                        adhan_now.innerHTML = current_ar // الصلاة الحالية
                        adhan_next.innerHTML = next_ar // = الصلاة القادمة
                        time_adhan_next.innerHTML = moment(nextPrayerTime).tz(timezone).format('h:mm A'); // وقت الصلاة القادمة
                        fajr.innerHTML = fajrTime
                        sunrise.innerHTML = sunriseTime
                        dhuhr.innerHTML = dhuhrTime
                        asr.innerHTML = asrTime
                        maghrib.innerHTML = maghribTime
                        isha.innerHTML = ishaTime
                        city.innerHTML = lop2.name

                        fs.writeJsonSync(path.join(App_Path, '/json/city.json'), Object.assign({}, json_city, {
                            "name": lop2.name,
                            "latitude": lop2.latitude,
                            "longitude": lop2.longitude,
                            "timezone": lop2.timezone
                        }), { spaces: '\t' });

                        time_header_id('time_header_1');

                        await sleep(1000);

                    }

                }

            };
        }
    }, 1000);

}