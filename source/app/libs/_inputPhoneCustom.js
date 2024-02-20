import intlTelInput from 'intl-tel-input'

export function inputPhoneCustom() {
	const inputPhone = document.querySelectorAll('.phone-input')

	inputPhone.forEach(element => {
		intlTelInput(element, {
			initialCountry: 'DE',
			autoPlaceholder: 'aggressive',
			preferredCountries: ['DE', 'GB'],
			separateDialCode: true,
		})
	})
}
