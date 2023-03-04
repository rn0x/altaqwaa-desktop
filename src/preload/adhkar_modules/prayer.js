module.exports = function prayer(copy) {


    let adhkar = document.querySelectorAll('.adhkar');
    let alrt = document.getElementById('alrt');

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