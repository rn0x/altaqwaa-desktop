const fetch = require('node-fetch');
const fs = require('fs-extra');
const path = require('path');

module.exports = async function location(App_Path) {

    try {

        let response = await fetch('http://ip-api.com/json');
        let status = await response?.status;
        if (status !== 200) return
        let body = await response?.json();
        let country = body?.country;
        let countryCode = body?.countryCode;
        let regionName = body?.regionName;
        let city = body?.city;
        let lat = body?.lat;
        let lon = body?.lon;
        let timezone = body?.timezone;
        let ip = body?.query;
        let Check_file = fs.existsSync(path.join(App_Path, './data/location.json'));

        if (Check_file === false) {

            let opj = {

                country: country,
                countryCode: countryCode,
                regionName: regionName,
                city: city,
                lat: lat,
                lon: lon,
                timezone: timezone,
                ip: ip
            }

            if (fs.existsSync(path.join(App_Path, './data')) === false) {
                fs.mkdirsSync(path.join(App_Path, '/data'), { recursive: true });
                await new Promise(r => setTimeout(r, 3000));
                fs.writeJsonSync(path.join(App_Path, './data/location.json'), opj, { spaces: '\t' });
            }

            if (fs.existsSync(path.join(App_Path, './data'))) {
                fs.writeJsonSync(path.join(App_Path, './data/location.json'), opj, { spaces: '\t' });
            }

        }

    } catch (error) {

        console.log(error);
    }

}