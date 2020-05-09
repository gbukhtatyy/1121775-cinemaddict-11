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
  const filtersMarkup = filters.map((it) => createFilterMarkup(it)).join(`\n`);

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

      const element = evt.target;
      const filterType = element.dataset.filterType;

      if (this._currentFilterType === filterType) {
        return;
      }

      this._currentFilterType = filterType;

      this._toggleActiveFilter(element);
      handler(filterType);
    });
  }

  _toggleActiveFilter(element) {
    this.getElement().querySelectorAll(`.main-navigation__item`).forEach((el) => {
      el.classList.remove(`main-navigation__item--active`);
    });
    element.classList.add(`main-navigation__item--active`);
  }
}
