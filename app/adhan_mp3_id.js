const { ipcRenderer } = require('electron');
const moment = require('moment-timezone');
const fs = require('fs-extra');
const adhan = require('adhan');
const path = require('path');

module.exports = async function adhan_mp3_id(id) {

    setInterval(async () => {

        let App_Path = await ipcRenderer.invoke('electron-app-get-path');
        let date = new Date();
        let json_city = fs.readJsonSync(path.join(App_Path, '/json/city.json'));
        let coordinates = new adhan.Coordinates(json_city.latitude, json_city.longitude);
        let params = adhan.CalculationMethod.MuslimWorldLeague()
        let prayerTimes = new adhan.PrayerTimes(coordinates, date, params);
        let next = prayerTimes.nextPrayer();
        let timezone = json_city.timezone;
        let nextPrayerTime = prayerTimes.timeForPrayer(next);

        let adhan_mp3 = document.getElementById(id);
        if (moment(nextPrayerTime).tz(timezone).subtract(1, "minutes").format('h:mm A') === moment().tz(timezone).format('h:mm A') && next.toLocaleLowerCase() !== 'fajr' && next.toLocaleLowerCase() !== 'sunrise') {
            adhan_mp3.src = path.join(App_Path, '/mp3/001.mp3')
        }
        else if (moment(nextPrayerTime).tz(timezone).subtract(1, "minutes").format('h:mm A') === moment().tz(timezone).format('h:mm A') && next.toLocaleLowerCase() === 'fajr' && next.toLocaleLowerCase() !== 'sunrise') {
            adhan_mp3.src = path.join(App_Path, '/mp3/002.mp3')
        }

    }, 60000);
}