import NiceSelect from 'nice-select2/dist/js/nice-select2.js';

export function niceSelectVanilla() {

  const simpleSelect = document.querySelectorAll(".simple-select");
  const searchSelect = document.querySelectorAll(".search-select");

  simpleSelect.forEach(function (elem) {
    NiceSelect.bind(elem);
  });

  searchSelect.forEach(function (elem) {
    NiceSelect.bind(elem, { searchable: true });
  });
}