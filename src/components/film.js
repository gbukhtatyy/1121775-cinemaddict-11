import {createElement, generateLengthMarkup} from "../utils.js";

const createFilmTemplate = (film) => {
  const {poster, title, rating, year, minutes, category, description, comments} = film;

  const length = generateLengthMarkup(minutes);
  const countComments = comments.length;

  return (
    `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
              <span class="film-card__year">${year}</span>
              <span class="film-card__duration">${length}</span>
              <span class="film-card__genre">${category}</span>
          </p>
          <img src="./images/posters/${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${countComments} comments</a>
          <form class="film-card__controls">
              <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
              <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
              <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
      </article>`
  );
};

export default class Film {
  constructor(film) {
    this._film = film;

    this._element = null;
  }

  getTemplate() {
    return createFilmTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
