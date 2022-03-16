const { Notification } = require('electron');
const fs = require('fs-extra');
const adhan = require('adhan');
const moment = require('moment-timezone');
const path = require('path');
const Audic = require("audic-forked")

module.exports = async function notification(GetPath, path_folder) {

    setInterval(async () => {

        if (fs.existsSync(path.join(GetPath, '/json/notification.json'))) {

            let date = new Date();
            let time = moment().format('LT');
            let time_Adhkar = moment().format('mm');
            let time_am = ["1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 AM"];
            let time_pm = ["1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM", "12:00 PM"];
            let json_city = fs.readJsonSync(path.join(GetPath, '/json/city.json'));
            let json_notification = fs.readJsonSync(path.join(GetPath, '/json/notification.json'));
            let coordinates = new adhan.Coordinates(json_city.latitude, json_city.longitude);
            let params = adhan.CalculationMethod.MuslimWorldLeague()
            let prayerTimes = new adhan.PrayerTimes(coordinates, date, params);
            let next = prayerTimes.nextPrayer();
            let timezone = json_city.timezone;
            let nextPrayerTime = prayerTimes.timeForPrayer(next);
            let next_ar = next.toLocaleLowerCase() === 'none' ? 'لايوجد' : next.toLocaleLowerCase() === 'fajr' ? 'الفجر' : next.toLocaleLowerCase() === 'sunrise' ? 'الضحى' : next.toLocaleLowerCase() === 'dhuhr' ? 'الظهر' : next.toLocaleLowerCase() === 'asr' ? 'العصر' : next.toLocaleLowerCase() === 'maghrib' ? 'المغرب' : next.toLocaleLowerCase() === 'isha' ? 'العشاء' : ' ';
            let Time_Adhan_false = moment(nextPrayerTime).tz(timezone).subtract(1, "minutes").format('h:mm A') !== moment().tz(timezone).format('h:mm A')

            if (moment(nextPrayerTime).tz(timezone).subtract(1, "minutes").format('h:mm A') === moment().tz(timezone).format('h:mm A') && json_notification.notification === true) {

                let notification = new Notification({
                    title: `صلاة ${next_ar}`,
                    body: `حان موعد صلاة ${next_ar}\n ${moment(nextPrayerTime).tz(timezone).format('h:mm A')}`,
                    silent: true,
                    icon: path.join(path_folder, '/build/icons/icon.png'),
                    urgency: "normal",
                    timeoutType: 'never',
                })

                notification.show()
                setTimeout(() => notification.close(), 60000);

            }

            else if (time_am.includes(time) && json_notification.notification === true) {

                let Adhkar_morning = fs.readJsonSync(path.join(GetPath, '/json/Adhkar_morning.json'));
                let random = Adhkar_morning[Math.floor(Math.random() * Adhkar_morning.length)]
                let body = `${random.zekr}`
                body += `${random.description !== '' ? `\n\n ${random.description}` : ''}`
                body += `${random.count !== '' ? `\n\nعدد التكرار: ${random.count}` : ''}`
                body += `${random.reference !== '' ? `\n\n ${random.reference}` : ''}`

                let notification = new Notification({
                    title: random.category,
                    body: body,
                    silent: false,
                    icon: path.join(path_folder, '/build/icons/icon.png'),
                    urgency: "normal",
                    timeoutType: 'never'
                });

                notification.show()
                setTimeout(() => notification.close(), 60000);

            }

            else if (time_pm.includes(time) && json_notification.notification === true) {

                let Adhkar_night = fs.readJsonSync(path.join(GetPath, '/json/Adhkar_night.json'));
                let random = Adhkar_night[Math.floor(Math.random() * Adhkar_night.length)]
                let body = `${random.zekr}`
                body += `${random.description !== '' ? `\n\n ${random.description}` : ''}`
                body += `${random.count !== '' ? `\n\nعدد التكرار: ${random.count}` : ''}`
                body += `${random.reference !== '' ? `\n\n ${random.reference}` : ''}`

                let notification = new Notification({
                    title: random.category,
                    body: body,
                    silent: false,
                    icon: path.join(path_folder, '/build/icons/icon.png'),
                    urgency: "normal",
                    timeoutType: 'never'
                });

                notification.show()
                setTimeout(() => notification.close(), 60000);

            }

            else if (time_Adhkar === '37' && json_notification.notification === true) {

                let Adhkar = fs.readJsonSync(path.join(GetPath, '/json/Adhkar.json'));
                let random = Adhkar[Math.floor(Math.random() * Adhkar.length)]
                let body = `${random.zekr}`
                body += `${random.description !== '' ? `\n\n ${random.description}` : ''}`
                body += `${random.count !== '' ? `\n\nعدد التكرار: ${random.count}` : ''}`
                body += `${random.reference !== '' ? `\n\n ${random.reference}` : ''}`

                let notification = new Notification({
                    title: random.category,
                    body: body,
                    silent: false,
                    icon: path.join(path_folder, '/build/icons/icon.png'),
                    urgency: "normal",
                    timeoutType: 'never'
                });

                notification.show()
                setTimeout(() => notification.close(), 60000);

            }

            else if (time === '7:15 AM' && Time_Adhan_false && json_notification.notification === true) {

                let audic = new Audic(path.join(GetPath, '/mp3/AM.mp3'),);
                let notification = new Notification({
                    title: 'أذكار الصباح ☀️',
                    body: 'بصوت إدريس أبكر 🔊',
                    silent: false,
                    icon: path.join(path_folder, '/build/icons/icon.png'),
                    urgency: "normal",
                    timeoutType: 'never'
                });

                notification.on('click', () => audic.pause());
                notification.on('close', () => audic.pause());
                notification.show();
                audic.play();
            }

            else if (time === '7:15 PM' && Time_Adhan_false && json_notification.notification === true) {

                let audic = new Audic(path.join(GetPath, '/mp3/PM.mp3'),);
                let notification = new Notification({
                    title: 'أذكار المساء 🌑',
                    body: 'بصوت فيصل بن جذيان 🔊',
                    silent: false,
                    icon: path.join(path_folder, '/build/icons/icon.png'),
                    urgency: "normal",
                    timeoutType: 'never'
                });

                notification.on('click', () => audic.pause());
                notification.on('close', () => audic.pause());
                notification.show();
                audic.play();

            }
        }

    }, 60000);

}