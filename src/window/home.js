const location = require('../modules/location.js');

module.exports = async function homeWindow(path, fs, App_Path, BrowserWindow, ipcMain, app, Tray, Menu, globalShortcut) {
    await location(path, fs, App_Path);

    let win
    let tray
    let contextMenu

    win = new BrowserWindow({
        width: 1000,
        height: 620,
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
    win?.loadFile(path.join(__dirname, '../pages/home.html'));

    win?.once('ready-to-show', () => {
        win?.show();
        win.webContents.openDevTools();
    });

    win?.on('minimize', (event) => {
        event?.preventDefault();
        win?.hide();
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

    if (process.argv.includes('--hidden')) {

        win?.hide()

    }

    else if (process.platform === 'win32' || process.platform === "win64") {
        let tray_window = require('./tray_window.js')
        tray_window(path, tray, win, ipcMain, app);
    }

    else if (process.platform === 'linux') {

        let homePath = app?.getPath('home');
        let autostart = fs.existsSync(`${homePath}/.config/autostart`);

        tray.on('click', () => {

            if (win?.isVisible()) {
                win?.hide();
            }
            else {
                win?.show();
            }
        });

        if (autostart === false) {

            fs.mkdirSync(`${homePath}/.config/autostart`, { recursive: true });
            let desktop = fs.existsSync(`${homePath}/.config/autostart/Altaqwaa.desktop`);
            if (desktop === false) {

                let data = '[Desktop Entry]\n'
                data += 'Name=Altaqwaa\n'
                data += 'Icon=org.altaqwaa.rn0x\n'
                data += 'Exec=altaqwaa\n'
                data += 'Terminal=false\n'
                data += 'Type=Application\n'
                data += 'Comment=Altaqwaa-Islamic-Desktop-Application\n'
                data += 'Categories=Education'

                fs.writeFileSync(`${homePath}/.config/autostart/Altaqwaa.desktop`, data);

            }
        }

        if (autostart) {

            let desktop = fs.existsSync(`${homePath}/.config/autostart/Altaqwaa.desktop`);
            if (desktop === false) {

                let data = '[Desktop Entry]\n'
                data += 'Name=Altaqwaa\n'
                data += 'Icon=org.altaqwaa.rn0x\n'
                data += 'Exec=altaqwaa\n'
                data += 'Terminal=false\n'
                data += 'Type=Application\n'
                data += 'Comment=Altaqwaa-Islamic-Desktop-Application\n'
                data += 'Categories=Education'

                fs.writeFileSync(`${homePath}/.config/autostart/Altaqwaa.desktop`, data);

            }
        }

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