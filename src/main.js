module.exports = async function homeWindow(path, fs, App_Path, BrowserWindow, ipcMain, app, Tray, Menu) {
    const settings = fs.readJsonSync(path.join(App_Path, './data/settings.json'));

    let win
    let loadWin
    let tray
    let contextMenu

    if (process.argv.includes('--hidden')) {
        loadWin = null
    } else if (settings?.startHidden == true) {
        loadWin = null
    } else {
        loadWin = new BrowserWindow({
            width: 128,
            height: 128,
            transparent: true,
            frame: false,
            alwaysOnTop: true,
            center: true,
        })
        loadWin?.loadFile(path.join(__dirname, './pages/loading.html'));
    }

    win = new BrowserWindow({
        width: 1000,
        height: 645,
        minWidth: 1000,
        minHeight: 625,
        show: false,
        center: true,
        frame: false,
        title: 'التقوى',
        icon: path.join(__dirname, './build/icons/icon.png'),
        webPreferences: {
            nodeIntegration: true,
            sandbox: false,
            preload: path.join(__dirname, './preload/preload.js')
        }
    });

    win?.removeMenu();
    win?.loadFile(path.join(__dirname, './pages/home.html'));

    // The default window background color
    settings?.dark_mode ? win?.setBackgroundColor('#2e3338') : win?.setBackgroundColor('#f4f5fb');

    win?.once('ready-to-show', () => {
        if (process.argv.includes('--hidden')) {
            console.log("[Altaqwaa-CLI] Hidden & Minimized.")
            win?.hide()
        } else if (settings?.startHidden == true) {
            console.log("[Altaqwaa-CLI] Hidden & Minimized.")
            win?.hide()
        } else {
            setTimeout(() => {
                loadWin.close();
                win?.show();
            }, 1000);
        }

        //win.webContents.openDevTools();

        /* LOAD AUDIO WINDOW AFTER MAIN WINDOW (HOME) IS READY & LOADED */
        if (settings.notifications_adhan == true || settings.notifications_adhkar == true) {
            const audio_window = require('./window/audio_window.js');
            audio_window(path, App_Path, BrowserWindow, ipcMain)
        }
    });

    win?.on('minimize', (event) => {
        event?.preventDefault();
        settings?.minimizeToPanel ? win?.hide() :
            false;
    });

    win?.on('closed', (event) => {

        event?.preventDefault();
        let soundJson = fs.readJsonSync(path.join(App_Path, './data/sound.json'));
        let audioJson = fs.readJsonSync(path.join(App_Path, './data/audio_window.json'));
        audioJson.start = false
        soundJson.sound = true
        fs.writeJsonSync(path.join(App_Path, './data/sound.json'), soundJson);
        fs.writeJsonSync(path.join(App_Path, './data/audio_window.json'), audioJson);
        // tray?.destroy();
        app?.quit()

    });

    ipcMain?.on('closed', () => win?.close());

    ipcMain?.on('minimizable', () => {

        if (win?.isMaximized()) win?.unmaximize();
        else win?.maximize();

    });

    ipcMain?.on('minimize', () => win?.minimize());

    contextMenu = Menu.buildFromTemplate([
        {
            label: 'عرض/اخفاء التطبيق', click: function () {
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

    tray = new Tray(path.join(__dirname, './build/icons/icon.png'));
    tray?.setContextMenu(contextMenu);
    tray?.setToolTip("التقوى");

    if (process.platform != "linux") {
        console.log("[Altaqwaa-CLI] Altaqwaa For Windows.")
        try {
            if (settings?.autostart == true) {
                if (settings.startHidden) {
                    app.setLoginItemSettings({
                        openAtLogin: true,
                        path: path.join(process.resourcesPath, '../Altaqwaa.exe'),
                        args: ['--hidden']
                    });
                } else {
                    app.setLoginItemSettings({
                        openAtLogin: true,
                        path: path.join(process.resourcesPath, '../Altaqwaa.exe')
                    });
                }
            } else {
                app.setLoginItemSettings({
                    openAtLogin: false,
                    path: path.join(process.resourcesPath, '../Altaqwaa.exe')
                });
            }
        } catch (e) { }

        const tray_window = require('./window/tray_window.js')
        tray_window(path, App_Path, tray, win, ipcMain);
    }

    else if (process.platform == 'linux') {
        console.log("[Altaqwaa-CLI] Altaqwaa For Linux.")

        tray.on('click', () => {

            if (win?.isVisible()) {
                win?.hide();
            }
            else {
                win?.show();
            }

        });
    }

    app?.on('before-quit', function () {
        tray?.destroy();
    });
}
