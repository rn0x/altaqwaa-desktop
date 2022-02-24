const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow

const createWindow = () => {

  mainWindow = new BrowserWindow({
    width: 900,
    height: 550,
    show: false,
    center: true,
    resizable: false,
    frame: false,
    title: 'التقوى',
    icon: path.join(__dirname, '/build/icons/icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('./app/adhkar/adhkar.html');
  mainWindow.removeMenu()

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  });

  mainWindow.on('closed', () => {
    mainWindow = null
  });

}

ipcMain.on('minimize', () => {

  mainWindow.minimize()
});


ipcMain.on('close', () => {
  mainWindow.close()
});

app.whenReady().then(() => {

  createWindow();

});

app.on('activate', () => {

  if (BrowserWindow.getAllWindows().length === 0) {

    createWindow();

  }

});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});
