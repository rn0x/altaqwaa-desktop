module.exports = function surah(fs, path, App_Path) {
 
    let Quran_json = fs.readJsonSync(path.join(__dirname, '../../data/Quran.json'));

    for (let item of Quran_json) {

        let quran = document.getElementById('quran');
        let create_but = document.createElement("button");
        let surah_div = document.createElement("div");
        let surah_number = document.createElement("p");
        let surah_name = document.createElement("p");
        let surah_verses = document.createElement("p");

        quran.appendChild(create_but);
        create_but.id = `surah_number_${item?.Number}`
        create_but.className = 'surah'
        create_but.appendChild(surah_div);
        surah_div.className = 'surah_div'
        surah_div.appendChild(surah_number);
        surah_number.className = 'surah_number'
        surah_number.innerText = `${item?.Number} - `
        surah_div.appendChild(surah_name);
        surah_name.innerText = item?.Name;
        surah_name.className = 'surah_name'
        create_but.appendChild(surah_verses);
        surah_verses.innerText = item?.Number_Verses >= 9 ? `${item?.Number_Verses} آية` : `${item?.Number_Verses} آيات`
        surah_verses.className = 'surah_verses'

    }

    let surah = Array.from(document.getElementsByClassName('surah'));

    for (let item of surah) {

        let surah_number = document.getElementById(item.id)
        let id = item?.id
        surah_number.addEventListener('click', e => {

            fs.writeJsonSync(path.join(App_Path, './data/Now.json'), { id: id });
            window.location.href = '../pages/quran.html'
        });

    }

}