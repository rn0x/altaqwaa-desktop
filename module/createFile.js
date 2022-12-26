const fs = require('fs-extra');
const path = require('path');

module.exports = function createFile(App_Path) {

    if (fs.existsSync(path.join(App_Path, './data')) === false) {

        fs.mkdirsSync(path.join(App_Path, '/data'), { recursive: true });

    }



    if (fs.existsSync(path.join(App_Path, './data/Now.json')) === false) {

        fs.writeJsonSync(path.join(App_Path, './data/Now.json'), { "id": "surah_number_1" }, { spaces: '\t' });

    }

    if (fs.existsSync(path.join(App_Path, './data/audio_window.json')) === false) {

        fs.writeJsonSync(path.join(App_Path, './data/audio_window.json'), { "start": false }, { spaces: '\t' });

    }

    if (fs.existsSync(path.join(App_Path, './data/settings.json')) === false) {

        let settings = {
            "Calculation": "UmmAlQura",
            "notifications_adhan": true,
            "notifications_adhkar": true
        }

        fs.writeJsonSync(path.join(App_Path, './data/settings.json'), settings, { spaces: '\t' });

    }

    if (fs.existsSync(path.join(App_Path, './data/sound.json')) === false) {

        fs.writeJsonSync(path.join(App_Path, './data/sound.json'), { "sound": true }, { spaces: '\t' });

    }

}