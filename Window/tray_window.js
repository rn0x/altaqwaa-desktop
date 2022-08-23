const fs = require('fs-extra');
const path = require('path');
const { menubar } = require('menubar');

module.exports = function tray_window(tray, win, ipcMain, app) {

    let adhkar = menubar({
        browserWindow: {
            transparent: true,
            width: 350,
            height: 380,
            minWidth: 350,
            minHeight: 380,
            maxWidth: 350,
            maxHeight: 380,
            show: false,
            title: 'التقوى',
            icon: path.join(__dirname, '../build/icons/icon.png'),
            webPreferences: {
                nodeIntegration: true,
                preload: path.join(__dirname, '../preload/tray_window.js')
            }
        },
        index: path.join(__dirname, '../pages/tray_window.html'),
        icon: path.join(__dirname, '../build/icons/icon@2x.png'),
        tray: tray

    });


    adhkar.on('ready', () => {

        adhkar.tray.on('click', () => {

            win?.hide();
            adhkar?.showWindow();
        })

    });

    ipcMain?.handle('App_Path2', () => {
        return path.join(app?.getPath("appData"), './altaqwaa');
    });

}
