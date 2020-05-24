import AbstractComponent from "../abstract-component.js";
import {StatisticFilterType} from "../../const.js";

const FILTER_ITEMS_DATA = [
  {
    code: StatisticFilterType.ALL_TIME,
    name: `All time`
  },
  {
    code: StatisticFilterType.TODAY,
    name: `Today`
  },
  {
    code: StatisticFilterType.WEEK,
    name: `Week`
  },
  {
    code: StatisticFilterType.MONTH,
    name: `Month`
  },
  {
    code: StatisticFilterType.YEAR,
    name: `Year`
  },
];

const createStatisticFilterItemMarkup = (code, name, isChecked) => {
  const checkedAttribute = isChecked ? `checked` : ``;

  return (
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${code}" value="${code}" ${checkedAttribute}>
    <label for="statistic-${code}" class="statistic__filters-label">${name}</label>`
  )
}

const createStatisticFilterMarkup = (activeFilter) => {
  const filtersMarkup = FILTER_ITEMS_DATA.map((filter) => createStatisticFilterItemMarkup(filter.code, filter.name, activeFilter === filter.code)).join(`\n`);

  return (
    `<form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      ${filtersMarkup}
    </form>`
  );
};

export default class StatisticFilter extends AbstractComponent {
  constructor() {
    super();

    this._activeFilterType = StatisticFilterType.ALL_TIME;
  }

  getTemplate() {
    return createStatisticFilterMarkup(this._activeFilterType);
  }

  setFilterType(filterType) {
    this._activeFilterType = filterType;
  }

  setClickHandler(handler) {
    this.getElement().querySelectorAll(`.statistic__filters-input`).forEach((input) => {
      input.addEventListener(`change`, (evt) => {
        const element = evt.target;

        const filterType = element.value;

        this._activeFilterType = filterType;

        handler(this._activeFilterType);
      });
    });
  }
}
