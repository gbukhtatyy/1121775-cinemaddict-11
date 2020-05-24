// Import components
import AbstractComponent from "../abstract-component.js";
import StatisticRankComponent from "./rank.js";
import StatisticFilterComponent from "./filter.js";
import StatisticTextComponent from "./text.js";
import StatisticChartComponent from "./chart.js";

// Import constants and utils
import {RenderPosition, render, createElement} from "../../utils/render.js";

const createStatisticMarkup = () => {
  return (
    `<section class="statistic"></section>`
  );
};

export default class Statistic extends AbstractComponent {
  constructor(userData) {
    super();

    this._userData = userData;
    this._activeFilterType = `all-time`;

    this._rankComponent = new StatisticRankComponent(userData);
    this._filterComponent = new StatisticFilterComponent(userData);
    this._textComponent = new StatisticTextComponent(userData);
    this._chartComponent = new StatisticChartComponent();
  }

  getTemplate() {
    return createStatisticMarkup(this._userData);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());

      render(this._element, this._rankComponent, RenderPosition.BEFOREEND);
      render(this._element, this._filterComponent, RenderPosition.BEFOREEND);
      render(this._element, this._textComponent, RenderPosition.BEFOREEND);
      render(this._element, this._chartComponent, RenderPosition.BEFOREEND);

      this._chartComponent.renderChart(this._userData.watchedGenres);
    }

    return this._element;
  }

  setFilterType(filterType) {
    this._filterComponent.setFilterType(filterType);
  }

  setFilterClickHandler(handler) {
    this._filterComponent.setClickHandler(handler);
  }
}
