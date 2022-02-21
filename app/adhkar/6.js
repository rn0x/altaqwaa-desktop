button_number('adhkar_id_1', 100);
button_number('adhkar_id_2', 100);
button_number('adhkar_id_3', 100);
button_number('adhkar_id_4', 100);
button_number('adhkar_id_5', 100);
button_number('adhkar_id_6', 100);
button_number('adhkar_id_7', 100);
button_number('adhkar_id_8', 100);
button_number('adhkar_id_9', 100);
button_number('adhkar_id_10', 100);
button_number('adhkar_id_11', 100);
button_number('adhkar_id_12', 100);
button_number('adhkar_id_13', 100);
button_number('adhkar_id_14', 100);
button_number('adhkar_id_15', 100);
button_number('adhkar_id_16', 100);
button_number('adhkar_id_17', 100);





function button_number(id, number) {

    document.getElementById(id).addEventListener("click", () => {
    
        let adhkar_number = document.getElementById(id).innerHTML
        let adhkar_id = document.getElementById(id)
    
        if (parseInt(adhkar_number) > 1) {
            adhkar_id.innerHTML = parseInt(adhkar_number) - 1
        }
        else if (parseInt(adhkar_number) === 1) {
            adhkar_id.innerHTML = '&#128472'
            adhkar_id.style = 'background-color:#cc1b1b; background-image:none;'
        }
        else if (adhkar_number = '&#128472') {
            adhkar_id.innerHTML = number
            adhkar_id.style = ''
        }
    
    })
    
}