import intlTelInput from 'intl-tel-input';

export function inputPhoneCustom() {
  const input = document.getElementById('phone');
  if (!input) {
    return;
  }

  intlTelInput(input, {
    initialCountry: 'DE',
    autoPlaceholder: 'aggressive',
    preferredCountries: ["DE", "GB"],
    separateDialCode: true,
  });
}