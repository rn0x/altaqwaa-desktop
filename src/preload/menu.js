// menu.js
var menuCode = '<div id="menu" onmousedown="return false;" onselectstart="return false;">' +
    '<a href="./home.html">' +
    '<img src="../public/icon/home.png" class="icon_menu" id="icon_home" title="الرئيسية">' +
    '</a>' +
    '<a href="./surah.html">' +
    '<img src="../public/icon/quran.png" class="icon_menu" id="icon_surah" title="القرآن">' +
    '</a>' +
    '<a href="./quran_mp3.html">' +
    '<img src="../public/icon/sound.png" class="icon_menu" id="icon_menu_mp3" title="القراء">' +
    '</a>' +
    '<a href="./adhkar.html">' +
    '<img src="../public/icon/open-hands.png" class="icon_menu" id="icon_adhkar" title="الأذكار">' +
    '</a>' +
    '<a href="./hisnmuslim.html">' +
    '<img src="../public/icon/castle.png" class="icon_menu" id="icon_hisnmuslim" title="حصن المسلم">' +
    '</a>' +
    '<a href="./prayer_time.html">' +
    '<img src="../public/icon/azan.png" class="icon_menu" id="icon_prayer_time" title="الصلاة" >' +
    '</a>' +
    '<a href="./settings.html">' +
    '<img src="../public/icon/settings.png" class="icon_menu" id="icon_settings" title="الإعدادات">' +
    '</a>' +
    '<a href="./info.html">' +
    '<img src="../public/icon/info.png" class="icon_menu" id="icon_info" title="معلومات التطبيق">' +
    '</a>' +
    '<a href="#">' +
    '<img src="../public/icon/radio.png" class="icon_menu" id="icon_radio" title="راديو القرآن الكريم">' +
    '</a>' +
    '</div>';

var menuContainer = document.getElementById("menu-container");
menuContainer.innerHTML = menuCode;
