export function mailerForm() {

  const popupThanks = document.querySelector('.popup-thanks');
  const popupThanksClose = document.querySelector('.popup-thanks__close');
  popupThanksClose.addEventListener("click", function (e) {
    popupThanks.classList.add('--hide');
  });

  function mailer() {
    const forms = document.forms;

    if (!forms.length) {
      return;
    }

    for (let form of forms) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        let data = new FormData(form);

        // Класс для визуализации формы при отправке
        form.classList.add('--sending');

        fetch('/wp-admin/admin-ajax.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
          },
          body: 'action=sendForm&' + getQueryString(data),
          credentials: 'same-origin'
        })
          .then(response => response.json())
          .then(response => {

            form.reset();

            form.classList.remove('--sending');

            // Удаление класса для попапа со спасибкой
            popupThanks.classList.remove('--hide');

          })
          ;
      });
    }
  }

  mailer();

  function getQueryString(formData) {
    let pairs = [];
    for (let [key, value] of formData.entries()) {
      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }
    return pairs.join('&');
  }

}