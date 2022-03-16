const fs = require('fs-extra');
const path = require('path');

module.exports = async function folder(App_Path, resourcesPath) {

    let city = '/json/city.json'
    let ae = '/json/ae.json'
    let eg = '/json/eg.json'
    let kw = '/json/kw.json'
    let sa = '/json/sa.json'
    let Adhkar = '/json/Adhkar.json'
    let Adhkar_morning = '/json/Adhkar_morning.json'
    let Adhkar_night = '/json/Adhkar_night.json'

    if (fs.existsSync(path.join(App_Path, city)) === false){

        fs.mkdirSync(path.join(App_Path, '/json'), { recursive: true }); 
        let city_json = fs.readJSONSync(path.join(resourcesPath, city));
        fs.writeJsonSync(path.join(App_Path, city), city_json , { spaces: '\t' });
      
    }

    if (fs.existsSync(path.join(App_Path, ae)) === false){

        fs.mkdirSync(path.join(App_Path, '/json'), { recursive: true });
        let ae_json = fs.readJSONSync(path.join(resourcesPath, ae));
        fs.writeJsonSync(path.join(App_Path, ae), ae_json , { spaces: '\t' });
      
    }

    if (fs.existsSync(path.join(App_Path, eg)) === false){

        fs.mkdirSync(path.join(App_Path, '/json'), { recursive: true });
        let eg_json = fs.readJSONSync(path.join(resourcesPath, eg));
        fs.writeJsonSync(path.join(App_Path, eg), eg_json , { spaces: '\t' });
      
    }

    if (fs.existsSync(path.join(App_Path, kw)) === false){

        fs.mkdirSync(path.join(App_Path, '/json'), { recursive: true });
        let kw_json = fs.readJSONSync(path.join(resourcesPath, kw));
        fs.writeJsonSync(path.join(App_Path, kw), kw_json , { spaces: '\t' });
      
    }

    if (fs.existsSync(path.join(App_Path, sa)) === false){

        fs.mkdirSync(path.join(App_Path, '/json'), { recursive: true });
        let sa_json = fs.readJSONSync(path.join(resourcesPath, sa));
        fs.writeJsonSync(path.join(App_Path, sa), sa_json , { spaces: '\t' });
      
    }

    if (fs.existsSync(path.join(App_Path, '/mp3/001.mp3')) === false){

        fs.mkdirSync(path.join(App_Path, '/mp3'), { recursive: true });
        let mp3 = fs.readFileSync(path.join(resourcesPath, '/mp3/001.mp3'));
        fs.writeFileSync(path.join(App_Path, '/mp3/001.mp3'), mp3 , { spaces: '\t' });
      
    }

    if (fs.existsSync(path.join(App_Path, '/mp3/002.mp3')) === false){

        fs.mkdirSync(path.join(App_Path, '/mp3'), { recursive: true });
        let mp3 = fs.readFileSync(path.join(resourcesPath, '/mp3/002.mp3'));
        fs.writeFileSync(path.join(App_Path, '/mp3/002.mp3'), mp3 , { spaces: '\t' });
      
    }

    if (fs.existsSync(path.join(App_Path, '/mp3/AM.mp3')) === false){

        fs.mkdirSync(path.join(App_Path, '/mp3'), { recursive: true });
        let mp3 = fs.readFileSync(path.join(resourcesPath, '/mp3/AM.mp3'));
        fs.writeFileSync(path.join(App_Path, '/mp3/AM.mp3'), mp3 , { spaces: '\t' });
      
    }

    if (fs.existsSync(path.join(App_Path, '/mp3/PM.mp3')) === false){

        fs.mkdirSync(path.join(App_Path, '/mp3'), { recursive: true });
        let mp3 = fs.readFileSync(path.join(resourcesPath, '/mp3/PM.mp3'));
        fs.writeFileSync(path.join(App_Path, '/mp3/PM.mp3'), mp3 , { spaces: '\t' });
      
    }

    if (fs.existsSync(path.join(App_Path, Adhkar)) === false){

        fs.mkdirSync(path.join(App_Path, '/json'), { recursive: true });
        let ae_json = fs.readJSONSync(path.join(resourcesPath, Adhkar));
        fs.writeJsonSync(path.join(App_Path, Adhkar), ae_json , { spaces: '\t' });
      
    }

    if (fs.existsSync(path.join(App_Path, Adhkar_morning)) === false){

        fs.mkdirSync(path.join(App_Path, '/json'), { recursive: true });
        let ae_json = fs.readJSONSync(path.join(resourcesPath, Adhkar_morning));
        fs.writeJsonSync(path.join(App_Path, Adhkar_morning), ae_json , { spaces: '\t' });
      
    }

    if (fs.existsSync(path.join(App_Path, Adhkar_night)) === false){

        fs.mkdirSync(path.join(App_Path, '/json'), { recursive: true });
        let ae_json = fs.readJSONSync(path.join(resourcesPath, Adhkar_night));
        fs.writeJsonSync(path.join(App_Path, Adhkar_night), ae_json , { spaces: '\t' });
      
    }

    if (fs.existsSync(path.join(App_Path, '/json/notification.json')) === false){

        fs.mkdirSync(path.join(App_Path, '/json'), { recursive: true });
        fs.writeJsonSync(path.join(App_Path, '/json/notification.json'), { notification: true } , { spaces: '\t' });
      
    }
}