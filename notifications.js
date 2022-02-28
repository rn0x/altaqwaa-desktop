const { Notification } = require('electron');
const fs = require('fs-extra');
const adhan = require('adhan');
const moment = require('moment-timezone');
const path = require('path');

module.exports = async function notification(GetPath) {

    setInterval(async() => {

        let date = new Date();
        let json_city = fs.readJsonSync(path.join(GetPath, '/json/city.json'));
        let coordinates = new adhan.Coordinates(json_city.latitude, json_city.longitude);
        let params = adhan.CalculationMethod.MuslimWorldLeague()
        let prayerTimes = new adhan.PrayerTimes(coordinates, date, params);
        let next = prayerTimes.nextPrayer();
        let timezone = json_city.timezone;
        let nextPrayerTime = prayerTimes.timeForPrayer(next);
        let next_ar = next.toLocaleLowerCase() === 'none' ? 'لايوجد' : next.toLocaleLowerCase() === 'fajr' ? 'الفجر' : next.toLocaleLowerCase() === 'sunrise' ? 'الضحى' : next.toLocaleLowerCase() === 'dhuhr' ? 'الظهر' : next.toLocaleLowerCase() === 'asr' ? 'العصر' : next.toLocaleLowerCase() === 'maghrib' ? 'المغرب' : next.toLocaleLowerCase() === 'isha' ? 'العشاء' : ' ';

        if (moment(nextPrayerTime).tz(timezone).subtract(1, "minutes").format('h:mm A') === moment().tz(timezone).format('h:mm A')) {

            new Notification({ 
                title: `صلاة ${next_ar}`,
                body: `حان موعد صلاة ${next_ar}\n ${moment(nextPrayerTime).tz(timezone).format('h:mm A')}` ,
                silent: true,
                icon: path.join(__dirname, '/build/icons/icon.png'),
                urgency: "critical"
            }).show()

        }

    }, 60000);

}