import { Datepicker } from 'vanillajs-datepicker';

export function inputDateCustom() {
  const dateInputs = document.querySelectorAll('.form__date-input');
  if (!dateInputs.length) {
    return;
  }

  for (let dateInput of dateInputs) {
    new Datepicker(dateInput, {
      buttonClass: dateInput,
      weekStart: 1
    });
  }
}