const { ipcRenderer } = require('electron');
const class_adhan = require('./app/adhan/class_adhan.js');
const time_header = require('./app/time_header.js');
const adhan_mp3 = require('./app/adhan_mp3.js');
const notification = require('./notifications.js');
const fs = require('fs-extra');
const path = require('path');

window.addEventListener('DOMContentLoaded', async (e) => {

    e.preventDefault();

    let App_Path = await ipcRenderer.invoke('electron-app-get-path');
    let path_folder = fs.existsSync(path.join(process.resourcesPath, '/build')) === true ? process.resourcesPath : __dirname

    if (document.getElementsByClassName('adhan').item(0)) {

        class_adhan() // أوقات الصلاة

        //    ipcRenderer.send('id_ch_main',"ping");
        //    ipcRenderer.on('id_ch_renderer',async (event, args) => {
        //     var app_path = args // prints "pong"
        //   });

        document.getElementById('min-button').addEventListener("click", event => {
            ipcRenderer.send('minimize') // شريط العنوان زر الإغلاق والتصغير / تصغير
        });

        document.getElementById('close-button').addEventListener("click", event => {
            ipcRenderer.send('close') // شريط العنوان زر الإغلاق والتصغير / إغلاق
        });

    }

    else if (document.getElementById('titlebar')) {

        document.getElementById('min-button').addEventListener("click", event => {
            ipcRenderer.send('minimize') // شريط العنوان زر الإغلاق والتصغير / تصغير
        });

        document.getElementById('close-button').addEventListener("click", event => {
            ipcRenderer.send('close') // شريط العنوان زر الإغلاق والتصغير / إغلاق
        });

    }

    else if (document.getElementById('titlebar2')) {

        document.getElementById('min-button2').addEventListener("click", event => {
            ipcRenderer.send('minimize2') // شريط العنوان زر الإغلاق والتصغير / تصغير
        });

        document.getElementById('close-button2').addEventListener("click", event => {
            ipcRenderer.send('close2') // شريط العنوان زر الإغلاق والتصغير / إغلاق
        });

    }


    time_header(); // ساعة الهيدر
    adhan_mp3(); // إشعار الأذان صوت
    notification(App_Path, path_folder); // إشعارات الأذكار

});