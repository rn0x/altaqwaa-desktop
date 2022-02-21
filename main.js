const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {

  let mainWindow = new BrowserWindow({
    width: 900,
    height: 550,
    show: false,
    center: true,
    resizable: false,
    title: 'التقوى',
    icon: path.join(__dirname, '/build/icon/icon.png')
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
