

module.exports = async (fs, path, App_Path) => {

    let dark_mode = fs.readJsonSync(path.join(App_Path, './data/settings.json'))?.dark_mode;

    if (dark_mode === false) {

        const pageFile = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
        const root = document.querySelector(':root');
        const setVariables = vars => Object.entries(vars).forEach(v => root.style.setProperty(v[0], v[1]));
        const myVariables = {
            '--background_body': '#f4f5fb',
            '--background_div': '#ffffff',
            '--white': '#505050',
            '--scrollbar_thumb': '#eaeaee',
            '--scrollbar_thumb_hover': '#dfdfe9',
            // '--color_font_grey': '#6bc077',
        };
        setVariables(myVariables);


        /* document */

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

        // every 

        let logo = document.getElementById("logo");
        let copy = document.getElementById("copy");
        let random = document.getElementById("random");
        let mp3_hisn_closed = document.getElementById("mp3_hisn_closed");
        let icon_c_p = document.getElementsByClassName("icon_c_p");


        switch (pageFile) {

            case "home.html":

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

                // every
                logo.src = '../public/icon/dark/logo.png';

                break;
            case "evening.html":

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

                // every 

                copy.src = '../public/icon/dark/copy.png';
                random.src = '../public/icon/dark/random.png';
                break;

            case "hisnmuslim.html":
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

                // every 

                mp3_hisn_closed.src = '../public/icon/dark/closed.png';
                break;

            case "prayer_time.html":
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

                // every
                logo.src = '../public/icon/dark/logo.png';
                break;

            /* THE DEFAULT FOR UNEXPECTED THING HAPPEN */
            default:
                break;
        }
    }

}