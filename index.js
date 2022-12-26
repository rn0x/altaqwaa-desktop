require('v8-compile-cache');
const { BrowserWindow, ipcMain, app, Tray, Menu, globalShortcut } = require('electron');
const path = require('path');
const homeWindow = require('./Window/home.js');
const audio_window = require('./Window/audio_window.js');


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on('ready', (e) => {

    e.preventDefault();
    app.setAppUserModelId("org.altaqwaa.rn0x");
    homeWindow(BrowserWindow, ipcMain, app, Tray, Menu, globalShortcut)
    audio_window(BrowserWindow, ipcMain, app)

});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// Start the application on Windows startup only

app.setLoginItemSettings({
    openAtLogin: true,
    path: path.join(process.resourcesPath, '../Altaqwaa.exe'),
    args: ['--hidden']
});
