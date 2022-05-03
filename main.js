const { app, BrowserWindow, ipcMain, Tray, Menu, Notification, globalShortcut } = require('electron');
const path = require('path');
const folder = require('./folder.js');
const fs = require('fs-extra');
const moment = require('moment-timezone');

let path_folder = fs.existsSync(path.join(process.resourcesPath, '/build')) === true ? process.resourcesPath : __dirname
folder(app.getPath("appData"), path_folder); // copy file 
let mainWindow
let tray
let trayMenu
let adhkar_windo

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

  // mainWindow.on("show", (event) => {
  //   event.preventDefault();
  // });

  mainWindow.on('closed', (event) => {
    event.preventDefault();
    tray = null
    trayMenu = null
    mainWindow = null
    adhkar_windo = null
    if (adhkar_windo !== null && adhkar_windo.isVisible()) {

      adhkar_windo.close();

    }
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
    mainWindow.isVisible() !== null && mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  });


}

app.whenReady().then(async () => {

  createWindow();

  let json_notification = fs.readJsonSync(path.join(app.getPath("appData"), '/json/notification.json')); // return notification true or false

  adhkar_windo = new BrowserWindow({
    width: 530,
    height: 130,
    x: 500,
    y: 0,
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

  adhkar_windo.loadFile('./app/Adhkar_AM_PM.html');
  adhkar_windo.removeMenu();
  adhkar_windo.on('closed', (event) => {
    event.preventDefault();
    adhkar_windo = null
  });

  // اختصار الكيبورد لفتح وإخفاء نافذة التطبيق
  globalShortcut.register('Ctrl+shift+T', () => {

    console.log('Ctrl+shift+T')

    if (mainWindow.isVisible()) {
      mainWindow.hide()
    }
    else {
      mainWindow.show()
    }

  });

  // عند بدء تشغيل النظام يتم تشغيل التطبيق في الخلفية
  if (process.argv.includes('--hidden')) {

    mainWindow.hide();

  }

  // عند الساعه السابعة يتم إظهر نافذة اذكار الصباح والمساء - صوت
  setInterval(() => {

    let time = moment().format('LT');

    if (time === '7:15 AM' && json_notification.notification === true) {

      if (adhkar_windo.isVisible()) {

        adhkar_windo.close();

      }

      else if (adhkar_windo.isVisible() === false) {

        adhkar_windo.show();

      }

      setTimeout(() => {

        if (adhkar_windo !== null && adhkar_windo.isVisible()) {

          adhkar_windo.close();

        }

      }, 600000);

    }

    else if (time === '7:15 PM' && json_notification.notification === true) {

      if (adhkar_windo.isVisible()) {

        adhkar_windo.close();

      }

      else if (adhkar_windo.isVisible() === false) {

        adhkar_windo.show();

      }

      setTimeout(() => {

        if (adhkar_windo !== null && adhkar_windo.isVisible()) {

          adhkar_windo.close();

        }

      }, 600000);

    }

  }, 60000);

});

app.on('ready', (e) => {

  e.preventDefault();
  app.setAppUserModelId("org.altaqwaa.rn0x");

  ipcMain.on('minimize', () => {
    mainWindow.minimize()
  });

  ipcMain.on('close', () => {

    mainWindow.close();

  });

  ipcMain.on('close2', () => {

    if (adhkar_windo !== null && adhkar_windo.isVisible()) {

      adhkar_windo.close();

    }
    
  });

  ipcMain.on('minimize2', () => {
    adhkar_windo.minimize()
  });

  ipcMain.handle('electron-app-get-path', async () => {
    return app.getPath("appData") //  مسار ملفات التطبيق
  });


});

// عند إغلاق التطبيق يتم إغلاق ايقونة شريط المهام

app.on('before-quit', function () {
  tray.destroy();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

// بدء تشغيل التطبيق مع بدء تشغيل النظام للويندوز فقط
app.setLoginItemSettings({
  openAtLogin: true,
  args: ['--hidden']
});