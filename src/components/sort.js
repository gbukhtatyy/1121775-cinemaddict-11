import AbstractComponent from "./abstract-component.js";

export const SortType = {
  DATE: `date`,
  RATING: `rating`,
  DEFAULT: `default`,
};

const SORT_ITEMS = [
  {
    code: SortType.DEFAULT,
    title: `Sort by default`
  }, {
    code: SortType.DATE,
    title: `Sort by date`
  }, {
    code: SortType.RATING,
    title: `Sort by rating`
  }
];

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

export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;

    this._items = SORT_ITEMS;
  }

  getTemplate() {
    return createSortingTemplate(this._items);
  }

  setSortType(sortType) {
    this._currentSortType = sortType;
    this._toggleActiveSort();
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const element = evt.target;
      const sortType = element.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      this._toggleActiveSort();
      handler(this._currentSortType);
    });
  }

  _toggleActiveSort() {
    this.getElement().querySelectorAll(`.sort__button`).forEach((el) => {
      el.classList.remove(`sort__button--active`);
    });

    this.getElement()
      .querySelector(`[data-sort-type=${this._currentSortType}]`)
      .classList.add(`sort__button--active`);
  }
}
