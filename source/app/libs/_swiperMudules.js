import { Swiper, Navigation, Pagination, Lazy } from 'swiper';
Swiper.use([Navigation, Pagination, Lazy])

export function swiperMudules() {
  const slider = new Swiper('.slider__body', {
    navigation: {
      nextEl: ".slider__next",
      prevEl: ".slider__prev",
    },
    pagination: {
      el: ".slider__nav",
    },
    loop: true,
    slidesPerView: 4,
    spaceBetween: 30,
    lazy: true,
  });
}