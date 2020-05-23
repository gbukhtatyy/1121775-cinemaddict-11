// Import components
import StatisticComponent from "../components/statistic.js";

// Import constants and utils
import {HIDDEN_CLASS} from "../utils/render.js";
import {RenderPosition, render, replace} from "../utils/render.js";

export default class Statistic {
  constructor(container, moviesModel, userModel) {
    this._container = container;

    this._moviesModel = moviesModel;
    this._userModel = userModel;
  }

  render() {
    const oldStatisticComponent = this._statisticComponent;
    this._statisticComponent = new StatisticComponent();

    this._statisticComponent.setUserStatus(this._userModel.getUserStatus());

    if (oldStatisticComponent) {
      replace(this._statisticComponent, oldStatisticComponent);
    } else {
      render(this._container, this._statisticComponent, RenderPosition.BEFOREEND);
    }
  }

  show() {
    const container = this._statisticComponent.getElement();
    if (container) {
      container.classList.remove(HIDDEN_CLASS);
    }
  }

  hide() {
    const container = this._statisticComponent.getElement();
    if (container) {
      container.classList.add(HIDDEN_CLASS);
    }
  }
}
