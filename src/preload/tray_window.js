const { ipcRenderer } = require('electron');
const momentHj = require('moment-hijri');
const moment = require('moment-timezone');
const fs = require('fs-extra');
const path = require('path');
momentHj.locale('en-EN')
const adhanModule = require('../modules/adhan.js')

window.addEventListener('DOMContentLoaded', async (e) => {
    e.preventDefault();
    const App_Path = await ipcRenderer.invoke('App_Path2');

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

    let fastData = adhanModule(path, fs, App_Path, location);

    switch (fastData.nextPrayer) {
        case "fajr":
            remaining_name.innerText = "الفجر";
            remaining_.style.display = 'block'
            remaining_time.style.display = 'block'
            break;

        case "dhuhr":
            remaining_name.innerText = "الظهر";
            remaining_.style.display = 'block'
            remaining_time.style.display = 'block'
            break;

        case "asr":
            remaining_name.innerText = "العصر";
            remaining_.style.display = 'block'
            remaining_time.style.display = 'block'
            break;

        case "maghrib":
            remaining_name.innerText = "المغرب";
            remaining_.style.display = 'block'
            remaining_time.style.display = 'block'
            break;

        case "isha":
            remaining_name.innerText = "العشاء";
            remaining_.style.display = 'block'
            remaining_time.style.display = 'block'
            break;

        default:
            remaining_name.innerText = "لايوجد";
            remaining_.style.display = 'none'
            remaining_time.style.display = 'none'
            break;
    }

    remaining_time.innerText = fastData.remainingNext;

    setInterval(() => {
        let refreshData = adhanModule(path, fs, App_Path, location);
        switch (refreshData.nextPrayer) {
            case "fajr":
                remaining_name.innerText = "الفجر";
                remaining_.style.display = 'block'
                remaining_time.style.display = 'block'
                break;

            case "dhuhr":
                remaining_name.innerText = "الظهر";
                remaining_.style.display = 'block'
                remaining_time.style.display = 'block'
                break;

            case "asr":
                remaining_name.innerText = "العصر";
                remaining_.style.display = 'block'
                remaining_time.style.display = 'block'
                break;

            case "maghrib":
                remaining_name.innerText = "المغرب";
                remaining_.style.display = 'block'
                remaining_time.style.display = 'block'
                break;

            case "isha":
                remaining_name.innerText = "العشاء";
                remaining_.style.display = 'block'
                remaining_time.style.display = 'block'
                break;

            default:
                remaining_name.innerText = "لايوجد";
                remaining_.style.display = 'none'
                remaining_time.style.display = 'none'
                break;
        }

        remaining_time.innerText = refreshData.remainingNext;
        data_hijri.innerText = momentHj().format('iYYYY/iM/iD');
        data_Gregorian.innerText = momentHj().format('YYYY/M/D');
        datoday.innerText = momentHj().locale('ar-SA').format('dddd');
        hour_minutes.innerText = moment().tz(location?.timezone).format('h:mm');
        seconds.innerText = moment().tz(location?.timezone).format(': ss A');

    }, 1000);
});