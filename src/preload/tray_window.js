const { ipcRenderer } = require('electron');
const momentHj = require('moment-hijri');
const moment = require('moment-timezone');
const fs = require('fs-extra');
const path = require('path');
const {
    remaining,
    NextPrayer,
    NewPrayerTimes
} = require('../modules/adhan.js')
momentHj.locale('en-EN')
 
window.addEventListener('DOMContentLoaded', async (e) => {

    e.preventDefault();
    let App_Path = await ipcRenderer.invoke('App_Path2');
    let location = fs.readJsonSync(path.join(App_Path, './data/location.json'));
    let data_hijri = document.getElementById('data_hijri');
    let data_Gregorian = document.getElementById('data_Gregorian');
    let datoday = document.getElementById('datoday');
    let hour_minutes = document.getElementById('hour_minutes');
    let seconds = document.getElementById('seconds');
    let remaining_ = document.getElementById('remaining');
    let remaining_time = document.getElementById('remaining_time');
    let remaining_name = document.getElementById('remaining_name');
    data_hijri.innerText = momentHj().format('iYYYY/iM/iD');
    data_Gregorian.innerText = momentHj().format('YYYY/M/D');
    datoday.innerText = momentHj().locale('ar-SA').format('dddd');
    hour_minutes.innerText = moment().tz(location?.timezone).format('h:mm');
    seconds.innerText = moment().tz(location?.timezone).format(': ss A');
    remaining_time.innerText = remaining(NewPrayerTimes(App_Path),App_Path);
    remaining_name.innerText = NextPrayer(NewPrayerTimes(App_Path));

    if (NextPrayer(NewPrayerTimes(App_Path)) === 'لايوجد') {

        remaining_.style.display = 'none'
        remaining_time.style.display = 'none'

    }

    else if (NextPrayer(NewPrayerTimes(App_Path)) !== 'لايوجد') {

        remaining_.style.display = 'block'
        remaining_time.style.display = 'block'

    }


    setInterval(() => {

        data_hijri.innerText = momentHj().format('iYYYY/iM/iD');
        data_Gregorian.innerText = momentHj().format('YYYY/M/D');
        datoday.innerText = momentHj().locale('ar-SA').format('dddd');
        hour_minutes.innerText = moment().tz(location?.timezone).format('h:mm');
        seconds.innerText = moment().tz(location?.timezone).format(': ss A');
        remaining_time.innerText = remaining(NewPrayerTimes(App_Path), App_Path);
        remaining_name.innerText = NextPrayer();

        if (NextPrayer(NewPrayerTimes(App_Path)) === 'لايوجد') {

            remaining_.style.display = 'none'
            remaining_time.style.display = 'none'

        }

        else if (NextPrayer(NewPrayerTimes(App_Path)) !== 'لايوجد') {

            remaining_.style.display = 'block'
            remaining_time.style.display = 'block'

        }

    }, 1000);


});