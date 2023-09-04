let adhkar = document.querySelectorAll('.adhkar');
let alrt = document.getElementById('alrt');
alrt.style.display = 'none';

adhkar.forEach((e) => {
  let click = document.getElementById(`copy_${e.id}`);
  click.addEventListener('click', () => {
    let createRange = document.createRange();
    createRange.selectNode(document.getElementById(e.id));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(createRange);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();

    alrt.style.display = 'inline-flex';
    setTimeout(() => {
      alrt.style.display = 'none';
    }, 1000);
  });
});

// jQuery Code for tkrar Number Counter
$(document).ready(function () {
  $('.text')
    .parent()
    .on({
      click: function () {
        let counter_element = $(this)
          .children('.copy_and_paste')
          .children('.tkrar')
          .children('.tkrar_number');
        let counter_element_val = counter_element.text();
        if (counter_element_val != 0) {
          counter_element_val--;
          $(counter_element).text(counter_element_val);
          if (counter_element_val == 0) {
            let nextElementOffset = $(this).next().offset().top - 70;
            let animationDelay = 1000;
            $(this).css('background', ' var(--background_div_hover)');
            $(this).children('.copy_and_paste').css('background', '#d0d0d09b');
            $('html, body').animate(
              { scrollTop: nextElementOffset },
              animationDelay
            );
          }
        }
      },
    });
});
