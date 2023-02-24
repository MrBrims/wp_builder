export function accordionNoClose () {
  const faqHead = document.querySelectorAll('.faq__btn');

  for (let i = 0; i < faqHead.length; i++) {
    let faqEach = faqHead[i];
    let faqContent = faqEach.nextElementSibling;
    faqEach.addEventListener('click', () => {
      faqEach.classList.toggle('--active');
      faqContent.classList.toggle('--open');
    });
  }
}