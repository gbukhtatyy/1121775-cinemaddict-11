import AbstractComponent from "./abstract-component.js";
import {SortType} from "../const.js";

const SORT_ITEM_ACTIVE_CLASS = `sort__button--active`;

const createSortItemMarkup = (sortType, isActive) => {
  const activeClass = isActive ? SORT_ITEM_ACTIVE_CLASS : ``;

  return (
    `<li><a href="#" class="sort__button ${activeClass}" data-sort-type="${sortType}">Sort by ${sortType}</a></li>`
  );
};

const createSortMarkup = (sortings, activeSortType) => {
  const sortingsMarkup = sortings.map((sortType) => createSortItemMarkup(sortType, activeSortType === sortType)).join(`\n`);

  return (
    `<ul class="sort">${sortingsMarkup}</ul>`
  );
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._activeType = SortType.DEFAULT;

    this._types = [
      SortType.DEFAULT,
      SortType.DATE,
      SortType.RATING
    ];
  }

  getTemplate() {
    return createSortMarkup(this._types, this._activeType);
  }

  setType(newType) {
    this._activeType = newType;
  }

  setTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const element = evt.target;
      const newType = element.dataset.sortType;

      if (this._activeType === newType) {
        return;
      }

      this._activeType = newType;

      handler(this._activeType);
    });
  }
}
