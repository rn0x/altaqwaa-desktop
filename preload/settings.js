const fs = require('fs-extra');
const path = require('path');

module.exports = function settings(App_Path) {

    if (document.getElementById('settings')) {

        let settings = fs.readJsonSync(path.join(App_Path, './data/settings.json'));
        let location = fs.readJsonSync(path.join(App_Path, './data/location.json'));
        let latitude = document.getElementById('latitude');
        let longitude = document.getElementById('longitude');
        let timezone = document.getElementById('timezone');
        let Calculation = document.getElementById('Calculation');
        let notifications_adhan = document.getElementById('notifications_adhan');
        let notifications_adhkar = document.getElementById('notifications_adhkar');
        let save = document.getElementById('save');
        let alrt = document.getElementById('alrt');//selected
        let selected = document.getElementById(settings?.Calculation);

        const volumeRange = document.getElementById('volume');
        const volumeValue = document.getElementById('volume_value');
        volumeRange.addEventListener('input', handleVolumeRange)

        if(settings.volume && settings.value != 100) {
            volumeValue.innerHTML = settings.volume * 100;
            volumeRange.value = settings.volume * 100;
        }
        
        notifications_adhan.checked = settings?.notifications_adhan
        notifications_adhkar.checked = settings?.notifications_adhkar
        selected.selected = "selected"

        function handleVolumeRange(volume) {
            volumeValue.innerHTML = volumeRange.value;
        }

        save.addEventListener('click', e => {

            let opj = {

                Calculation: Calculation.value,
                notifications_adhan: notifications_adhan.checked,
                notifications_adhkar: notifications_adhkar.checked,
                volume: volumeRange.value / 100
                
            }

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

            fs.writeJsonSync(path.join(App_Path, './data/settings.json'), opj, { spaces: '\t' });

            alrt.style.display = 'inline-flex';

            setTimeout(() => {

                alrt.style.display = 'none';

            }, 1000);

        })


    }

}