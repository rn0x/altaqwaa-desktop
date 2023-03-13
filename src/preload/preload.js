/* PACKAGES */
const { ipcRenderer, shell } = require('electron');
const fs = require('fs-extra');
const path = require('path');
const darkMode = require('./darkMode.js');

window.addEventListener('DOMContentLoaded', async (event) => {
  event.preventDefault();

  const App_Path = await ipcRenderer.invoke('App_Path');

  /* DARK MODE */
  await darkMode(fs, path, App_Path);
  
  const pageFile = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
  document.documentElement.style.setProperty('--animate-duration', '1.5s');
  document.getElementById('closed').addEventListener('click', e => ipcRenderer.send('closed'));
  document.getElementById('minimizable').addEventListener('click', e => ipcRenderer.send('minimizable'));
  document.getElementById('minimize').addEventListener('click', e => ipcRenderer.send('minimize'));

  /* PAGES LOAD (SWITCH) */
  switch (pageFile) {

    /* BREAKABLE PAGES (NO PRELOAD REQUIRED) */
    case "home.html":
      break;
    case "evening.html":
      break;
    case "food.html":
      break;
    case "morning.html":
      break;
    case "prayer.html":
      break;
    case "sleeping.html":
      break;
    case "tasbih.html":
      break;

    /* MAIN PAGES (WITH PRELOAD) */

    case "surah.html":
      let surah = require('./preload_modules/surah.js');
      await surah(fs, path, App_Path);
      break;

    case "quran.html":
      let quran = require('./preload_modules/quran.js');
      await quran(fs, path, App_Path);
      break;

    case "quran_mp3.html":
      let quran_mp3 = require('./preload_modules/quran_mp3.js');
      await quran_mp3(fs, path, App_Path);
      break;

    case "adhkar.html":
      let adhkar = require('./preload_modules/adhkar.js');
      await adhkar(fs, path);
      break;

    case "hisnmuslim.html":
      let hisnmuslim = require('./preload_modules/hisnmuslim.js');
      await hisnmuslim(fs, path);
      break;

    case "prayer_time.html":
      let prayer_time = require('./preload_modules/prayer_time.js');
      await prayer_time(fs, path, App_Path);
      break;

    case "settings.html":
      let settings = require('./preload_modules/settings.js');
      await settings(fs, path, App_Path);
      break;

    case "info.html":
      let info = require('./preload_modules/info.js');
      await info(fs, path, App_Path, shell);
      break;

    /* THE DEFAULT FOR UNEXPECTED THING HAPPEN */
    default:
      window.location.href = "./home.html";
      break;
  }
});