import AbstractComponent from "./abstract-component.js";
import {FilterType, FilterLabels} from "../const.js";

const FILTER_CLASS = `main-navigation__item`;
const FILTER_ACTIVE_CLASS = `main-navigation__item--active`;
const FILTER_STATISTIC_CLASS = `main-navigation__additional`;

const createFilterItemAmountMarkup = (count) => {
  return (
    `<span class="main-navigation__item-count">${count}</span>`
  );
};

const createFilterItemMarkup = (name, count, isChecked) => {
  const amountMarkup = (name !== FilterType.ALL) ? createFilterItemAmountMarkup(count) : ``;

  return (
    `<a href="#${name}"
        class="main-navigation__item ${isChecked ? FILTER_ACTIVE_CLASS : ``}"
        data-filter-type="${name}">${FilterLabels[name]} ${amountMarkup}</a>`
  );
};

const createFilterMarkup = (types) => {
  const filtersMarkup = types.map((it) => createFilterItemMarkup(it.name, it.count, it.isChecked)).join(`\n`);
  const statsActiveClass = types.filter((it)=>it.isChecked).length === 0 ? FILTER_ACTIVE_CLASS : ``;

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional ${statsActiveClass}">Stats</a>
    </nav>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(types) {
    super();

    this._types = types;

    this._activeType = null;
    this._statisticClickHandler = null;
  }

  getTemplate() {
    return createFilterMarkup(this._types);
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
      const newType = element.dataset.filterType;

      if (this._activeType === newType) {
        return;
      }

      this._activeType = newType;

      handler(newType);
    });
  }

  setFilterItemClickHandler(handler) {
    const controlElements = this.getElement().querySelectorAll(`.${FILTER_CLASS}`);
    controlElements.forEach((el) => el.addEventListener(`click`, handler));
  }

  setStatisticClickHandler(handler) {
    const controlElement = this.getElement().querySelector(`.${FILTER_STATISTIC_CLASS}`);
    controlElement.addEventListener(`click`, handler);
  }
}
