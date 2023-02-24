export function lazyLoad() {
  const lazyImages = document.querySelectorAll('img[data-srcl],source[data-srcsetl]');
  const loadMapBlock = document.querySelector('.--load-map');
  const windowHeight = document.documentElement.clientHeight;

  let lazyImagesPosition = [];
  if (lazyImages.length > 0) {
    lazyImages.forEach(img => {
      if (img.dataset.srcl || img.dataset.srcsetl) {
        lazyImagesPosition.push(img.getBoundingClientRect().top + pageYOffset);
        lazyScrollCheck();
      }
    });
  }

  window.addEventListener("scroll", lazyScroll);

  function lazyScroll() {
    if (document.querySelectorAll('img[data-srcl],source[data-srcsetl]').length > 0) {
      lazyScrollCheck();
    }
    if (!loadMapBlock.classList.contains('--loaded')) {
      getMap();
    }
  }

  function lazyScrollCheck() {
    let imgIndex = lazyImagesPosition.findIndex(
      item => pageYOffset > item - windowHeight
    );
    if (imgIndex >= 0) {
      if (lazyImages[imgIndex].dataset.srcl) {
        lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.srcl;
        lazyImages[imgIndex].removeAttribute('data-srcl');
      } else if (lazyImages[imgIndex].dataset.srcsetl) {
        lazyImages[imgIndex].srcset = lazyImages[imgIndex].dataset.srcsetl;
        lazyImages[imgIndex].removeAttribute('data-srcsetl');
      }
      delete lazyImagesPosition[imgIndex];
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
