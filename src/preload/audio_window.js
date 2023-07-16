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

        await new Promise(resolve => setTimeout(resolve, 20000));
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
            }, 65000);
        }

        else if (time_now_adhan === data.dhuhr && audioJson?.start === false && settings?.notifications_adhan) {
            audioBoolean(App_Path, true);
            ipcRenderer.send('show3');
            document.getElementById('text').innerText = 'حان الان وقت صلاة الظهر'
            document.getElementById('audio').src = path.join(__dirname, '../public/audio/001.mp3');
            document.getElementById('audio').volume = settings?.adhanVolume || 1;
            setTimeout(() => {
                audioBoolean(App_Path, false);
            }, 65000);
        }

        else if (time_now_adhan === data.asr && audioJson?.start === false && settings?.notifications_adhan) {
            audioBoolean(App_Path, true);
            ipcRenderer.send('show3');
            document.getElementById('text').innerText = 'حان الان وقت صلاة العصر'
            document.getElementById('audio').src = path.join(__dirname, '../public/audio/001.mp3');
            document.getElementById('audio').volume = settings?.adhanVolume || 1;
            setTimeout(() => {
                audioBoolean(App_Path, false);
            }, 65000);
        }

        else if (time_now_adhan === data.maghrib && audioJson?.start === false && settings?.notifications_adhan) {
            audioBoolean(App_Path, true);
            ipcRenderer.send('show3');
            document.getElementById('text').innerText = 'حان الان وقت صلاة المغرب'
            document.getElementById('audio').src = path.join(__dirname, '../public/audio/001.mp3');
            document.getElementById('audio').volume = settings?.adhanVolume || 1;
            setTimeout(() => {
                audioBoolean(App_Path, false);
            }, 65000);
        }

        else if (time_now_adhan === data.isha && audioJson?.start === false && settings?.notifications_adhan) {
            audioBoolean(App_Path, true);
            ipcRenderer.send('show3');
            document.getElementById('text').innerText = 'حان الان وقت صلاة العشاء'
            document.getElementById('audio').src = path.join(__dirname, '../public/audio/001.mp3');
            document.getElementById('audio').volume = settings?.adhanVolume || 1;
            setTimeout(() => {
                audioBoolean(App_Path, false);
            }, 65000);
        }

        else if (time_now_adhkar === settings?.morning_adhkar_time && audioJson?.start === false && settings?.notifications_adhkar) {
            audioBoolean(App_Path, true);
            ipcRenderer.send('show3');
            document.getElementById('text').innerText = 'أذكار الصباح ☀️ | بصوت إدريس أبكر 🔊';
            document.getElementById('audio').src = path.join(__dirname, '../public/audio/AM.mp3');
            document.getElementById('audio').volume = settings?.adhanVolume || 1;
            setTimeout(() => {
                audioBoolean(App_Path, false);
            }, 65000);
        }

        else if (time_now_adhkar === settings?.evening_adhkar_time && audioJson?.start === false && settings?.notifications_adhkar) {
            audioBoolean(App_Path, true);
            ipcRenderer.send('show3');
            document.getElementById('text').innerText = 'أذكار المساء 🌑 | بصوت فيصل بن جذيان 🔊';
            document.getElementById('audio').src = path.join(__dirname, '../public/audio/PM.mp3');
            document.getElementById('audio').volume = settings?.adhanVolume || 1;
            setTimeout(() => {
                audioBoolean(App_Path, false);
            }, 65000);
        }

        // الصلاة علي النبي يوم الجمعة

        else if (settings?.zekr_duration && audioJson?.start === false) {
            let zekr_duration_number = parseInt(settings.zekr_duration);

            let currentDate = new Date();
            let currentDay = currentDate.getDay();

            // Check if the current day is Friday (day number 5)
            if (currentDay === 5) {
                audioBoolean(App_Path, true);
                ipcRenderer.send('show3');
                document.getElementById('text').innerText = 'لا تنسي الصلاة علي النبيﷺ وقراءة سورة الكهف';
                document.getElementById('audio').src = path.join(__dirname, '../public/audio/أذكار/ذكر_الصلاة_علي_النبي_الجمعة.mp3');

                setTimeout(() => {
                    audioBoolean(App_Path, false);
                }, zekr_duration_number * 60 * 1000);
            }
            // الإستغفار
            else {
                const audioList = [
                    { text: 'الإستغفار', audioPath: path.join(__dirname, '../public/audio/أذكار/أستغفر_الله.mp3') },
                    // Add more items to the list with text and audio path
                    { text: 'الصلاة علي النبي', audioPath: path.join(__dirname, '../public/audio/أذكار/ذكر_الصلاة_علي_النبي.mp3') },
                    { text: 'سبحان الله وبحمده', audioPath: path.join(__dirname, '../public/audio/أذكار/سبحان_الله_وبحمده.mp3') },
                    { text: 'علما نافعا', audioPath: path.join(__dirname, '../public/audio/أذكار/اللهم_إني_اسألك_علما_نافعا.mp3') },
                    { text: 'اللهم أنت ربي ', audioPath: path.join(__dirname, '../public/audio/أذكار/اللهم_انت_ربي.mp3') },
                    { text: 'لا إله إلا الله', audioPath: path.join(__dirname, '../public/audio/أذكار/لا_إله_إلا_الله.mp3') },
                    { text: 'حسبي الله', audioPath: path.join(__dirname, '../public/audio/أذكار/حسبي_الله.mp3') },
                    { text: 'رضيت بالله ربا', audioPath: path.join(__dirname, '../public/audio/أذكار/رضيت_بالله_ربا.mp3') },
                    { text: 'الباقيات الصالحات', audioPath: path.join(__dirname, '../public/audio/أذكار/الباقيات_الصالحات.mp3') },
                    { text: 'أعوذ بكلمات الله التامات', audioPath: path.join(__dirname, '../public/audio/أذكار/أعوذ_بكلمات_الله.mp3') },
                    { text: 'سبحانك اللهم ربنا وبحمدك', audioPath: path.join(__dirname, '../public/audio/أذكار/سبحانك_اللهم_وبحمدك.mp3') },
                    { text: 'سور الناس - الفلق - الإخلاص', audioPath: path.join(__dirname, '../public/audio/أذكار/الناس_الفلق_الإخلاص.mp3') },


                ];

                // Select a random item from the audioList
                const randomIndex = Math.floor(Math.random() * audioList.length);
                const randomItem = audioList[randomIndex];

                audioBoolean(App_Path, true);
                document.getElementById('text').innerText = randomItem.text;
                document.getElementById('audio').src = randomItem.audioPath;

                setTimeout(() => {
                    audioBoolean(App_Path, false);
                }, zekr_duration_number * 60 * 1000);
            }
        }

    }

});

function audioBoolean(App_Path, boolean) {
    const audioJson = fs.readJsonSync(path.join(App_Path, './data/audio_window.json'));
    audioJson.start = boolean
    fs.writeJsonSync(path.join(App_Path, './data/audio_window.json'), audioJson);
}