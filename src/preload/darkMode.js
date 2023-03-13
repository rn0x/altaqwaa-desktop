

module.exports = async (fs, path, App_Path) => {

    let dark_mode = fs.readJsonSync(path.join(App_Path, './data/settings.json'))?.dark_mode;

    if (dark_mode === false) {

        let pageFile = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);

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


        switch (pageFile) {

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

            case "surah.html":

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
                break;

            /* THE DEFAULT FOR UNEXPECTED THING HAPPEN */
            default:
                break;
        }
    }

    //////////////////////////////
    else {

        let pageFile = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
        let variables_css = document.getElementById("variables_css");

        switch (pageFile) {

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

            case "surah.html":
                variables_css.href = '../public/css/var.css';
                break;

            case "quran.html":
                variables_css.href = '../public/css/var.css';
                break;

            case "quran_mp3.html":
                variables_css.href = '../public/css/var.css';
                break;

            case "adhkar.html":
                variables_css.href = '../public/css/var.css';
                break;

            case "hisnmuslim.html":
                variables_css.href = '../public/css/var.css';
                break;

            case "prayer_time.html":
                variables_css.href = '../public/css/var.css';
                break;

            case "settings.html":
                variables_css.href = '../public/css/var.css';
                break;

            case "info.html":
                variables_css.href = '../public/css/var.css';
                break;

            /* THE DEFAULT FOR UNEXPECTED THING HAPPEN */
            default:
                break;
        }
    }

}