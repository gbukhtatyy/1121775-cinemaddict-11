import {createElement} from "../utils.js";

const createSortingMarkup = (sorting, isChecked) => {
  const {code, title} = sorting;

  const checkedClass = isChecked ? `sort__button--active` : ``;

  return (
    `<li><a href="#" class="sort__button ${checkedClass}" data-sort-type="${code}">${title}</a></li>`
  );
};

const createSortingTemplate = (sortings) => {
  const sortingsMarkup = sortings.map((it, i) => createSortingMarkup(it, i === 0)).join(`\n`);

  return (
    `<ul class="sort">
      ${sortingsMarkup}
      </ul>`
  );
};

export default class Sort {
  constructor(items) {
    this._items = items;

    this._element = null;
  }

  getTemplate() {
    return createSortingTemplate(this._items);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
