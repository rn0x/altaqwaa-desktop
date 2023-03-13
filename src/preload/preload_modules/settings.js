module.exports = function settings(fs, path, App_Path) {

    let settings = fs.readJsonSync(path.join(App_Path, './data/settings.json'));
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

    let save = document.getElementById('save');
    let alrt = document.getElementById('alrt');

    location.timezone ? timezone.value = location.timezone : false
    location.lat ? latitude.value = location.lat : false
    location.lon ? longitude.value = location.lon : false
    notifications_adhan.checked = settings?.notifications_adhan
    notifications_adhkar.checked = settings?.notifications_adhkar
    autostart.checked = settings?.autostart || false
    startHidden.checked = settings?.startHidden || false
    minimizeToPanel.checked = settings?.minimizeToPanel || false
    dark_mode.checked = settings?.dark_mode || true
    selected.selected = "selected"

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

    save.addEventListener('click', e => {

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
            notifications_adhan: notifications_adhan.checked,
            notifications_adhkar: notifications_adhkar.checked,
            volume: volumeRange.value / 100,
            adhanVolume: adhanVolumeRange.value / 100
        }, { spaces: '\t' });

    
        alrt.style.display = 'inline-flex';
        setTimeout(() => { alrt.style.display = 'none'; }, 1000);
    })

}