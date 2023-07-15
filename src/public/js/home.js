
let page_quran = document.getElementById('page_quran');
let page_quran_mp3 = document.getElementById('page_quran_mp3');
let page_adhkar = document.getElementById('page_adhkar');
let page_hisnmuslim = document.getElementById('page_hisnmuslim');
let page_prayer_time = document.getElementById('page_prayer_time');
let page_radio = document.getElementById('page_radio');
let page_settings = document.getElementById('page_settings');


page_quran.addEventListener('click', () => {
    window.location.assign('./surah.html')
});

page_quran_mp3.addEventListener('click', () => {
    window.location.assign('./quran_mp3.html')
});

page_adhkar.addEventListener('click', () => {
    window.location.assign('./adhkar.html')
});

page_hisnmuslim.addEventListener('click', () => {
    window.location.assign('./hisnmuslim.html')
});

page_prayer_time.addEventListener('click', () => {
    window.location.assign('./prayer_time.html')
});

page_settings.addEventListener('click', () => {
    window.location.assign('./settings.html')
});
page_radio.addEventListener('click', () => {
    alert('نعمل علي إضافته قريبا بإذن الله')
});