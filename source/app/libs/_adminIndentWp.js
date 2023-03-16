export function adminIndentWp() {
  const wpadminbar = document.querySelector('#wpadminbar');
  const header = document.querySelector('.header');

  if (wpadminbar) {
    header.classList.add('--admin-top');
  }
}