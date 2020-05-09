import AbstractComponent from "./abstract-component.js";
import {FilterType} from "../const.js";

const createSiteMenuCountMarkup = (count) => {
  return count > 0 ? `<span class="main-navigation__item-count">${count}</span>` : ``;
};

const createFilterMarkup = (item) => {
  const {name, count, checked} = item;
  const activeClass = checked ? `main-navigation__item--active` : ``;
  const countMarkup = (name !== FilterType.ALL) ? createSiteMenuCountMarkup(count) : ``;

  return (
    `<a href="#${name}" class="main-navigation__item ${activeClass}" data-filter-type="${name}">${name} ${countMarkup}</a>`
  );
};

const createMenuTemplate = (filters) => {
  const filtersMarkup = filters.map((it, i) => createFilterMarkup(it, i === 1)).join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._currentFilterType = FilterType.ALL;
    this._filters = filters;
  }

  getTemplate() {
    return createMenuTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const filterType = evt.target.dataset.filterType;

      if (this._currentFilterType === filterType) {
        return;
      }

      this._currentFilterType = filterType;

      handler(filterType);
    });
  }
}
