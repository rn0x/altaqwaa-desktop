const { shell } = require('electron');
const fetch = require('node-fetch');

module.exports = function info(currentRelease) {

    if (document.getElementById('info')) {

        /*
            * SIMPLE GITHUB API CHECK FOR NEW RELEASES SCRIPT
            * THE CURRENT RELEASE LOADS IN PRELOAD.JS FILE
            * https://github.com/kemzops
        */
        fetch(`https://api.github.com/repos/rn0x/Altaqwaa-Islamic-Desktop-Application/releases`)
        .then(response => response.json())
        .then(releases => {
            const latestRelease = releases[0];
            if(currentRelease != latestRelease.tag_name.substring(1)) {
                document.getElementById("Version").innerHTML = "هنالك اصدار جديد من البرنامج\n" + `الإصدار الحالي: v${currentRelease}\n` + `الإصدار الأخير: ${latestRelease.tag_name}`;
            } else {
                document.getElementById("Version").innerHTML = "الإصدار: v" + currentRelease;
            }
        })
        .catch(error => { /* SKIP ERRORS... SOMETIMES ITS RATE LIMIT FOR GITHUB API */ });
    
        let github = document.getElementById('github');
        let altaqwaa = document.getElementById('altaqwaa');
        let Developer = document.getElementById('Developer');
        let telegram = document.getElementById('telegram');
        let rn0x_github = document.getElementById('rn0x_github');
        let gmail = document.getElementById('gmail');
        let dependencies = document.getElementById('dependencies');
        let Sources = document.getElementById('Sources');
        let info_li_1 = document.getElementById('info_li_1');
        let info_li_2 = document.getElementById('info_li_2');
        let info_li_3 = document.getElementById('info_li_3');
        let Sources_1 = document.getElementById('Sources_1');
        let Sources_2 = document.getElementById('Sources_2');
        let Sources_3 = document.getElementById('Sources_3');
        let Sources_4 = document.getElementById('Sources_4');
        let Sources_5 = document.getElementById('Sources_5');
        let Sources_6 = document.getElementById('Sources_6');
        let Sources_7 = document.getElementById('Sources_7');
        let url_1 = document.getElementById('url_1');
        let url_2 = document.getElementById('url_2');
        let url_3 = document.getElementById('url_3');
        let url_4 = document.getElementById('url_4');
        let url_5 = document.getElementById('url_5');
        let url_6 = document.getElementById('url_6');
        let url_7 = document.getElementById('url_7');

        info_li_1.addEventListener('click', e => {
            altaqwaa.style.display = 'none'
            Developer.style.display = 'block'
            dependencies.style.display = 'none'
            Sources.style.display = 'none'
        });

        info_li_2.addEventListener('click', e => {
            altaqwaa.style.display = 'none'
            Developer.style.display = 'none'
            dependencies.style.display = 'block'
            Sources.style.display = 'none'
        });

        info_li_3.addEventListener('click', e => {
            altaqwaa.style.display = 'none'
            Developer.style.display = 'none'
            dependencies.style.display = 'none'
            Sources.style.display = 'table'
        });

        github.addEventListener('click', e => {
            shell.openExternal('https://github.com/rn0x/Altaqwaa-Islamic-Desktop-Application')
        });

        rn0x_github.addEventListener('click', e => {
            shell.openExternal('https://github.com/rn0x')
        });

        telegram.addEventListener('click', e => {
            shell.openExternal('https://t.me/binattia')
        });

        gmail.addEventListener('click', e => {
            shell.openExternal('mailto: ry2n711@gmail.com')
        });

        Sources_1.addEventListener('click', e => {
            shell.openExternal('https://github.com/rn0x/Quran-Json')
        });

        Sources_2.addEventListener('click', e => {
            shell.openExternal('https://www.mp3quran.net/api/_arabic.json')
        });

        Sources_3.addEventListener('click', e => {
            shell.openExternal('https://www.islambook.com/azkar')
        });

        Sources_4.addEventListener('click', e => {
            shell.openExternal('http://ip-api.com/json')
        });

        Sources_5.addEventListener('click', e => {
            shell.openExternal('https://www.flaticon.com')
        });

        Sources_6.addEventListener('click', e => {
            shell.openExternal('https://fonts.qurancomplex.gov.sa/wp02')
        });

        Sources_7.addEventListener('click', e => {
            shell.openExternal('https://github.com/rastikerdar/vazirmatn')
        });

        url_1.addEventListener('click', e => {
            shell.openExternal('https://github.com/batoulapps/adhan-js')
        });

        url_2.addEventListener('click', e => {
            shell.openExternal('https://github.com/electron/electron')
        });

        url_3.addEventListener('click', e => {
            shell.openExternal('https://github.com/jprichardson/node-fs-extra')
        });

        url_4.addEventListener('click', e => {
            shell.openExternal('https://github.com/moment')
        });

        url_5.addEventListener('click', e => {
            shell.openExternal('https://github.com/node-fetch/node-fetch')
        });

        url_6.addEventListener('click', e => {
            shell.openExternal('https://github.com/request/request')
        });

        url_7.addEventListener('click', e => {
            shell.openExternal('https://github.com/maxogden/menubar')
        }); 

        url_8.addEventListener('click', e => {
            shell.openExternal('https://github.com/zertosh/v8-compile-cache')
        }); 
    }

}