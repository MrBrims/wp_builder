export function accordion() {
  document.querySelectorAll('.accordion__head').forEach((item) =>
    item.addEventListener('click', () => {
      const parent = item.parentNode;

      if (parent.classList.contains('--active')) {
        parent.classList.remove('--active')
      } else {
        document.querySelectorAll('.accordion__item').forEach((child) => child.classList.remove('--active'))
        parent.classList.add('--active');
      }
    })
  )
}