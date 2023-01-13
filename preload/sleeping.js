module.exports = function sleeping(copy) {

    if (document.getElementById('sleeping')) {

        let adhkar = document.querySelectorAll('.adhkar');
        let alrt = document.getElementById('alrt');
        alrt.style.display = 'none'

        adhkar.forEach(e => {

            let id = e.id
            let click = document.getElementById(`copy_${id}`);
            click.addEventListener('click', event => {
                copy(id);
                alrt.style.display = 'inline-flex';
                setTimeout(() => {

                    alrt.style.display = 'none';

                }, 1000);
            })

        });

    }

}