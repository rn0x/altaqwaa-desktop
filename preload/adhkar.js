module.exports = function adhkar(fs, path, copy) {

    if (document.getElementById('adhkar')) {

        let alrt = document.getElementById('alrt');
        let click_copy = document.getElementById('copy');
        let random = document.getElementById('random');
        let text = document.getElementById('text');
        let description = document.getElementById('description');
        let reference = document.getElementById('reference');
        let adhker_id_1 = document.getElementById('adhker_id_1');
        let adhker_id_2 = document.getElementById('adhker_id_2');
        let adhker_id_3 = document.getElementById('adhker_id_3');
        let adhker_id_4 = document.getElementById('adhker_id_4');
        let adhker_id_5 = document.getElementById('adhker_id_5');
        let adhker_id_6 = document.getElementById('adhker_id_6');
        let azkar = fs.readJsonSync(path.join(__dirname, '../data/azkar.json'));
        let azkar_random = azkar[Math.floor(Math.random() * azkar.length)]

        text.innerText = azkar_random?.zekr;
        description.innerText = azkar_random?.description;
        reference.innerText = azkar_random?.reference ? `المرجع: ${azkar_random?.reference}` : '';
        alrt.style.display = 'none';
        adhker_id_1.addEventListener('click', e => window.location.href = '../pages/adhkar/morning.html');
        adhker_id_2.addEventListener('click', e => window.location.href = '../pages/adhkar/evening.html');
        adhker_id_3.addEventListener('click', e => window.location.href = '../pages/adhkar/sleeping.html');
        adhker_id_4.addEventListener('click', e => window.location.href = '../pages/adhkar/food.html');
        adhker_id_5.addEventListener('click', e => window.location.href = '../pages/adhkar/prayer.html');
        adhker_id_6.addEventListener('click', e => window.location.href = '../pages/adhkar/tasbih.html');

        click_copy.addEventListener('click', event => {
            copy('title');
            alrt.style.display = 'inline-flex';
            setTimeout(() => {

                alrt.style.display = 'none';

            }, 1000);
        });

        random.addEventListener('click', event => {

            let azkar_random = azkar[Math.floor(Math.random() * azkar.length)];

            text.innerText = azkar_random?.zekr;
            description.innerText = azkar_random?.description;
            reference.innerText = azkar_random?.reference ? `المرجع: ${azkar_random?.reference}` : '';
        });

    }
}