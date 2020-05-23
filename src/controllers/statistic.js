// Import components
import StatisticComponent from "../components/statistic.js";

// Import constants and utils
import {HIDDEN_CLASS} from "../utils/render.js";
import {RenderPosition, render, replace} from "../utils/render.js";

export default class Statistic {
  constructor(container, moviesModel, userModel) {
    this._container = container;

    this._isVisible = false;
    this._moviesModel = moviesModel;
    this._userModel = userModel;

    this._onDateChange = this._onDateChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDateChange);
  }

  render() {
    const oldStatisticComponent = this._statisticComponent;
    this._statisticComponent = new StatisticComponent();

    this._statisticComponent.setUserStatus(this._userModel.getUserStatus());

    if (!this._isVisible) {
      this._statisticComponent.getElement()
        .classList
        .add(HIDDEN_CLASS);
    }

    if (oldStatisticComponent) {
      replace(this._statisticComponent, oldStatisticComponent);
    } else {
      render(this._container, this._statisticComponent, RenderPosition.BEFOREEND);
    }
  }

  show() {
    this._isVisible = true;
    const container = this._statisticComponent.getElement();
    if (container) {
      container.classList.remove(HIDDEN_CLASS);
    }
  }

  hide() {
    this._isVisible = false;
    const container = this._statisticComponent.getElement();
    if (container) {
      container.classList.add(HIDDEN_CLASS);
    }
  }

  _onDateChange() {
    this.render();
  }
}
