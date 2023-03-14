module.exports = function quran_mp3(fs, path, App_Path, settings) {

    let Quran_json = fs.readJsonSync(path.join(__dirname, '../../data/Quran.json'));
    let mp3quran_json = fs.readJsonSync(path.join(__dirname, '../../data/mp3quran.json'));
    let volume = settings?.volume;
    let dark_mode = settings?.dark_mode;
    let ul_group = document.getElementById('ul_group');
    let Sheikh = document.getElementById('Sheikh');
    let li_Sheikh_number = 1

    ul_group.style = 'display: none;'
    Sheikh.style = 'display: flex;'

    for (let item of mp3quran_json) {

        let li_Sheikh = document.createElement("li");
        let reader_name = document.createElement('p');
        let reader = document.createElement('div');
        let Sheikh_name = document.createElement('p');
        let Sheikh_rewaya = document.createElement('p');
        let li_Sheikh_id = `li_Sheikh_${li_Sheikh_number++}`

        Sheikh.appendChild(li_Sheikh);
        li_Sheikh.id = li_Sheikh_id;
        li_Sheikh.className = 'li_Sheikh'
        li_Sheikh.appendChild(reader_name);
        reader_name.id = 'reader_name';
        reader_name.innerText = 'القارئ';
        li_Sheikh.appendChild(reader);
        reader.id = 'reader';
        reader.appendChild(Sheikh_name);
        Sheikh_name.id = 'Sheikh_name';
        Sheikh_name.innerText = item?.name;
        reader.appendChild(Sheikh_rewaya);
        Sheikh_rewaya.id = 'Sheikh_rewaya';
        Sheikh_rewaya.innerText = item?.rewaya;

    }

    let li_Sheikh = document.getElementsByClassName('li_Sheikh');
    let item_li_Sheikh = Array.from(li_Sheikh);
    item_li_Sheikh.forEach((event, item) => {

        document.getElementById(event.id).addEventListener('click', e => {

            window.scrollTo(0, 0);
            let Sheikh_true = event.id.split('li_Sheikh_')[1]
            let ArrayMp3 = mp3quran_json.find(e => e?.id.toString() === Sheikh_true);
            let quran_mp3_name_Sheikh = document.getElementById('quran_mp3_name_Sheikh')
            let quran_mp3_back = document.getElementById('quran_mp3_back')
            quran_mp3_name_Sheikh.innerText = ArrayMp3?.name
            quran_mp3_name_Sheikh.style.display = "block"
            quran_mp3_back.style.display = "block"
            quran_mp3_back.addEventListener("click", e => {
                window.location.href = './quran_mp3.html'
            });
            ul_group.style = 'display: flex;'
            Sheikh.style = 'display: none;'
            let num = 1

            for (let item of Quran_json) {

                let numberx = num++
                let url = `${ArrayMp3?.Server}/${String(numberx).padStart(3, 0)}.mp3`
                let li_group = document.createElement("li");
                let grid_mp3 = document.createElement('div');
                let number = document.createElement('p');
                let name = document.createElement('p');
                let download = document.createElement('div');
                let audio = document.createElement('audio');
                let icon_mp3 = document.createElement('img');
                let icon_mp3_ddownload = document.createElement('img');
                let a_download = document.createElement('a');

                ul_group.appendChild(li_group);
                li_group.className = 'li_group';
                li_group.appendChild(grid_mp3);
                grid_mp3.id = 'grid_mp3';
                grid_mp3.appendChild(number);
                number.className = 'number';
                number.innerText = item?.Number;
                grid_mp3.appendChild(name);
                name.className = 'name';
                name.innerText = item?.Name;
                grid_mp3.appendChild(download);
                download.id = 'download';
                download.appendChild(icon_mp3);
                icon_mp3.className = 'icon_mp3';
                icon_mp3.id = `icon_mp3_${item?.Number}`
                icon_mp3.src = dark_mode ? '../public/icon/play.png' : '../public/icon/dark/play.png';
                download.appendChild(a_download);
                a_download.id = `a_download_${item?.Number}`
                a_download.href = url
                a_download.download = `${item?.Name}_${ArrayMp3?.name}.mp3`
                a_download.appendChild(icon_mp3_ddownload);
                icon_mp3_ddownload.className = 'icon_mp3_ddownload';
                icon_mp3_ddownload.id = `icon_mp3_ddownload_${item?.Number}`
                icon_mp3_ddownload.src = dark_mode ? '../public/icon/download.png' : '../public/icon/dark/download.png';
                download.appendChild(audio);
                audio.id = `start_mp3_${numberx}`
                audio.src = url
                audio.preload = 'none'
                audio.autoplay = false
                audio.volume = volume ? volume : 1
            }

            let icon_mp3 = document.getElementsByClassName('icon_mp3');
            let item_icon_mp3 = Array.from(icon_mp3);
            let number = 1

            item_icon_mp3.forEach(event => {

                let id_mp3 = event.id
                let item = number++;
                let icon_mp3 = document.getElementById(`icon_mp3_${item}`);
                icon_mp3.addEventListener('click', async event => {


                    let sound_json = fs.readJsonSync(path.join(App_Path, './data/sound.json'));
                    let ArrayMp3 = mp3quran_json.find(e => e?.id.toString() === Sheikh_true);
                    let url = `${ArrayMp3?.Server}/${String(item).padStart(3, 0)}.mp3`
                    let id = id_mp3.split('icon_mp3_')[1];
                    let sound = document.getElementById(`start_mp3_${id}`);

                    if (sound_json?.sound) {

                        icon_mp3.src = dark_mode ? '../public/icon/pause.png' : '../public/icon/dark/pause.png';
                        sound.play()
                        fs.writeJsonSync(path.join(App_Path, './data/sound.json'), { sound: false });
                    }



                    else {
                        icon_mp3.src = dark_mode ? '../public/icon/play.png' : '../public/icon/dark/play.png';
                        sound.pause()
                        fs.writeJsonSync(path.join(App_Path, './data/sound.json'), { sound: true });
                    }

                });

            });

        });

    });

}