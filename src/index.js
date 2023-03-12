/* PACKAGES */
require('v8-compile-cache');
const { BrowserWindow, ipcMain, app, Tray, Menu } = require('electron');
const path = require('path');
const fs = require('fs-extra');

/* MAIN WINDOW */
const main = require('./main.js');

/* App Initialization (Make Sure Files Ready)  */
const appInitialization = require('./modules/appInitialization.js');
const App_Path = path.join(app?.getPath("appData"), './altaqwaa');
fs.existsSync(App_Path) ? true : fs.mkdirsSync(App_Path, { recursive: true });
appInitialization(path, fs, App_Path, app.getVersion());

app.on('ready', (e) => {
    e.preventDefault();
    app.setAppUserModelId("org.altaqwaa.rn0x");
    console.log("[Altaqwaa-CLI] Ready, Starting Main Window...")
    main(path, fs, App_Path, BrowserWindow, ipcMain, app, Tray, Menu)
});

/* For App_Path */
ipcMain?.handle('App_Path', async () => {
    return App_Path
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})