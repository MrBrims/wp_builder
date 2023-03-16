export function mailerForm() {

  const body = document.querySelector('body');
  const popupOk = document.querySelector('.popup-ok'); // Класс для попапа со спасибкой
  const popupForm = document.querySelectorAll('.popup-form'); // Класс для попапа с формой
  const lockPadding = document.querySelectorAll('.lock-padding');

  let unlock = true;

  function popupOpen() {
    popupOk.classList.add('open');
    for (let i = 0; i < popupForm.length; i++) {
      if (popupForm[i].classList.contains('open')) {
        popupForm[i].classList.remove('open');
      }
    }
    bodyLock();
  }
  function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
      }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('--lock');

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, 800);
  }

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

        // Открытие спасибки, закрытие попапа с формой и удаление анимации отправки
        function timeSubmit() {
          const timeSubmit = 3000;
          setTimeout(function () {
            form.classList.remove('--sending');
            form.reset();
            popupOpen();
          }, timeSubmit);
        }
        timeSubmit();

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
            // Сюда вставляется тот код, который нужно запустить после успешной отправки формы
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