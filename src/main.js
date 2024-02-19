/**
 * ALTAQWAA v4.0.0 - Islamic Desktop Application
 * LICENSE: GPL-3.0
 * GITHUB: https://github.com/rn0x/Altaqwaa-Islamic-Desktop-Application 
**/

const { app, BrowserWindow, Menu } = require('electron/main')
const path = require('node:path')

// REMOVE THE APP MENU FOR ALL BROWSER WINDOWS
Menu.setApplicationMenu(null);

// LOADING WINDOW (THE MAIN FUNCTION)
let loadingWindow;
async function main() {
  loadingWindow = new BrowserWindow({
      width: 128,
      height: 128,
      transparent: true,
      frame: false,
      alwaysOnTop: true,
      show: true,
      center: true,
      title: 'التقوى',
      icon: path.join(__dirname, './build/icons/icon.png'),
      webPreferences: {
          nodeIntegration: false,
          sandbox: true
      }
  })
  
  loadingWindow.loadFile(path.join(__dirname, 'loading.html'));
  loadingWindow.setResizable(false);
  loadingWindow.setFullScreenable(false);

  // WORK IN PROGRESS
  
  // altaqwaaApp()
}

// APPLICATION WINDOW (ALTAQWAA)
let altaqwaa;
async function altaqwaaApp() {
    altaqwaa = new BrowserWindow({
        width: 1000,
        height: 645,
        minWidth: 1000,
        minHeight: 645,
        show: false,
        center: true,
        frame: true,
        title: 'التقوى',
        icon: path.join(__dirname, './build/icons/icon.png'),
        webPreferences: {
            nodeIntegration: true,
            sandbox: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    altaqwaa.loadFile(path.join(__dirname, './pages/home.html'));

    // appPath => appDataPath / appInitialization.js => Removed & Replaced With appData Function To Decrease require() calls.
    const fs = require('fs-extra');
    const appDataPath = path.join(app.getPath("appData"), 'altaqwaa');
    await appData(appDataPath, fs)

    loadingWindow.close();
    altaqwaa.show();
}

async function appData(appDataPath, fs) {
  // WORK IN PROGRESS
}

app.whenReady().then(() => {
  main()
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
     main()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});
