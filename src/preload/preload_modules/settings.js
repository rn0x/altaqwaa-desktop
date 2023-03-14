module.exports = function settings(fs, path, App_Path, settings, ipcRenderer) {

    let location = fs.readJsonSync(path.join(App_Path, './data/location.json'));

    let latitude = document.getElementById('latitude');
    let longitude = document.getElementById('longitude');
    let timezone = document.getElementById('timezone');
    let Calculation = document.getElementById('Calculation');
    let notifications_adhan = document.getElementById('notifications_adhan');
    let notifications_adhkar = document.getElementById('notifications_adhkar');
    let autostart = document.getElementById('autostart');
    let startHidden = document.getElementById('startHidden');
    let minimizeToPanel = document.getElementById('minimizeToPanel');
    let dark_mode = document.getElementById('dark_mode');
    let selected = document.getElementById(settings?.Calculation);
    let morning_adhkar_time = document.getElementById("morning_adhkar_time");
    let evening_adhkar_time = document.getElementById("evening_adhkar_time");
    let save = document.getElementById('save');
    let alrt = document.getElementById('alrt');
    let settings_font_adhkar = document.getElementById('settings_font_adhkar');
    let settings_font_quran = document.getElementById('settings_font_quran');
    let settings_font_adhkar_output = document.getElementById('settings_font_adhkar_output');
    let settings_font_quran_output = document.getElementById('settings_font_quran_output');
    let refresh_button = document.getElementById("refresh_button");

    location.timezone ? timezone.value = location.timezone : false
    location.lat ? latitude.value = location.lat : false
    location.lon ? longitude.value = location.lon : false
    notifications_adhan.checked = settings?.notifications_adhan
    notifications_adhkar.checked = settings?.notifications_adhkar
    autostart.checked = settings?.autostart || false
    startHidden.checked = settings?.startHidden || false
    minimizeToPanel.checked = settings?.minimizeToPanel || false
    morning_adhkar_time.value = settings?.morning_adhkar_time || ""
    evening_adhkar_time.value = settings?.evening_adhkar_time || ""
    dark_mode.checked = settings?.dark_mode ? true : false
    selected.selected = "selected"
    settings_font_adhkar_output.innerText = settings?.font_size_adhkar ? settings?.font_size_adhkar : 20
    settings_font_adhkar.value = settings?.font_size_adhkar ? settings?.font_size_adhkar : 20
    settings_font_quran_output.innerText = settings?.font_size_quran ? settings?.font_size_quran : 30
    settings_font_quran.value = settings?.font_size_quran ? settings?.font_size_quran : 30

    // inptu font adhkar
    settings_font_adhkar.addEventListener('input', e => {
        settings_font_adhkar_output.innerText = settings_font_adhkar.value
    });

    // inptu font adhkar
    settings_font_quran.addEventListener('input', e => {
        settings_font_quran_output.innerText = settings_font_quran.value
    });


    /* VOLUME MANAGER */
    let volumeRange = document.getElementById('volume');
    let volumeValue = document.getElementById('volume_value');
    volumeRange.addEventListener('input', handleVolumeRange)

    if (settings.volume && settings.volume != 100) {
        volumeValue.innerHTML = settings.volume * 100;
        volumeRange.value = settings.volume * 100;
    }

    function handleVolumeRange(volume) {
        volumeValue.innerHTML = volumeRange.value;
    }

    let adhanVolumeRange = document.getElementById('adhan_volume');
    let adhanVolumeValue = document.getElementById('adhan_volume_value');
    adhanVolumeRange.addEventListener('input', adhanHandleVolumeRange)

    if (settings.adhanVolume && settings.adhanVolume != 100) {
        adhanVolumeValue.innerHTML = settings.adhanVolume * 100;
        adhanVolumeRange.value = settings.adhanVolume * 100;
    }

    function adhanHandleVolumeRange(volume) {
        adhanVolumeValue.innerHTML = adhanVolumeRange.value;
    }

    refresh_button.addEventListener('click', async (e) => {
        try {
            let fetch = require('node-fetch');
            let response = await fetch('http://ip-api.com/json');
            let status = await response?.status;
            if (status !== 200) return
            let body = await response?.json();
    
            await fs.writeJsonSync(path.join(App_Path, './data/location.json'), {
                country: body?.country,
                countryCode: body?.countryCode,
                regionName: body?.regionName,
                city: body?.city,
                lat: body?.lat,
                lon: body?.lon,
                timezone: body?.timezone,
                ip: body?.query
            }, { spaces: '\t' });
            alrt.style.display = 'inline-flex';
            setTimeout(() => {
                alrt.style.display = 'none';
                window.location.href = "./settings.html";
            }, 1000);    
        } catch (error) {
            /* MAYBE THERE IS NO INTERNET CONNECTION SO AVOIDING CRASH */
        }
    });

    save.addEventListener('click', e => {

        dark_mode?.checked ? ipcRenderer.send('background', true)
            : ipcRenderer.send('background', false)

        if (latitude.value !== '') {

            location.lat = Number(latitude.value)
            delete location.country
            delete location.regionName
            delete location.city
            fs.writeJsonSync(path.join(App_Path, './data/location.json'), location, { spaces: '\t' });

        }

        if (longitude.value !== '') {

            location.lon = Number(longitude.value)
            delete location.country
            delete location.regionName
            delete location.city
            fs.writeJsonSync(path.join(App_Path, './data/location.json'), location, { spaces: '\t' });

        }

        if (timezone.value !== '') {

            location.timezone = timezone.value
            delete location.country
            delete location.regionName
            delete location.city
            fs.writeJsonSync(path.join(App_Path, './data/location.json'), location, { spaces: '\t' });

        }

        fs.writeJsonSync(path.join(App_Path, './data/settings.json'), {
            autostart: autostart.checked,
            startHidden: startHidden.checked,
            minimizeToPanel: minimizeToPanel.checked,
            dark_mode: dark_mode.checked,
            Calculation: Calculation.value,
            morning_adhkar_time: morning_adhkar_time.value,
            evening_adhkar_time: evening_adhkar_time.value,
            notifications_adhan: notifications_adhan.checked,
            notifications_adhkar: notifications_adhkar.checked,
            volume: volumeRange.value / 100,
            adhanVolume: adhanVolumeRange.value / 100,
            font_size_quran: settings_font_quran.value,
            font_size_adhkar: settings_font_adhkar.value,
        }, { spaces: '\t' });

        alrt.style.display = 'inline-flex';
        setTimeout(() => {
            alrt.style.display = 'none';
            window.location.href = "./settings.html";
        }, 1000);

    })

}