/* PACKAGES */
require('v8-compile-cache');
const { BrowserWindow, ipcMain, app, Tray, Menu, globalShortcut } = require('electron');
const path = require('path');
const fs = require('fs-extra');

/* APP WINDOW(S) */
const homeWindow = require('./window/home.js');
const audio_window = require('./window/audio_window.js');
const appInitialization = require('./modules/appInitialization.js');

/* App Initialization (Make Sure Files Ready)  */
const App_Path = path.join(app?.getPath("appData"), './altaqwaa');
fs.existsSync(App_Path) ? true : fs.mkdirsSync(App_Path, { recursive: true });
appInitialization(path, fs, App_Path, app.getVersion());

app.on('ready', (e) => {
    e.preventDefault();
    app.setAppUserModelId("org.altaqwaa.rn0x");

    /* FOR App_Path */
    ipcMain?.handle('App_Path', async () => {
        return App_Path
    });

    homeWindow(path, fs, App_Path, BrowserWindow, ipcMain, app, Tray, Menu, globalShortcut)

    /* NEED TO CHECK IF THE USER DISABLED (ADHAN) IN SETTINGS BUT ILL DO IT NEXT UPDATE ;D */
    audio_window(path, App_Path, BrowserWindow, ipcMain, app)
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.setLoginItemSettings({
    openAtLogin: true,
    path: path.join(process.resourcesPath, '../Altaqwaa.exe'),
    args: ['--hidden']
});