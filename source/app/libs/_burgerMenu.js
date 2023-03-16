export function burgerMenu() {
  const menuBtn = document.querySelector('.menu__btn');
  const menuBody = document.querySelector('.menu__body');

  if (menuBtn) {
    menuBtn.addEventListener("click", function (e) {
      menuBody.classList.toggle('--active');
      menuBtn.classList.toggle('--active');
    });
    menuBody.addEventListener("click", function (e) {
      menuBody.classList.remove('--active');
      menuBtn.classList.remove('--active');
    });
  }

  const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
  if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
      menuLink.addEventListener("click", onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
      const menuLink = e.target;
      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
        const gotoBlock = document.querySelector(menuLink.dataset.goto);
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

        if (menuBtn.classList.contains('--active')) {
          menuBody.classList.remove('--active');
          menuBtn.classList.remove('--active');
        }

        window.scrollTo({
          top: gotoBlockValue,
          behavior: "smooth"
        });
        e.preventDefault();
      }
    }
  }
}