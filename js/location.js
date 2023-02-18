(function (){
  window.addEventListener('DOMContentLoaded', (event) => {
    const location = window.location.href.split('?')[0]
    var menu_items = document.getElementsByClassName("header__link")
    Array.from(menu_items).forEach((item) => {
      if(location === item.href) {
        item.classList.add("header__link_active")
      }
    })
  });
}())
