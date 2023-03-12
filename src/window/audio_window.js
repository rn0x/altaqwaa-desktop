module.exports = function audio_window(path, App_Path, BrowserWindow, ipcMain) {

    let win

    ipcMain?.handle('App_Path3', async () => {
        return App_Path
    });
    
    ipcMain?.on('closed3', () => {
        if (win?.isVisible()) {
            win?.hide();
        }
    });

    ipcMain?.on('show3', () => {
        win?.show();
    });

    win = new BrowserWindow({
        width: 600,
        height: 200,
        x: 450,
        y: 0,
        show: false,
        center: true,
        frame: false,
        resizable: false,
        title: 'التقوى',
        icon: path.join(__dirname, '../build/icons/icon.png'),
        webPreferences: {
            sandbox: false,
            preload: path.join(__dirname, '../preload/audio_window.js')
        }
    });


    win.removeMenu();

    win?.loadFile(path.join(__dirname, '../pages/audio_window.html'));

    win?.once('ready-to-show', () => {
        console.log("[Altaqwaa-CLI] Audio Window Ready.")
        win?.hide();
        console.log("[Altaqwaa-CLI] Audio Window Hidden.")
    });

    win?.on('closed', (event) => {
        event?.preventDefault();
        win = null
    });

}