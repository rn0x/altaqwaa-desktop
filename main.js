const { app, BrowserWindow, ipcMain, Tray, Menu, Notification } = require('electron');
const path = require('path');
const notification = require('./notifications.js');
const folder = require('./folder.js');
const fs = require('fs-extra');

let path_folder = fs.existsSync(path.join(process.resourcesPath, '/build')) === true ? process.resourcesPath : __dirname
folder(app.getPath("appData"), path_folder); // copy file 
let mainWindow
let tray
let trayMenu

const createWindow = () => {

  mainWindow = new BrowserWindow({
    width: 900,
    height: 550,
    show: false,
    center: true,
    resizable: false,
    frame: false,
    title: 'التقوى',
    icon: path.join(path_folder, '/build/icons/icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('./app/adhkar/adhkar.html');
  mainWindow.removeMenu()

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('minimize', (event) => {
    event.preventDefault();
    mainWindow.hide();
  });

  mainWindow.on("show", (event) => {
    event.preventDefault();
  });

  mainWindow.on('closed', (event) => {
    event.preventDefault();
    tray = null
    trayMenu = null
    mainWindow = null
  });


  trayMenu = Menu.buildFromTemplate([
    {
      label: 'إيقاف الإشعارات', click: function () {

        fs.writeJsonSync(path.join(app.getPath("appData"), '/json/notification.json'), { notification: false }, { spaces: '\t' });
        let notification = new Notification({
          title: 'تم إيقاف الإشعارات بنجاح ⚠️',
          body: '',
          silent: true,
          icon: path.join(path_folder, '/build/icons/icon.png'),
          urgency: "normal",
          timeoutType: 'never',
        })

        notification.show()
        setTimeout(() => notification.close(), 3000);

      }
    },
    {
      label: 'تفعيل الإشعارات', click: function () {

        fs.writeJsonSync(path.join(app.getPath("appData"), '/json/notification.json'), { notification: true }, { spaces: '\t' });
        let notification = new Notification({
          title: 'تم تفعيل الإشعارات بنجاح ✔️',
          body: '',
          silent: true,
          icon: path.join(path_folder, '/build/icons/icon.png'),
          urgency: "normal",
          timeoutType: 'never',
        })

        notification.show()
        setTimeout(() => notification.close(), 3000);
      }
    },
    {
      label: 'عرض التطبيق', click: function () {
        mainWindow.show();
      }
    },
    {
      label: 'إغلاق', click: function () {
        mainWindow.destroy();
        app.isQuiting = true;
        app.quit();
      }
    }
  ]);
  tray = new Tray(path.join(path_folder, '/build/icons/icon.png'));
  tray.setContextMenu(trayMenu);
  tray.setToolTip("التقوى");
  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  });


}

app.whenReady().then(async () => {

  createWindow();
  notification(app.getPath("appData"), path_folder);

  if (process.argv.includes('--hidden')) {

    mainWindow.hide()

  }

});

app.on('ready', (e) => {

  e.preventDefault();
  app.setAppUserModelId("org.altaqwaa.rn0x");

  ipcMain.on('minimize', () => {

    mainWindow.minimize()
  });

  ipcMain.on('close', () => {
    mainWindow.close()
  });

  ipcMain.handle('electron-app-get-path', async () => {
    return app.getPath("appData") //  path files
  });


});

app.on('before-quit', function () {
  tray.destroy();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.setLoginItemSettings({
  openAtLogin: true,
  args: ['--hidden']
});