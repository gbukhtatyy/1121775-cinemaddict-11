import FilmComponent from "../components/film.js";
import FilmPopupComponent from "../components/film-popup.js";
import {
  RenderPosition,
  render,
  remove,
  replace
} from "../utils/render";
import {
  isEscEvent
} from "../utils/keyboard.js";

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
    this._filmComponent = null;
    this._filmPopupComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    const oldFilmComponent = this._filmComponent;
    const oldFilmPopupComponent = this._filmPopupComponent;

    const container = this._container;
    this._filmComponent = new FilmComponent(film);
    this._filmPopupComponent = new FilmPopupComponent(film);

    this._filmComponent.setOpenClickHandler(() => {
      this._openFilmPopup();
    });
    this._filmComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched,
      }));
    });
    this._filmComponent.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist,
      }));
    });
    this._filmComponent.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });

    this._filmPopupComponent.setClickCloseHandler(() => {
      this._closeFilmPopup();
    });
    this._filmPopupComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched,
      }));
    });
    this._filmPopupComponent.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist,
      }));
    });
    this._filmPopupComponent.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
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

    if (oldFilmComponent && oldFilmPopupComponent) {
      replace(this._filmComponent, oldFilmComponent);
      replace(this._filmPopupComponent, oldFilmPopupComponent);
    } else {
      render(container, this._filmComponent, RenderPosition.BEFOREEND);
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
