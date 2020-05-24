import MovieComponent from "../components/movie.js";
import MoviePopupComponent from "../components/movie-popup.js";
import {RenderPosition, render, remove, replace} from "../utils/render.js";
import {isEscEvent} from "../utils/keyboard.js";

const Mode = {
  DEFAULT: `default`,
  POPUP: `popup`,
};

export default class Movie {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;
    this._movieComponent = null;
    this._moviePopupComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(movie) {
    const oldMovieComponent = this._movieComponent;
    const oldMoviePopupComponent = this._moviePopupComponent;

    const container = this._container;
    this._movieComponent = new MovieComponent(movie);
    this._moviePopupComponent = new MoviePopupComponent(movie);

    this._movieComponent.setOpenClickHandler(() => {
      this._openFilmPopup();
    });

    this._moviePopupComponent.setClickCloseHandler(() => {
      this._closeFilmPopup();
    });

    if (oldMovieComponent && oldMoviePopupComponent) {
      replace(this._movieComponent, oldMovieComponent);
      replace(this._moviePopupComponent, oldMoviePopupComponent);
    } else {
      render(container, this._movieComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode === Mode.POPUP) {
      this._closeFilmPopup();
    }
  }

  _openFilmPopup() {
    this._onViewChange();
    const bodyElement = document.querySelector(`body`);
    bodyElement.appendChild(this._moviePopupComponent.getElement());
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.POPUP;
  }

  _closeFilmPopup() {
    const bodyElement = document.querySelector(`body`);
    bodyElement.removeChild(this._moviePopupComponent.getElement());
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    isEscEvent(evt, () => {
      this._closeFilmPopup();
    });
  }

  destroy() {
    remove(this._moviePopupComponent);
    remove(this._movieComponent);
  }
}
