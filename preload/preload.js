const { ipcRenderer } = require('electron');
const fs = require('fs-extra');
const path = require('path');
const home = require('./home.js');
const surah = require('./surah.js');
const barWindow = require('./barWindow.js');
const Quran = require('./quran.js');
const quran_mp3 = require('./quran_mp3.js');
const adhkar = require('./adhkar.js');
const morning = require('./morning.js');
const evening = require('./evening.js');
const sleeping = require('./sleeping.js');
const food = require('./food.js');
const tasbih = require('./tasbih.js');
const prayer_time = require('./prayer_time.js');
const prayer = require('./prayer.js');
const settings = require('./settings.js');
const info = require('./info.js');
const hisnmuslim = require('./hisnmuslim.js');


window.addEventListener('DOMContentLoaded', async (e) => {

  e.preventDefault();

  let App_Path = await ipcRenderer.invoke('App_Path');

  barWindow();
  home(App_Path);
  surah(App_Path);
  Quran(App_Path);
  quran_mp3(App_Path);
  adhkar();
  morning();
  evening();
  sleeping();
  food();
  tasbih();
  prayer();
  prayer_time(App_Path);
  settings(App_Path);
  info(App_Path);
  hisnmuslim();

});