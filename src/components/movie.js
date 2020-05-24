import AbstractComponent from "./abstract-component.js";
import {generateLengthMarkup, generateDescriptionMarkup} from "../utils/movie.js";

const createMovieTemplate = (movie) => {
  const {
    poster,
    title,
    totalRating,
    releaseDate,
    runtime,
    genres,
    description,
    comments
  } = movie;

  const year = releaseDate.getFullYear();
  const length = generateLengthMarkup(runtime);
  const category = genres.join(`, `);
  const countComments = comments.length;
  const descriptionMarkup = generateDescriptionMarkup(description);
  const buttonClassActive = `film-card__controls-item--active`;
  const classWatchlist = movie.isWatchlist ? buttonClassActive : ``;
  const classWatched = movie.isWatched ? buttonClassActive : ``;
  const classFavorite = movie.isFavorite ? buttonClassActive : ``;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${length}</span>
        <span class="film-card__genre">${category}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${descriptionMarkup}</p>
      <a class="film-card__comments">${countComments} comments</a>
      <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${classWatchlist}">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${classWatched}">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite ${classFavorite}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class Movie extends AbstractComponent {
  constructor(movie) {
    super();

    this._movie = movie;
  }

  getTemplate() {
    return createMovieTemplate(this._movie);
  }

  setOpenClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}
