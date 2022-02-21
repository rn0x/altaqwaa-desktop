button_number('adhkar_id_1', 1);
button_number('adhkar_id_2', 3);
button_number('adhkar_id_3', 3);
button_number('adhkar_id_4', 3);
button_number('adhkar_id_5', 1);
button_number('adhkar_id_6', 1);
button_number('adhkar_id_7', 3);
button_number('adhkar_id_8', 4);
button_number('adhkar_id_9', 1);
button_number('adhkar_id_10', 7);
button_number('adhkar_id_11', 3);
button_number('adhkar_id_12', 1);
button_number('adhkar_id_13', 1);
button_number('adhkar_id_14', 3);
button_number('adhkar_id_15', 3);
button_number('adhkar_id_16', 6);
button_number('adhkar_id_17', 1);
button_number('adhkar_id_18', 3);
button_number('adhkar_id_19', 1);
button_number('adhkar_id_20', 1);
button_number('adhkar_id_21', 3);
button_number('adhkar_id_22', 10);
button_number('adhkar_id_23', 3);
button_number('adhkar_id_24', 3);
button_number('adhkar_id_25', 3);
button_number('adhkar_id_26', 3);
button_number('adhkar_id_27', 10);
button_number('adhkar_id_28', 1);
button_number('adhkar_id_29', 100);



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