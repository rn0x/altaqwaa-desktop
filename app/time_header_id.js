const { ipcRenderer } = require('electron');
const moment = require('moment-timezone');
const fs = require('fs-extra');
const path = require('path');

module.exports = async function time_header(id) {

    let App_Path = await ipcRenderer.invoke('electron-app-get-path');
    let time_header = document.getElementById(`${id}`);
    let json_city = fs.readJsonSync(path.join(App_Path, '/json/city.json'));
    let timezone = json_city.timezone;
    time_header.innerHTML = moment().tz(timezone).format('h:mm:ss A');

    setInterval(() => {

        let time_header = document.getElementById(`${id}`);
        let json_city = fs.readJsonSync(path.join(App_Path, '/json/city.json'));
        let timezone = json_city.timezone;

        time_header.innerHTML = moment().tz(timezone).format('h:mm:ss A');

    }, 1000);
}