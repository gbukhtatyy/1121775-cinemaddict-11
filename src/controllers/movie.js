import FilmComponent from "../components/film.js";
import FilmPopupComponent from "../components/film-popup.js";

import {RenderPosition, render, remove} from "../utils/render";
import {isEscEvent} from "../utils/keyboard.js";

const Mode = {
  DEFAULT: `default`,
  POPUP: `popup`,
};

export default class Movie {
  constructor(container, film, onDataChange, onViewChange) {
    this._container = container;
    this._film = film;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;
    this._filmComponent = null;
    this._filmPopupComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render() {
    const film = this._film;
    const container = this._container;
    this._filmComponent = new FilmComponent(film);
    this._filmPopupComponent = new FilmPopupComponent(film);

    const filmPoster = this._filmComponent.getElement().querySelector(`.film-card__poster`);
    const filmTitle = this._filmComponent.getElement().querySelector(`.film-card__title`);
    const filmComments = this._filmComponent.getElement().querySelector(`.film-card__comments`);

    filmPoster.addEventListener(`click`, () => {
      this._openFilmPopup();
    });
    filmTitle.addEventListener(`click`, () => {
      this._openFilmPopup();
    });
    filmComments.addEventListener(`click`, () => {
      this._openFilmPopup();
    });

    this._filmPopupComponent.setClickCloseHandler(() => {
      this._closeFilmPopup();
    });

    this._filmPopupComponent.setDeleteCommentHandler((evt) => {
      evt.preventDefault();
      const deleteButton = evt.target;
      const commentId = deleteButton.dataset.commentId;

      deleteButton.disabled = true;
      deleteButton.innerText = `Deleting...`;

      const comments = this._filmPopupComponent._comments;
      const indexDeletedComment = comments.findIndex((it) => it.id === commentId);
      const newComments = [].concat(comments.slice(0, indexDeletedComment), comments.slice(indexDeletedComment + 1));

      this._filmPopupComponent._comments = newComments;
      this._filmPopupComponent.rerender();
    });

    this._filmPopupComponent.setAddCommentHandler((evt) => {
      evt.preventDefault();
    });

    render(container, this._filmComponent, RenderPosition.BEFOREEND);
  }

  setDefaultView() {
    if (this._mode === Mode.POPUP) {
      this._closeFilmPopup();
    }
  }

  _openFilmPopup() {
    this._onViewChange();
    const bodyElement = document.querySelector(`body`);
    bodyElement.appendChild(this._filmPopupComponent.getElement());
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.POPUP;
  }

  _closeFilmPopup() {
    const bodyElement = document.querySelector(`body`);
    bodyElement.removeChild(this._filmPopupComponent.getElement());
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    isEscEvent(evt, () => {
      this._closeFilmPopup();
    });
  }

  destroy() {
    remove(this._filmPopupComponent);
    remove(this._filmComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
