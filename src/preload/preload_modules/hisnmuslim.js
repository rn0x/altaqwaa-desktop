module.exports = function hisnmuslim(fs, path) {

    let hisnmuslim = fs.readJsonSync(path.join(__dirname, '../../data/hisnmuslim.json'));
    let mp3_hisn = document.getElementById('mp3_hisn');
    let mp3_hisn_closed = document.getElementById('mp3_hisn_closed');
    let mp3_hisn_src = document.getElementById('mp3_hisn_src');
    let ul_hisn = document.getElementById('ul_hisn');
    let class_hisn = document.getElementsByClassName('class_hisn');
  
    mp3_hisn_closed.addEventListener('click', e => {
      mp3_hisn_src.pause();
      mp3_hisn.style.display = 'none'
    });
  
    for (let item of hisnmuslim) {
      let createLi = document.createElement("li");
      ul_hisn.appendChild(createLi);
      createLi.innerText = item?.category;
      createLi.id = 'li_hisn_' + item.id;
      createLi.className = 'class_hisn';
    }
  
    Array.from(class_hisn).forEach((event, item) => {
      document.getElementById(event.id).addEventListener('click', e => {
        mp3_hisn.style.display = 'flex'
        mp3_hisn_src.src = hisnmuslim[item]?.audio;
      });
    });
  
    let searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function() {
      let searchQuery = searchInput.value.trim();
      filterCategories(searchQuery);
    });
  
    function filterCategories(searchQuery) {
      let categories = Array.from(document.getElementsByClassName('class_hisn'));
  
      categories.forEach(function(category) {
        let categoryName = category.innerText;
  
        if (categoryName.includes(searchQuery)) {
          category.style.display = 'block';
        } else {
          category.style.display = 'none';
        }
      });
    }
  }
  