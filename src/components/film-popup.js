import moment from "moment";

import AbstractSmartComponent from "./abstract-smart-component.js";

import {generateLengthMarkup} from "../utils/common.js";

const EmojiType = {
  SMILE: `smile`,
  SLEEPING: `sleeping`,
  PUKE: `puke`,
  ANGRY: `angry`,
};

const EMOJI_TYPES = [
  EmojiType.SMILE,
  EmojiType.SLEEPING,
  EmojiType.PUKE,
  EmojiType.ANGRY
];

const EMOJI_SIZE_SMALL = 30;
const EMOJI_SIZE_BIG = 55;

const createEmojiImgMarkup = (type, size) => {
  return (
    `<img src="./images/emoji/${type}.png" width="${size}" height="${size}" alt="emoji">`
  );
};

const createEmojiMarkup = (type, isChecked) => {
  const inputChecked = isChecked ? `checked` : ``;
  const imageEmojiMarkup = createEmojiImgMarkup(type, EMOJI_SIZE_SMALL);
  return (
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${type}" value="${type}" ${inputChecked}>
    <label class="film-details__emoji-label" for="emoji-${type}">
      ${imageEmojiMarkup}
    </label>`
  );
};

const createGenreMarkup = (genre) => {
  return (
    `<span class="film-details__genre">${genre}</span>`
  );
};

const createCommentMarkup = (comment) => {
  const {id, author, content, emoji} = comment;
  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}" width="55" height="55" alt="emoji-angry">
      </span>
      <div>
        <p class="film-details__comment-text">${content}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">Today</span>
          <button class="film-details__comment-delete" data-comment-id="${id}">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const createFilmPopupTemplate = (film, comments) => {
  const {
    title,
    alternativeTitle,
    description,
    totalRating,
    runtime,
    poster,
    genres,
    director,
    writers,
    actors,
    releaseDate,
    releaseCountry
  } = film;

  const length = generateLengthMarkup(runtime);
  const countComments = comments.length;
  const writersContent = writers.join(`, `);
  const actorsContent = actors.join(`, `);

  const releaseDateMarkup = moment(releaseDate).format(`DD MMMM YYYY`);
  const genresMarkup = genres.map((genre) => createGenreMarkup(genre)).join(`\n`);
  const commentsMarkup = comments.map((comment) => createCommentMarkup(comment)).join(`\n`);

  const checkedWatchlist = film.isWatchlist ? `checked` : ``;
  const checkedWatched = film.isWatched ? `checked` : ``;
  const checkedFavorite = film.isFavorite ? `checked` : ``;

  const emojiesMarkup = EMOJI_TYPES.slice().map((type) => {
    return createEmojiMarkup(type, false);
  }).join(`\n`);

  return (
    `<section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="form-details__top-container">
            <div class="film-details__close">
              <button class="film-details__close-btn" type="button">close</button>
            </div>
            <div class="film-details__info-wrap">
              <div class="film-details__poster">
                <img class="film-details__poster-img" src="${poster}" alt="${title}">

                <p class="film-details__age">18+</p>
              </div>

              <div class="film-details__info">
                <div class="film-details__info-head">
                  <div class="film-details__title-wrap">
                    <h3 class="film-details__title">${title}</h3>
                    <p class="film-details__title-original">Original: ${alternativeTitle}</p>
                  </div>

                  <div class="film-details__rating">
                    <p class="film-details__total-rating">${totalRating}</p>
                  </div>
                </div>

                <table class="film-details__table">
                  <tbody><tr class="film-details__row">
                    <td class="film-details__term">Director</td>
                    <td class="film-details__cell">${director}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Writers</td>
                    <td class="film-details__cell">${writersContent}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Actors</td>
                    <td class="film-details__cell">${actorsContent}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Release Date</td>
                    <td class="film-details__cell">${releaseDateMarkup}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Runtime</td>
                    <td class="film-details__cell">${length}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Country</td>
                    <td class="film-details__cell">${releaseCountry}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Genres</td>
                    <td class="film-details__cell">${genresMarkup}</td>
                  </tr>
                </tbody></table>

                <p class="film-details__film-description">${description}</p>
              </div>
            </div>

            <section class="film-details__controls">
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${checkedWatchlist}>
              <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

              <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${checkedWatched}>
              <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

              <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${checkedFavorite}>
              <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
            </section>
          </div>

          <div class="form-details__bottom-container">
            <section class="film-details__comments-wrap">
              <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${countComments}</span></h3>

              <ul class="film-details__comments-list">${commentsMarkup}</ul>

              <div class="film-details__new-comment">
                <div for="add-emoji" class="film-details__add-emoji-label"></div>

                <label class="film-details__comment-label">
                  <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                </label>

                <div class="film-details__emoji-list">
                  ${emojiesMarkup}
                </div>
              </div>
            </section>
          </div>
        </form>
      </section>`
  );
};

export default class FilmPopup extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;
    this._comments = film.comments;

    this._closeHandler = null;
    this._addCommentHandler = null;
    this._deleteCommentHandler = null;

    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  getTemplate() {
    return createFilmPopupTemplate(this._film, this._comments);
  }

  recoveryListeners() {
    this.setClickCloseHandler(this._closeHandler);
    this.setAddCommentHandler(this._addCommentHandler);
    this.setDeleteCommentHandler(this._deleteCommentHandler);
    this._subscribeOnEvents();
  }

  setClickCloseHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);

    this._closeHandler = handler;
  }

  setAddCommentHandler(handler) {
    this._addCommentHandler = handler;
  }

  setDeleteCommentHandler(handler) {
    this._deleteCommentHandler = handler;

    const comments = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    Array.from(comments).forEach((item) => {
      item.addEventListener(`click`, handler);
    });
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const elementEmoji = element.querySelector(`.film-details__add-emoji-label`);

    element.querySelectorAll(`[name=comment-emoji]`).forEach(() => {
      element.addEventListener(`change`, (evt) => {
        elementEmoji.innerHTML = createEmojiImgMarkup(evt.target.value, EMOJI_SIZE_BIG);
        this._addCommentHandler(evt);
      });
    });
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, handler);
  }
}
