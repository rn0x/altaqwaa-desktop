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
  $('.count')
    .parent()
    .on({
      click: function () {
        let counter = $(this).children('.count').text();
        let tkrar_number = $(this).siblings().children('.tkrar_number').text();
        if (counter != tkrar_number) {
          counter++;
          $(this).children('.count').text(counter);
        }
      },
      mouseenter: function () {
        $(this).css('background', ' var(--background_div_hover)');
      },
      mouseleave: function () {
        $(this).css('background', 'var(--background_div)');
      },
    });
});
