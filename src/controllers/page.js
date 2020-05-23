// Import components
import MoviesComponent from "../components/movies.js";

// Import constants and utils
import {AppState, AppPageTitle} from "../const.js";
import {RenderPosition, HIDDEN_CLASS, render, replace} from "../utils/render.js";

export default class Page {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._moviesComponent = null;
  }

  render(params) {
    const {state} = params;
    const container = this._container.getElement();

    const oldMoviesComponent = this._moviesComponent;
    this._moviesComponent = new MoviesComponent();

    switch (state) {
      case AppState.LOADING:
        this._moviesComponent.setTitle(AppPageTitle.LOADING);
        this._moviesComponent.setTitleVisible(true);
        break;
      case AppState.EMPTY:
        this._moviesComponent.setTitle(AppPageTitle.EMPTY);
        this._moviesComponent.setTitleVisible(true);
        break;
      default:
        this._moviesComponent.setTitle(AppPageTitle.DEFAULT);
        this._moviesComponent.setTitleVisible(false);

        break;
    }

    if (oldMoviesComponent) {
      replace(this._moviesComponent, oldMoviesComponent);
    } else {
      render(container, this._moviesComponent, RenderPosition.BEFOREEND);
    }
  }

  show() {
    const container = this._container.getElement();
    if (container) {
      container.classList.remove(HIDDEN_CLASS);
    }
  }

  hide() {
    const container = this._container.getElement();
    if (container) {
      container.classList.add(HIDDEN_CLASS);
    }
  }
}
