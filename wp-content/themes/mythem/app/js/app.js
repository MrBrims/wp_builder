import { popup } from '~/app/libs/_popup.js'
import { burgerMenu } from '~/app/libs/_burgerMenu.js'
import { tabs } from '~/app/libs/_tabs.js'
import { accordion } from '~/app/libs/_accordion.js'
import { accordionNoClose } from '~/app/libs/_accordionNoClose.js'
import { swiperMudules } from '~/app/libs/_swiperMudules.js'
import Fancybox from "@fancyapps/ui"
import { inputPhoneCustom } from '~/app/libs/_inputPhoneCustom.js'
import { inputNumberCastom } from '~/app/libs/_inputNumberCastom.js'
import { inputDateCustom } from '~/app/libs/_inputDateCustom.js'
import { selectCustom } from '~/app/libs/_selectCustom.js'
import { lazyLoad } from '~/app/libs/_lazyLoad.js'
import { adminIndentWp } from '~/app/libs/_adminIndentWp.js'
import { mailerForm } from '~/app/libs/_mailerForm.js'

document.addEventListener('DOMContentLoaded', () => {

  // Отложенная загрузка карты
  lazyLoad();

  // Меню бургер и плавная прокрутка
  burgerMenu();

  // Попапы
  popup();

  // Отступ если есть wpadminbar
  adminIndentWp();

  // Табы
  tabs();

  // Аккордеон
  accordion();

  // Аккордеон без закрытия
  accordionNoClose();

  // Кастомизация input numper
  inputNumberCastom();

  // Кастомизация календаря
  inputDateCustom();

  // Выбор кода телефона
  inputPhoneCustom();

  // Кастомизация select
  selectCustom();
  
  // Слайдер
  swiperMudules();

  // Отправка формы
  mailerForm();
  
})
