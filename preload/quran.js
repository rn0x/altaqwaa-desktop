const fs = require('fs-extra');
const path = require('path');
const Copy = require('../module/Copy.js');

module.exports = function Quran(App_Path) {

    if (document.getElementById('Quran_Content')) {

        let Quran_json = fs.readJsonSync(path.join(__dirname, '../data/Quran.json'));
        let Now = fs.readJsonSync(path.join(App_Path, './data/Now.json'));
        let ArrayQuran = Quran_json.find(e => e.getElementById === Now?.id);
        document.getElementById('alrt').style = 'display: none;'
        document.getElementById('Qur_name').innerText = `سورة ${ArrayQuran?.Name}`;
        document.getElementById('Descent').innerText = ArrayQuran?.Descent;
        document.getElementById('bsmlh').innerText = ArrayQuran?.Name === 'التوبة' ? 'اعوذ بالله من الشيطان الرجيم' : 'بسم الله الرحمن الرحيم';
        document.getElementById('Surah_text').innerText = ArrayQuran?.Surah;
        document.getElementById('Surah_text').addEventListener('click', (e) => {
            document.getElementById('alrt').style = 'display:inline-flex;'
            Copy('Surah_text');
            setTimeout(() => {

                document.getElementById('Surah_text').style = 'cursor: auto;'
                document.getElementById('alrt').style = 'display: none;'

            }, 1000);
        }, { once: true });

    }

}