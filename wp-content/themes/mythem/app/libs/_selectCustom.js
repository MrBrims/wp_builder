export function selectCustom() {
  const selectItems = document.querySelectorAll('.form-select');
  if (!selectItems.length) {
    return;
  }

  selectItems.forEach((dropDownWrapper) => {
    const dropDownList = dropDownWrapper.querySelector('.form-select__list');
    const dropDownListItems = dropDownList.querySelectorAll('.form-select__list-item');
    const dropDownInput = dropDownWrapper.querySelector('.form-select__input-hidden');

    // Клик по кнопке. Открыть/Закрыть select
    const dropDownBtn = dropDownWrapper.querySelector('.form-select__btn');
    dropDownBtn.addEventListener('click', function (e) {
      dropDownList.classList.toggle('--visible');
      this.classList.add('--active');
    });

    // Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
    dropDownListItems.forEach((listItem) => {
      listItem.addEventListener('click', () => {
        dropDownBtn.innerText = listItem.innerText;
        dropDownBtn.focus();
        dropDownInput.value = listItem.innerText;
        dropDownBtn.classList.add('--current');
        dropDownList.classList.remove('--visible');
      });
    });

    // Клик снаружи дропдауна. Закрыть дропдаун
    document.addEventListener('click', function (e) {
      if (e.target !== dropDownBtn) {
        dropDownBtn.classList.remove('--active');
        dropDownList.classList.remove('--visible');
      }
    });

    // Нажатие на Tab или Escape. Закрыть дропдаун
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' || e.key === 'Escape') {
        dropDownBtn.classList.remove('--active');
        dropDownList.classList.remove('--visible');
      }
    });
  });
}