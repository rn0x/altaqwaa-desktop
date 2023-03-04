module.exports = (path, fs, App_Path, currentVersion) => {

    fs.writeJsonSync(path.join(App_Path, "./version.json"), {
        currentRelease: currentVersion, already_checked: false, latestRelease: "0.0.0"
    });

    fs.existsSync(path.join(App_Path, "./data")) ? true :
        fs.mkdirsSync(path.join(App_Path, "./data"), { recursive: true });

    fs.existsSync(path.join(App_Path, "./data/Now.json")) ? true :
        fs.writeJsonSync(path.join(App_Path, './data/Now.json'), { "id": "surah_number_1" });

    fs.existsSync(path.join(App_Path, "./data/audio_window.json")) ? true :
        fs.writeJsonSync(path.join(App_Path, './data/audio_window.json'), { "start": false });

    fs.existsSync(path.join(App_Path, "./data/settings.json")) ? true :
        fs.writeJsonSync(path.join(App_Path, './data/settings.json'), {
            "Calculation": "UmmAlQura",
            "notifications_adhan": true,
            "notifications_adhkar": true
        });

    fs.existsSync(path.join(App_Path, "./data/sound.json")) ? true :
        fs.writeJsonSync(path.join(App_Path, './data/sound.json'), { "sound": true });

}