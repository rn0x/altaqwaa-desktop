button_number('adhkar_id_1', 1);
button_number('adhkar_id_5', 1);
button_number('adhkar_id_6', 1);
button_number('adhkar_id_7', 3);
button_number('adhkar_id_8', 1);
button_number('adhkar_id_9', 1);
button_number('adhkar_id_10', 1);
button_number('adhkar_id_11', 1);
button_number('adhkar_id_12', 33);
button_number('adhkar_id_13', 33);
button_number('adhkar_id_15', 3);
button_number('adhkar_id_16', 3);
button_number('adhkar_id_17', 1);
button_number('adhkar_id_18', 1);
button_number('adhkar_id_30', 1);



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