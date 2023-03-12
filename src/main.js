module.exports = async function homeWindow(path, fs, App_Path, BrowserWindow, ipcMain, app, Tray, Menu) {

    let win
    let tray
    let contextMenu

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

    win.removeMenu();
    win?.loadFile(path.join(__dirname, './pages/home.html'));

    // FOR AUTOSTARTING && AUDIO WINDOW
    const settings = fs.readJsonSync(path.join(App_Path, './data/settings.json'));

    win?.once('ready-to-show', () => {
        console.log("[Altaqwaa-CLI] Main Window Ready.")

        if (process.argv.includes('--hidden')) {
            win?.hide()
            console.log("[Altaqwaa-CLI] Main Window Hidden.")
        } else if (settings?.startHidden == true) {
            win?.hide()
            console.log("[Altaqwaa-CLI] Main Window Hidden.")
        } else {
            win?.show();
            console.log("[Altaqwaa-CLI] Main Window Shown.")
        }

        //win.webContents.openDevTools();

        /* LOAD AUDIO WINDOW AFTER MAIN WINDOW (HOME) IS READY & LOADED */
        if (settings.notifications_adhan == true || settings.notifications_adhkar == true) {
            const audio_window = require('./window/audio_window.js');
            console.log("[Altaqwaa-CLI] Audio Window Enabled Starting...")
            audio_window(path, App_Path, BrowserWindow, ipcMain, app)
        } else {
            console.log("[Altaqwaa-CLI] Audio Window Disabled.")
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
                if(settings.startHidden) {
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
        tray_window(path, tray, win, ipcMain, app);
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
