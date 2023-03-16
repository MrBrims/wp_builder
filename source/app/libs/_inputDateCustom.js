import { Datepicker } from 'vanillajs-datepicker';

export function inputDateCustom() {
  const dateInputs = document.querySelectorAll('.date-input');
  if (!dateInputs.length) {
    return;
  }

  for (let dateInput of dateInputs) {
    new Datepicker(dateInput, {
      buttonClass: dateInput,
      weekStart: 1,
      datesDisabled: function datesDisabled(date, viewId, rangeEnd) {
        const currentDate = new Date();

        // Отключить все дни предшествующие дни
        const days = date.getDate();
        const thisDay = currentDate.getDate();
        const month = date.getMonth();
        const thisMonth = currentDate.getMonth();
        const year = date.getFullYear();
        const thisYear = currentDate.getFullYear();

        if (viewId < 3 && month === thisMonth && days <= thisDay - 1) {
          return true;
        }

        // Отключить все предшествующие месяцы
        if (viewId < 3 && month <= thisMonth - 1) {
          return true;
        }

        // Отключить все предшествующие года
        if (viewId < 3 && year <= thisYear - 1) {
          return true;
        }

        return false;
      },
    });
  }
}