let sortingShow = document.querySelector('.sort-by-product-area .sort-by-cover.mr-10');
let dropDown = document.querySelector('.sort-by-dropdown');

if (sortingShow && dropDown) {
  sortingShow.addEventListener('click', function() {
    this.classList.toggle('show');
    dropDown.classList.toggle('show');
  });
}

let sorter = document.querySelector('.sort-by-cover.featured');
let droping = document.querySelector('.sort-by-cover.featured .sort-by-dropdown');

if (sorter && droping) {
  sorter.addEventListener('click', function() {
    this.classList.toggle('show');
    droping.classList.toggle('show');
  });
}

/*
$('.detail-qty').each(function () {
  var qtyval = parseInt($(this).find('.qty-val').text(), 10);
  $('.qty-up').on('click', function (event) {
      event.preventDefault();
      qtyval = qtyval + 1;
      $(this).prev().text(qtyval);
  });
  $('.qty-down').on('click', function (event) {
      event.preventDefault();
      qtyval = qtyval - 1;
      if (qtyval > 1) {
          $(this).next().text(qtyval);
      } else {
          qtyval = 1;
          $(this).next().text(qtyval);
      }
});
});
*/

const search = () => {
  const searchbox = document.getElementById("search-item").value.toUpperCase();
  const sortItem = document.getElementById("product-list");
  const product = document.querySelectorAll(".vendor-card");
  const pname = sortItem.getElementsByClassName('name');

  for(var i = 0; i < pname.length; i++) {
    let match = product[i].getElementsByClassName('name')[0];

    if(match) {
      let textValue = match.textContent || match.innerHTML

      if(textValue.toUpperCase().indexOf(searchbox) > -1) {
        product[i].style.display = "";
      } else {
        product[i].style.display = "none";
      }
    }
  }
}