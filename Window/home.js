const path = require('path');
const createFile = require('../module/createFile.js');
const tray_window = require('./tray_window.js')
const location = require('../module/location.js');

module.exports = async function homeWindow(BrowserWindow, ipcMain, app, Tray, Menu, globalShortcut) {

    createFile(path.join(app.getPath("appData"), './altaqwaa'));
    await location(path.join(app?.getPath("appData"), './altaqwaa'));
    let win
    let tray
    let contextMenu

    win = new BrowserWindow({
        width: 1000,
        height: 600,
        minWidth: 1000,
        minHeight: 600,
        show: false,
        center: true,
        frame: false,
        title: 'التقوى',
        icon: path.join(__dirname, '../build/icons/icon.png'),
        webPreferences: {
            nodeIntegration: true,
            sandbox: false,
            preload: path.join(__dirname, '../preload/preload.js')
        }
    });

    win.removeMenu();
    // and load the file.pug of the app.
    win?.loadFile(path.join(__dirname, '../pages/home.html'));

    win?.once('ready-to-show', () => {
        win?.show();
        //win.webContents.openDevTools();
    });

    win?.on('minimize', (event) => {
        event?.preventDefault();
        win?.hide();
    });

    win?.on('closed', (event) => {

        event?.preventDefault();
        // tray?.destroy();
        tray = null
        contextMenu = null
        win = null
        app?.quit()
    });

    ipcMain?.on('closed', () => win?.close());

    ipcMain?.on('minimizable', () => {

        if (win?.isMaximized()) win?.unmaximize();
        else win?.maximize();
    });

    ipcMain?.on('minimize', () => win?.minimize());
    ipcMain?.handle('App_Path', async () => {
        let App_Path = path.join(app?.getPath("appData"), '/altaqwaa');
        return App_Path
    });

    contextMenu = Menu.buildFromTemplate([
        {
            label: 'عرض التطبيق', click: function () {
                win.isVisible() ? win.hide() : win.show()
            }
        },
        {
            label: 'إغلاق', click: function () {
                if (win !== null) {
                    win?.close();
                }
                else if (win === null) homeWindow()
                app.isQuiting = true;
                app?.quit();
            }
        }
    ]);
    tray = new Tray(path.join(__dirname, '../build/icons/icon.png'));
    tray?.setContextMenu(contextMenu);
    tray?.setToolTip("التقوى");

    tray_window(tray, win, ipcMain, app);

    if (process.argv.includes('--hidden')) {

        win?.hide()

    }

    globalShortcut?.register('Ctrl+shift+T', () => {

        if (win?.isVisible()) {
            win?.hide()
        }
        else {
            win?.show()
        }

    });

    app?.on('before-quit', function () {
        tray?.destroy();
    });


}