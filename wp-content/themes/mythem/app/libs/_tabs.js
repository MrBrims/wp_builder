export function tabs() {
  const tabItems = Array.from(document.querySelectorAll('.tab__nav'))
  const tabContent = Array.from(document.querySelectorAll('.tab__content'))

  const tabClearClass = (element, className = '--active-tab') => {
    element.find(item => item.classList.remove(`${className}`))
  }

  const tabSetClass = (element, index, className = '--active-tab') => {
    element[index].classList.add(`${className}`)
  }

  const tabCheckout = (item, index) => {
    item.addEventListener('click', () => {

      if (item.classList.contains('--active-tab')) return

      tabClearClass(tabItems)
      tabClearClass(tabContent)

      tabSetClass(tabItems, index)
      tabSetClass(tabContent, index)
    })
  }

  tabItems.forEach(tabCheckout)
}