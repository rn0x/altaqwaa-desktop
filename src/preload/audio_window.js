const { ipcRenderer } = require('electron');
const fs = require('fs-extra');
const path = require('path');
const moment = require('moment-timezone');
const adhanModule = require('../modules/adhan.js')

window.addEventListener('DOMContentLoaded', async (e) => {
    e.preventDefault();
    
    let App_Path = await ipcRenderer?.invoke('App_Path');
    let settings = fs.readJsonSync(path.join(App_Path, './data/settings.json'));
    let variables_css = document.getElementById("variables_css");
    let icon_closed_window = document.getElementById("icon_closed_window");

    document.getElementById('closed').addEventListener('click', e => {
        document.getElementById('audio').pause();
        document.getElementById('audio').currentTime = 0;
        ipcRenderer.send('closed3');
    });

    if (settings?.dark_mode) {
        // stylesheet 
        variables_css.href = '../public/css/var.css';
        // window controls
        icon_closed_window.srcset = '../public/icon/closed.png';
    }

    else if (settings?.dark_mode === false) {
        // stylesheet 
        variables_css.href = '../public/css/var_light.css';
        // window controls
        icon_closed_window.srcset = '../public/icon/dark/closed.png';
    }
    

    while (true) {

        await new Promise(resolve => setTimeout(resolve, 25000));
        let audioJson = fs.readJsonSync(path.join(App_Path, './data/audio_window.json'));
        let location = fs.readJsonSync(path.join(App_Path, './data/location.json'));
        let settings = fs.readJsonSync(path.join(App_Path, './data/settings.json'));
        let data = adhanModule(path, fs, App_Path, location);
        let time_now_adhan = moment().tz(location?.timezone).format('LT');
        let time_now_adhkar = moment().tz(location?.timezone).format('HH:mm');

        if (time_now_adhan === data.fajr && audioJson?.start === false && settings?.notifications_adhan) {
            audioBoolean(App_Path, true);
            ipcRenderer.send('show3');
            document.getElementById('text').innerText = 'حان الان وقت صلاة الفجر'
            document.getElementById('audio').src = path.join(__dirname, '../public/audio/002.mp3');
            document.getElementById('audio').volume = settings?.adhanVolume || 1;
            setTimeout(() => {
                audioBoolean(App_Path, false)
            }, 60000);
        }

        else if (time_now_adhan === data.dhuhr && audioJson?.start === false && settings?.notifications_adhan) {
            audioBoolean(App_Path, true);
            ipcRenderer.send('show3');
            document.getElementById('text').innerText = 'حان الان وقت صلاة الظهر'
            document.getElementById('audio').src = path.join(__dirname, '../public/audio/001.mp3');
            document.getElementById('audio').volume = settings?.adhanVolume || 1;
            setTimeout(() => {
                audioBoolean(App_Path, false);
            }, 60000);
        }

        else if (time_now_adhan === data.asr && audioJson?.start === false && settings?.notifications_adhan) {
            audioBoolean(App_Path, true);
            ipcRenderer.send('show3');
            document.getElementById('text').innerText = 'حان الان وقت صلاة العصر'
            document.getElementById('audio').src = path.join(__dirname, '../public/audio/001.mp3');
            document.getElementById('audio').volume = settings?.adhanVolume || 1;
            setTimeout(() => {
                audioBoolean(App_Path, false);
            }, 60000);
        }

        else if (time_now_adhan === data.maghrib && audioJson?.start === false && settings?.notifications_adhan) {
            audioBoolean(App_Path, true);
            ipcRenderer.send('show3');
            document.getElementById('text').innerText = 'حان الان وقت صلاة المغرب'
            document.getElementById('audio').src = path.join(__dirname, '../public/audio/001.mp3');
            document.getElementById('audio').volume = settings?.adhanVolume || 1;
            setTimeout(() => {
                audioBoolean(App_Path, false);
            }, 60000);
        }

        else if (time_now_adhan === data.isha && audioJson?.start === false && settings?.notifications_adhan) {
            audioBoolean(App_Path, true);
            ipcRenderer.send('show3');
            document.getElementById('text').innerText = 'حان الان وقت صلاة العشاء'
            document.getElementById('audio').src = path.join(__dirname, '../public/audio/001.mp3');
            document.getElementById('audio').volume = settings?.adhanVolume || 1;
            setTimeout(() => {
                audioBoolean(App_Path, false);
            }, 60000);
        }

        else if (time_now_adhkar === settings?.morning_adhkar_time && audioJson?.start === false && settings?.notifications_adhkar) {
            audioBoolean(App_Path, true);
            ipcRenderer.send('show3');
            document.getElementById('text').innerText = 'أذكار الصباح ☀️ | بصوت إدريس أبكر 🔊';
            document.getElementById('audio').src = path.join(__dirname, '../public/audio/AM.mp3');
            document.getElementById('audio').volume = settings?.adhanVolume || 1;
            setTimeout(() => {
                audioBoolean(App_Path, false);
            }, 60000);
        }

        else if (time_now_adhkar === settings?.evening_adhkar_time && audioJson?.start === false && settings?.notifications_adhkar) {
            audioBoolean(App_Path, true);
            ipcRenderer.send('show3');
            document.getElementById('text').innerText = 'أذكار المساء 🌑 | بصوت فيصل بن جذيان 🔊';
            document.getElementById('audio').src = path.join(__dirname, '../public/audio/PM.mp3');
            document.getElementById('audio').volume = settings?.adhanVolume || 1;
            setTimeout(() => {
                audioBoolean(App_Path, false);
            }, 60000);
        }

    }

});

function audioBoolean(App_Path, boolean) {
    const audioJson = fs.readJsonSync(path.join(App_Path, './data/audio_window.json'));
    audioJson.start = boolean
    fs.writeJsonSync(path.join(App_Path, './data/audio_window.json'), audioJson);
}