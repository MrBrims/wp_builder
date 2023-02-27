const carbonFieldsImagesFix = (() => {

  const getImage = (imageUrl) => {
    return `<img src='${imageUrl}' class='cbImagePlug'/>`;
  }

  const insertImageBlocks = (imageBox) => {
    const inputImageBox = imageBox.querySelector('input');
    const imageUrl = inputImageBox?.value;
    const image = getImage(imageUrl);
    inputImageBox.insertAdjacentHTML('afterend', image);
  }

  const init = () => {
    const cbImagesWraps = document.querySelectorAll('.cf-file__inner');
    cbImagesWraps.forEach(imageBox => insertImageBlocks(imageBox));
  }

  document.addEventListener("DOMContentLoaded", init);
})();