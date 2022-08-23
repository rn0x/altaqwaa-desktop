const { ipcRenderer } = require('electron');
const fs = require('fs-extra');
const path = require('path');
const moment = require('moment-timezone');
const {
    fajrTime,
    dhuhrTime,
    asrTime,
    maghribTime,
    ishaTime,
    NewPrayerTimes
} = require('../module/adhan.js');

window.addEventListener('DOMContentLoaded', async (e) => {

    e.preventDefault();
    document.getElementById('closed').addEventListener('click', e => {
        document.getElementById('audio').pause();
        document.getElementById('audio').currentTime = 0;
        ipcRenderer.send('closed3')

    });
    let App_Path = await ipcRenderer?.invoke('App_Path3');
    let location = fs.readJsonSync(path.join(App_Path, './data/location.json'));
    let settings = fs.readJsonSync(path.join(App_Path, './data/settings.json'));

    setInterval(async () => {

        let time_now = moment().tz(location?.timezone).format('LT');

        if (time_now === fajrTime(NewPrayerTimes(App_Path), App_Path) && settings?.notifications_adhan) {
            ipcRenderer.send('show3');
            document.getElementById('text').innerText = 'حان الان وقت صلاة الفجر'
            document.getElementById('audio').src = path.join(__dirname, '../public/audio/002.mp3');
            setTimeout(() => {
                ipcRenderer.send('closed3')
            }, 600000);
        }

        else if (time_now === dhuhrTime(NewPrayerTimes(App_Path), App_Path) && settings?.notifications_adhan) {
            ipcRenderer.send('show3');
            document.getElementById('text').innerText = 'حان الان وقت صلاة الظهر'
            document.getElementById('audio').src = path.join(__dirname, '../public/audio/001.mp3');
            setTimeout(() => {
                ipcRenderer.send('closed3');
            }, 600000);
        }

        else if (time_now === asrTime(NewPrayerTimes(App_Path), App_Path) && settings?.notifications_adhan) {
            ipcRenderer.send('show3');
            document.getElementById('text').innerText = 'حان الان وقت صلاة العصر'
            document.getElementById('audio').src = path.join(__dirname, '../public/audio/001.mp3');
            setTimeout(() => {
                ipcRenderer.send('closed3');
            }, 600000);
        }

        else if (time_now === maghribTime(NewPrayerTimes(App_Path), App_Path) && settings?.notifications_adhan) {
            ipcRenderer.send('show3');
            document.getElementById('text').innerText = 'حان الان وقت صلاة المغرب'
            document.getElementById('audio').src = path.join(__dirname, '../public/audio/001.mp3');
            setTimeout(() => {
                ipcRenderer.send('closed3');
            }, 600000);
        }

        else if (time_now === ishaTime(NewPrayerTimes(App_Path), App_Path) && settings?.notifications_adhan) {
            ipcRenderer.send('show3');
            document.getElementById('text').innerText = 'حان الان وقت صلاة العشاء'
            document.getElementById('audio').src = path.join(__dirname, '../public/audio/001.mp3');
            setTimeout(() => {
                ipcRenderer.send('closed3');
            }, 600000);
        }

        else if (time_now === '7:40 AM' && settings?.notifications_adhkar) {
            ipcRenderer.send('show3');
            document.getElementById('text').innerText = 'أذكار الصباح ☀️ | بصوت إدريس أبكر 🔊';
            document.getElementById('audio').src = path.join(__dirname, '../public/audio/AM.mp3');
            
            setTimeout(() => {
                ipcRenderer.send('closed3');
            }, 600000);
        }

        else if (time_now === '7:40 PM' && settings?.notifications_adhkar) {
            ipcRenderer.send('show3');
            document.getElementById('text').innerText = 'أذكار المساء 🌑 | بصوت فيصل بن جذيان 🔊';
            document.getElementById('audio').src = path.join(__dirname, '../public/audio/PM.mp3');
            setTimeout(() => {
                ipcRenderer.send('closed3');
            }, 600000);
        }

    }, 60000);


});