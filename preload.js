const { ipcRenderer } = require('electron');
const class_adhan = require('./app/adhan/class_adhan.js');
const time_header = require('./app/time_header.js');
const adhan_mp3 = require('./app/adhan_mp3.js');

window.addEventListener('DOMContentLoaded', async (e) => {

    e.preventDefault();

    if (document.getElementsByClassName('adhan').item(0)) {
        
        class_adhan() // أوقات الصلاة

        //    ipcRenderer.send('id_ch_main',"ping");
        //    ipcRenderer.on('id_ch_renderer',async (event, args) => {
        //     var app_path = args // prints "pong"
        //   });

    }

    document.getElementById('min-button').addEventListener("click", event => {
        ipcRenderer.send('minimize') // شريط العنوان زر الإغلاق والتصغير / تصغير
    });

    document.getElementById('close-button').addEventListener("click", event => {
        ipcRenderer.send('close') // شريط العنوان زر الإغلاق والتصغير / إغلاق
    });



    time_header(); // ساعة الهيدر
    adhan_mp3(); // إشعار الأذان صوت

});