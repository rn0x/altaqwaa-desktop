/* PACKAGES */
const { ipcRenderer } = require('electron');
const fs = require('fs-extra');
const path = require('path');

/* MAIN MODULES */
let home = require('./preload_modules/home.js');
let info = require('./preload_modules/info.js');
let surah = require('./preload_modules/surah.js');
let quran = require('./preload_modules/quran.js');
let prayer_time = require('./preload_modules/prayer_time.js');
let settings = require('./preload_modules/settings.js');
let hisnmuslim = require('./preload_modules/hisnmuslim.js');
let quran_mp3 = require('./preload_modules/quran_mp3.js');
let adhkar = require('./preload_modules/adhkar.js');

/* ADHKAR MODULES */
let morning = require('./adhkar_modules/morning.js');
let evening = require('./adhkar_modules/evening.js');
let sleeping = require('./adhkar_modules/sleeping.js');
let food = require('./adhkar_modules/food.js');
let tasbih = require('./adhkar_modules/tasbih.js');
let prayer = require('./adhkar_modules/prayer.js');

/* COPY FUNCTION */
function copy(id) {
  var createRange = document.createRange();
  createRange.selectNode(document.getElementById(id));
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(createRange);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
};

window.addEventListener('DOMContentLoaded', async (event) => {
  event.preventDefault();

  document.documentElement.style.setProperty('--animate-duration', '2.0s');
  document.getElementById('closed').addEventListener('click', e => ipcRenderer.send('closed'));
  document.getElementById('minimizable').addEventListener('click', e => ipcRenderer.send('minimizable'));
  document.getElementById('minimize').addEventListener('click', e => ipcRenderer.send('minimize'));

  const App_Path = await ipcRenderer.invoke('App_Path');

  /* PAGES LOAD (SWITCH) */
  let pageFile = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
  switch (pageFile) {

    /* MAIN PAGES */

    case "home.html":
      home();
      break;

    case "surah.html":
      await surah(fs, path, App_Path);
      break;

    case "quran.html":
      await quran(fs, path, App_Path, copy);
      break;

    case "quran_mp3.html":
      await quran_mp3(fs, path, App_Path);
      break;

    case "adhkar.html":
      await adhkar(fs, path, copy);
      break;

    case "hisnmuslim.html":
      await hisnmuslim(fs, path);
      break;

    case "prayer_time.html":
      await prayer_time(fs, path, App_Path);
      break;

    case "settings.html":
      await settings(fs, path, App_Path);
      break;

    case "info.html":
      await info(fs, path, App_Path);
      break;

    /* ADHKAR PAGES */

    case "evening.html":
      evening(copy);
      break;

    case "food.html":
      food(copy);
      break;

    case "morning.html":
      morning(copy);
      break;

    case "sleeping.html":
      sleeping(copy);
      break;

    case "tasbih.html":
      tasbih(copy);
      break;

    case "prayer.html":
      await prayer(copy);
      break;

    default:
      window.location.href = "./home.html";
      break;
  }
});