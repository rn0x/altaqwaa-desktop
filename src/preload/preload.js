/* PACKAGES */
const { ipcRenderer, shell } = require('electron');
const fs = require('fs-extra');
const path = require('path');

window.addEventListener('DOMContentLoaded', async (event) => {
  event.preventDefault();

  const App_Path = await ipcRenderer.invoke('App_Path');

  const pageFile = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
  document.documentElement.style.setProperty('--animate-duration', '2s');
  document.getElementById('closed').addEventListener('click', e => ipcRenderer.send('closed'));
  document.getElementById('minimizable').addEventListener('click', e => ipcRenderer.send('minimizable'));
  document.getElementById('minimize').addEventListener('click', e => ipcRenderer.send('minimize'));
    
  /* DARK/LIGHT MODE */
  const settings = fs.readJsonSync(path.join(App_Path, './data/settings.json'));

  // variables font size
  document.body.style.setProperty('--font_size_surah', `${settings?.font_size_quran}px`);
  document.body.style.setProperty('--font_size_adhkar', `${settings?.font_size_adhkar}px`);

  if (settings?.dark_mode === false) {
    // stylesheet 

    let variables_css = document.getElementById("variables_css");

    // window controls
    let icon_closed_window = document.getElementById("icon_closed_window");
    let icon_minimizable_window = document.getElementById("icon_minimizable_window");
    let icon_minimize_window = document.getElementById("icon_minimize_window");

    // menu 
    let icon_home = document.getElementById("icon_home");
    let icon_surah = document.getElementById("icon_surah");
    let icon_menu_mp3 = document.getElementById("icon_menu_mp3");
    let icon_adhkar = document.getElementById("icon_adhkar");
    let icon_hisnmuslim = document.getElementById("icon_hisnmuslim");
    let icon_prayer_time = document.getElementById("icon_prayer_time");
    let icon_settings = document.getElementById("icon_settings");
    let icon_info = document.getElementById("icon_info");

    // document 

    let logo = document.getElementById("logo");
    let copy = document.getElementById("copy");
    let random = document.getElementById("random");
    let mp3_hisn_closed = document.getElementById("mp3_hisn_closed");
    let icon_c_p = document.getElementsByClassName("icon_c_p");
    let home_icon_quran = document.getElementById("home_icon_quran");
    let home_icon_quran_mp3 = document.getElementById("home_icon_quran_mp3");
    let home_icon_adhkar = document.getElementById("home_icon_adhkar");
    let home_icon_hisnmuslim = document.getElementById("home_icon_hisnmuslim");
    let home_icon_prayer = document.getElementById("home_icon_prayer");
    let home_icon_settings = document.getElementById("home_icon_settings");

    /* PAGES LOAD (SWITCH) */
    switch (pageFile) {

      /* BREAKABLE PAGES (NO PRELOAD REQUIRED) */
      case "home.html":
        // stylesheet 
        variables_css.href = '../public/css/var_light.css';

        // window controls
        icon_closed_window.srcset = '../public/icon/dark/closed.png';
        icon_minimizable_window.srcset = '../public/icon/dark/minimizable.png';
        icon_minimize_window.srcset = '../public/icon/dark/minimize.png';

        // menu 
        icon_home.src = '../public/icon/dark/home.png';
        icon_surah.src = '../public/icon/dark/quran.png';
        icon_menu_mp3.src = '../public/icon/dark/sound.png';
        icon_adhkar.src = '../public/icon/dark/open-hands.png';
        icon_hisnmuslim.src = '../public/icon/dark/castle.png';
        icon_prayer_time.src = '../public/icon/dark/azan.png';
        icon_settings.src = '../public/icon/dark/settings.png';
        icon_info.src = '../public/icon/dark/info.png';

        // document
        logo.src = '../public/icon/dark/logo.png';
        home_icon_quran.src = '../public/icon/dark/quran.png';
        home_icon_quran_mp3.src = '../public/icon/dark/sound.png';
        home_icon_adhkar.src = '../public/icon/dark/open-hands.png';
        home_icon_hisnmuslim.src = '../public/icon/dark/castle.png';
        home_icon_prayer.src = '../public/icon/dark/azan.png';
        home_icon_settings.src = '../public/icon/dark/settings.png';
        break;
      case "evening.html":
        // stylesheet 
        variables_css.href = '../../public/css/var_light.css';

        // window controls
        icon_closed_window.srcset = '../../public/icon/dark/closed.png';
        icon_minimizable_window.srcset = '../../public/icon/dark/minimizable.png';
        icon_minimize_window.srcset = '../../public/icon/dark/minimize.png';

        // menu 
        icon_home.src = '../../public/icon/dark/home.png';
        icon_surah.src = '../../public/icon/dark/quran.png';
        icon_menu_mp3.src = '../../public/icon/dark/sound.png';
        icon_adhkar.src = '../../public/icon/dark/open-hands.png';
        icon_hisnmuslim.src = '../../public/icon/dark/castle.png';
        icon_prayer_time.src = '../../public/icon/dark/azan.png';
        icon_settings.src = '../../public/icon/dark/settings.png';
        icon_info.src = '../../public/icon/dark/info.png';

        for (let item of Array.from(icon_c_p)) {
          item.src = "../../public/icon/dark/copy.png"
        }
        break;
      case "food.html":
        // stylesheet 
        variables_css.href = '../../public/css/var_light.css';

        // window controls
        icon_closed_window.srcset = '../../public/icon/dark/closed.png';
        icon_minimizable_window.srcset = '../../public/icon/dark/minimizable.png';
        icon_minimize_window.srcset = '../../public/icon/dark/minimize.png';

        // menu 
        icon_home.src = '../../public/icon/dark/home.png';
        icon_surah.src = '../../public/icon/dark/quran.png';
        icon_menu_mp3.src = '../../public/icon/dark/sound.png';
        icon_adhkar.src = '../../public/icon/dark/open-hands.png';
        icon_hisnmuslim.src = '../../public/icon/dark/castle.png';
        icon_prayer_time.src = '../../public/icon/dark/azan.png';
        icon_settings.src = '../../public/icon/dark/settings.png';
        icon_info.src = '../../public/icon/dark/info.png';
        for (let item of Array.from(icon_c_p)) {
          console.log(item);
          item.src = "../../public/icon/dark/copy.png"
        }
        break;
      case "morning.html":
        // stylesheet 
        variables_css.href = '../../public/css/var_light.css';

        // window controls
        icon_closed_window.srcset = '../../public/icon/dark/closed.png';
        icon_minimizable_window.srcset = '../../public/icon/dark/minimizable.png';
        icon_minimize_window.srcset = '../../public/icon/dark/minimize.png';

        // menu 
        icon_home.src = '../../public/icon/dark/home.png';
        icon_surah.src = '../../public/icon/dark/quran.png';
        icon_menu_mp3.src = '../../public/icon/dark/sound.png';
        icon_adhkar.src = '../../public/icon/dark/open-hands.png';
        icon_hisnmuslim.src = '../../public/icon/dark/castle.png';
        icon_prayer_time.src = '../../public/icon/dark/azan.png';
        icon_settings.src = '../../public/icon/dark/settings.png';
        icon_info.src = '../../public/icon/dark/info.png';
        for (let item of Array.from(icon_c_p)) {
          console.log(item);
          item.src = "../../public/icon/dark/copy.png"
        }
        break;
      case "prayer.html":
        // stylesheet 
        variables_css.href = '../../public/css/var_light.css';

        // window controls
        icon_closed_window.srcset = '../../public/icon/dark/closed.png';
        icon_minimizable_window.srcset = '../../public/icon/dark/minimizable.png';
        icon_minimize_window.srcset = '../../public/icon/dark/minimize.png';

        // menu 
        icon_home.src = '../../public/icon/dark/home.png';
        icon_surah.src = '../../public/icon/dark/quran.png';
        icon_menu_mp3.src = '../../public/icon/dark/sound.png';
        icon_adhkar.src = '../../public/icon/dark/open-hands.png';
        icon_hisnmuslim.src = '../../public/icon/dark/castle.png';
        icon_prayer_time.src = '../../public/icon/dark/azan.png';
        icon_settings.src = '../../public/icon/dark/settings.png';
        icon_info.src = '../../public/icon/dark/info.png';
        for (let item of Array.from(icon_c_p)) {
          console.log(item);
          item.src = "../../public/icon/dark/copy.png"
        }
        break;
      case "sleeping.html":
        // stylesheet 
        variables_css.href = '../../public/css/var_light.css';

        // window controls
        icon_closed_window.srcset = '../../public/icon/dark/closed.png';
        icon_minimizable_window.srcset = '../../public/icon/dark/minimizable.png';
        icon_minimize_window.srcset = '../../public/icon/dark/minimize.png';

        // menu 
        icon_home.src = '../../public/icon/dark/home.png';
        icon_surah.src = '../../public/icon/dark/quran.png';
        icon_menu_mp3.src = '../../public/icon/dark/sound.png';
        icon_adhkar.src = '../../public/icon/dark/open-hands.png';
        icon_hisnmuslim.src = '../../public/icon/dark/castle.png';
        icon_prayer_time.src = '../../public/icon/dark/azan.png';
        icon_settings.src = '../../public/icon/dark/settings.png';
        icon_info.src = '../../public/icon/dark/info.png';

        for (let item of Array.from(icon_c_p)) {
          console.log(item);
          item.src = "../../public/icon/dark/copy.png"
        }
        break;
      case "tasbih.html":
        // stylesheet 
        variables_css.href = '../../public/css/var_light.css';

        // window controls
        icon_closed_window.srcset = '../../public/icon/dark/closed.png';
        icon_minimizable_window.srcset = '../../public/icon/dark/minimizable.png';
        icon_minimize_window.srcset = '../../public/icon/dark/minimize.png';

        // menu 
        icon_home.src = '../../public/icon/dark/home.png';
        icon_surah.src = '../../public/icon/dark/quran.png';
        icon_menu_mp3.src = '../../public/icon/dark/sound.png';
        icon_adhkar.src = '../../public/icon/dark/open-hands.png';
        icon_hisnmuslim.src = '../../public/icon/dark/castle.png';
        icon_prayer_time.src = '../../public/icon/dark/azan.png';
        icon_settings.src = '../../public/icon/dark/settings.png';
        icon_info.src = '../../public/icon/dark/info.png';

        for (let item of Array.from(icon_c_p)) {
          console.log(item);
          item.src = "../../public/icon/dark/copy.png"
        }
        break;

      /* MAIN PAGES (WITH PRELOAD) */

      case "surah.html":
        variables_css.href = '../public/css/var_light.css';

        // window controls
        icon_closed_window.srcset = '../public/icon/dark/closed.png';
        icon_minimizable_window.srcset = '../public/icon/dark/minimizable.png';
        icon_minimize_window.srcset = '../public/icon/dark/minimize.png';

        // menu 
        icon_home.src = '../public/icon/dark/home.png';
        icon_surah.src = '../public/icon/dark/quran.png';
        icon_menu_mp3.src = '../public/icon/dark/sound.png';
        icon_adhkar.src = '../public/icon/dark/open-hands.png';
        icon_hisnmuslim.src = '../public/icon/dark/castle.png';
        icon_prayer_time.src = '../public/icon/dark/azan.png';
        icon_settings.src = '../public/icon/dark/settings.png';
        icon_info.src = '../public/icon/dark/info.png';

        let surah = require('./preload_modules/surah.js');
        await surah(fs, path, App_Path);
        break;

      case "quran.html":
        // stylesheet 
        variables_css.href = '../public/css/var_light.css';


        // window controls
        icon_closed_window.srcset = '../public/icon/dark/closed.png';
        icon_minimizable_window.srcset = '../public/icon/dark/minimizable.png';
        icon_minimize_window.srcset = '../public/icon/dark/minimize.png';

        // menu 
        icon_home.src = '../public/icon/dark/home.png';
        icon_surah.src = '../public/icon/dark/quran.png';
        icon_menu_mp3.src = '../public/icon/dark/sound.png';
        icon_adhkar.src = '../public/icon/dark/open-hands.png';
        icon_hisnmuslim.src = '../public/icon/dark/castle.png';
        icon_prayer_time.src = '../public/icon/dark/azan.png';
        icon_settings.src = '../public/icon/dark/settings.png';
        icon_info.src = '../public/icon/dark/info.png';

        let quran = require('./preload_modules/quran.js');
        await quran(fs, path, App_Path);
        break;

      case "quran_mp3.html":
        // stylesheet 
        variables_css.href = '../public/css/var_light.css';

        // window controls
        icon_closed_window.srcset = '../public/icon/dark/closed.png';
        icon_minimizable_window.srcset = '../public/icon/dark/minimizable.png';
        icon_minimize_window.srcset = '../public/icon/dark/minimize.png';

        // menu 
        icon_home.src = '../public/icon/dark/home.png';
        icon_surah.src = '../public/icon/dark/quran.png';
        icon_menu_mp3.src = '../public/icon/dark/sound.png';
        icon_adhkar.src = '../public/icon/dark/open-hands.png';
        icon_hisnmuslim.src = '../public/icon/dark/castle.png';
        icon_prayer_time.src = '../public/icon/dark/azan.png';
        icon_settings.src = '../public/icon/dark/settings.png';
        icon_info.src = '../public/icon/dark/info.png';

        let quran_mp3 = require('./preload_modules/quran_mp3.js');
        await quran_mp3(fs, path, App_Path, settings);
        break;

      case "adhkar.html":
        // stylesheet 
        variables_css.href = '../public/css/var_light.css';

        // window controls
        icon_closed_window.srcset = '../public/icon/dark/closed.png';
        icon_minimizable_window.srcset = '../public/icon/dark/minimizable.png';
        icon_minimize_window.srcset = '../public/icon/dark/minimize.png';

        // menu 
        icon_home.src = '../public/icon/dark/home.png';
        icon_surah.src = '../public/icon/dark/quran.png';
        icon_menu_mp3.src = '../public/icon/dark/sound.png';
        icon_adhkar.src = '../public/icon/dark/open-hands.png';
        icon_hisnmuslim.src = '../public/icon/dark/castle.png';
        icon_prayer_time.src = '../public/icon/dark/azan.png';
        icon_settings.src = '../public/icon/dark/settings.png';
        icon_info.src = '../public/icon/dark/info.png';

        // document 

        copy.src = '../public/icon/dark/copy.png';
        random.src = '../public/icon/dark/random.png';

        let adhkar = require('./preload_modules/adhkar.js');
        await adhkar(fs, path);
        break;

      case "hisnmuslim.html":
        // stylesheet 
        variables_css.href = '../public/css/var_light.css';

        // window controls
        icon_closed_window.srcset = '../public/icon/dark/closed.png';
        icon_minimizable_window.srcset = '../public/icon/dark/minimizable.png';
        icon_minimize_window.srcset = '../public/icon/dark/minimize.png';

        // menu 
        icon_home.src = '../public/icon/dark/home.png';
        icon_surah.src = '../public/icon/dark/quran.png';
        icon_menu_mp3.src = '../public/icon/dark/sound.png';
        icon_adhkar.src = '../public/icon/dark/open-hands.png';
        icon_hisnmuslim.src = '../public/icon/dark/castle.png';
        icon_prayer_time.src = '../public/icon/dark/azan.png';
        icon_settings.src = '../public/icon/dark/settings.png';
        icon_info.src = '../public/icon/dark/info.png';

        // document 

        mp3_hisn_closed.src = '../public/icon/dark/closed.png';

        let hisnmuslim = require('./preload_modules/hisnmuslim.js');
        await hisnmuslim(fs, path);
        break;

      case "prayer_time.html":
        // stylesheet 
        variables_css.href = '../public/css/var_light.css';

        // window controls
        icon_closed_window.srcset = '../public/icon/dark/closed.png';
        icon_minimizable_window.srcset = '../public/icon/dark/minimizable.png';
        icon_minimize_window.srcset = '../public/icon/dark/minimize.png';

        // menu 
        icon_home.src = '../public/icon/dark/home.png';
        icon_surah.src = '../public/icon/dark/quran.png';
        icon_menu_mp3.src = '../public/icon/dark/sound.png';
        icon_adhkar.src = '../public/icon/dark/open-hands.png';
        icon_hisnmuslim.src = '../public/icon/dark/castle.png';
        icon_prayer_time.src = '../public/icon/dark/azan.png';
        icon_settings.src = '../public/icon/dark/settings.png';
        icon_info.src = '../public/icon/dark/info.png';

        let prayer_time = require('./preload_modules/prayer_time.js');
        await prayer_time(fs, path, App_Path, settings);
        break;

      case "settings.html":
        // stylesheet 
        variables_css.href = '../public/css/var_light.css';

        // window controls
        icon_closed_window.srcset = '../public/icon/dark/closed.png';
        icon_minimizable_window.srcset = '../public/icon/dark/minimizable.png';
        icon_minimize_window.srcset = '../public/icon/dark/minimize.png';

        // menu 
        icon_home.src = '../public/icon/dark/home.png';
        icon_surah.src = '../public/icon/dark/quran.png';
        icon_menu_mp3.src = '../public/icon/dark/sound.png';
        icon_adhkar.src = '../public/icon/dark/open-hands.png';
        icon_hisnmuslim.src = '../public/icon/dark/castle.png';
        icon_prayer_time.src = '../public/icon/dark/azan.png';
        icon_settings.src = '../public/icon/dark/settings.png';
        icon_info.src = '../public/icon/dark/info.png';

        let settingsPage = require('./preload_modules/settings.js');
        await settingsPage(fs, path, App_Path, settings, ipcRenderer);
        break;

      case "info.html":
        // stylesheet 
        variables_css.href = '../public/css/var_light.css';

        // window controls
        icon_closed_window.srcset = '../public/icon/dark/closed.png';
        icon_minimizable_window.srcset = '../public/icon/dark/minimizable.png';
        icon_minimize_window.srcset = '../public/icon/dark/minimize.png';

        // menu 
        icon_home.src = '../public/icon/dark/home.png';
        icon_surah.src = '../public/icon/dark/quran.png';
        icon_menu_mp3.src = '../public/icon/dark/sound.png';
        icon_adhkar.src = '../public/icon/dark/open-hands.png';
        icon_hisnmuslim.src = '../public/icon/dark/castle.png';
        icon_prayer_time.src = '../public/icon/dark/azan.png';
        icon_settings.src = '../public/icon/dark/settings.png';
        icon_info.src = '../public/icon/dark/info.png';

        // document
        logo.src = '../public/icon/dark/logo.png';

        let info = require('./preload_modules/info.js');
        await info(ipcRenderer, shell);
        break;

      /* THE DEFAULT FOR UNEXPECTED THING HAPPEN */
      default:
        window.location.href = "./home.html";
        break;
    }
  } else {
    /* PAGES LOAD (SWITCH) */
    switch (pageFile) {

      /* BREAKABLE PAGES (NO PRELOAD REQUIRED) */
      case "home.html":
        variables_css.href = '../public/css/var.css';
        break;
      case "evening.html":
        variables_css.href = '../../public/css/var.css';
        break;
      case "food.html":
        variables_css.href = '../../public/css/var.css';
        break;
      case "morning.html":
        variables_css.href = '../../public/css/var.css';
        break;
      case "prayer.html":
        variables_css.href = '../../public/css/var.css';
        break;
      case "sleeping.html":
        variables_css.href = '../../public/css/var.css';
        break;
      case "tasbih.html":
        variables_css.href = '../../public/css/var.css';
        break;

      /* MAIN PAGES (WITH PRELOAD) */

      case "surah.html":
        variables_css.href = '../public/css/var.css';
        let surah = require('./preload_modules/surah.js');
        await surah(fs, path, App_Path);
        break;

      case "quran.html":
        variables_css.href = '../public/css/var.css';
        let quran = require('./preload_modules/quran.js');
        await quran(fs, path, App_Path);
        break;

      case "quran_mp3.html":
        variables_css.href = '../public/css/var.css';
        let quran_mp3 = require('./preload_modules/quran_mp3.js');
        await quran_mp3(fs, path, App_Path, settings);
        break;

      case "adhkar.html":
        variables_css.href = '../public/css/var.css';
        let adhkar = require('./preload_modules/adhkar.js');
        await adhkar(fs, path);
        break;

      case "hisnmuslim.html":
        variables_css.href = '../public/css/var.css';
        let hisnmuslim = require('./preload_modules/hisnmuslim.js');
        await hisnmuslim(fs, path);
        break;

      case "prayer_time.html":
        variables_css.href = '../public/css/var.css';
        let prayer_time = require('./preload_modules/prayer_time.js');
        await prayer_time(fs, path, App_Path, settings);
        break;

      case "settings.html":
        variables_css.href = '../public/css/var.css';
        let settingsPage = require('./preload_modules/settings.js');
        await settingsPage(fs, path, App_Path, settings, ipcRenderer);
        break;

      case "info.html":
        variables_css.href = '../public/css/var.css';
        let info = require('./preload_modules/info.js');
        await info(ipcRenderer, shell);
        break;

      /* THE DEFAULT FOR UNEXPECTED THING HAPPEN */
      default:
        window.location.href = "./home.html";
        break;
    }
  }
});