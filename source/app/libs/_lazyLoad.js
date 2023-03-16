export function lazyLoad() {
  const loadMapBlock = document.querySelector('.--load-map');
  const windowHeight = document.documentElement.clientHeight;

  window.addEventListener("scroll", lazyScroll);

  function lazyScroll() {
    if (!loadMapBlock.classList.contains('--loaded')) {
      getMap();
    }
  }

  function getMap() {
    const loadMapBlockPos = loadMapBlock.getBoundingClientRect().top + pageYOffset;
    if (pageYOffset > loadMapBlockPos - windowHeight) {
      const loadMapUrl = loadMapBlock.dataset.map;
      if (loadMapUrl) {
        loadMapBlock.insertAdjacentHTML(
          "beforeend",
          `<iframe src="${loadMapUrl}" style="border:0; width:100%; height:100%;" allowfullscreen="" loading="lazy"></iframe>`
        );
        loadMapBlock.classList.add('--loaded');
      }
    }
  }

}

/* HTML code
  <div class="map-lazy --load-map" style="height: 600px;"
     data-map="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19557.185013236205!2d104.2592269!3d52.21344165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5da822d340ef3c83%3A0x5707860c69d12331!2sIP%20KORKINA%20N.M.!5e0!3m2!1sen!2sru!4v1666602274947!5m2!1sen!2sru">
  </div>
*/