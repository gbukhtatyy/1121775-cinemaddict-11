// Import components
import SortComponent, {SortType} from "../components/sort.js";
import FilmComponent from "../components/film.js";
import FilmsComponent from "../components/films.js";
import FilmsEmptyComponent from "../components/films-empty.js";
import FilmPopupComponent from "../components/film-popup.js";
import FilmsExtraComponent from "../components/films-extra.js";
import LoadMoreButtonComponent from "../components/load-more-button.js";

// Import constants and utils
import {RenderPosition, render, remove} from "../utils/render.js";
import {getRandomElementsArray} from "../utils/common.js";
import {isEscEvent} from "../utils/keyboard.js";

// Define constants
const FILM_EXTRA_COUNT = 2;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const FILM_EXTRA_COMMENTED_TITLE = `Most commented`;
const FILM_EXTRA_RATED_TITLE = `Top rated`;

// Define containers
const bodyElement = document.querySelector(`body`);

// Define render functions
const renderFilm = (filmListElement, film) => {
  const openFilmPopup = () => {
    bodyElement.appendChild(filmPopupComponent.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const closeFilmPopup = () => {
    bodyElement.removeChild(filmPopupComponent.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    isEscEvent(evt, () => {
      closeFilmPopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
  };

  const filmComponent = new FilmComponent(film);
  const filmPopupComponent = new FilmPopupComponent(film);

  const filmPoster = filmComponent.getElement().querySelector(`.film-card__poster`);
  const filmTitle = filmComponent.getElement().querySelector(`.film-card__title`);
  const filmComments = filmComponent.getElement().querySelector(`.film-card__comments`);

  filmPoster.addEventListener(`click`, openFilmPopup);
  filmTitle.addEventListener(`click`, openFilmPopup);
  filmComments.addEventListener(`click`, openFilmPopup);

  const buttonClosePopup = filmPopupComponent.getElement().querySelector(`.film-details__close-btn`);
  buttonClosePopup.addEventListener(`click`, closeFilmPopup);

  render(filmListElement, filmComponent, RenderPosition.BEFOREEND);
};

const renderFilmsExtra = (containerElement, title, films) => {
  const filmsExtraComponent = new FilmsExtraComponent(title);
  render(containerElement, filmsExtraComponent, RenderPosition.BEFOREEND);

  const filmsContentElement = filmsExtraComponent.getElement().querySelector(`.films-list__container`);
  films.forEach((film) => renderFilm(filmsContentElement, film));
};

const getSortedFilms = (films, sortType, from, to) => {
  let sortedTasks = [];
  const showingTasks = films.slice();

  switch (sortType) {
    case SortType.DATE:
      sortedTasks = showingTasks.sort((a, b) => a.year - b.year);
      break;
    case SortType.RATING:
      sortedTasks = showingTasks.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.DEFAULT:
      sortedTasks = showingTasks;
      break;
  }

  return sortedTasks.slice(from, to);
};

export default class Page {
  constructor(container) {
    this._container = container;

    this._sortComponent = new SortComponent();
    this._filmsComponent = new FilmsComponent();
    this._filmsEmptyComponent = new FilmsEmptyComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  render(films) {
    const renderLoadMoreButton = () => {
      if (showingFilmsCount >= films.length) {
        return;
      }
      render(this._container.getElement(), this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

      this._loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
        const prevTasksCount = showingFilmsCount;
        showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

        films.slice(prevTasksCount, showingFilmsCount)
          .forEach((task) => renderFilm(filmsListElement, task));

        if (showingFilmsCount >= films.length) {
          remove(this._loadMoreButtonComponent);
        }
      });
    };

    if (films.length === 0) {
      render(this._container.getElement(), this._filmsEmptyComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(this._container.getElement(), this._sortComponent, RenderPosition.BEFORE);
    render(this._container.getElement(), this._filmsComponent, RenderPosition.BEFOREEND);

    const filmsListElement = this._filmsComponent.getElement().querySelector(`.films-list__container`);

    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    films.slice(0, showingFilmsCount)
      .forEach((film) => {
        renderFilm(filmsListElement, film);
      });

    renderLoadMoreButton();

    renderFilmsExtra(this._container.getElement(), FILM_EXTRA_RATED_TITLE, getRandomElementsArray(films, FILM_EXTRA_COUNT));
    renderFilmsExtra(this._container.getElement(), FILM_EXTRA_COMMENTED_TITLE, getRandomElementsArray(films, FILM_EXTRA_COUNT));

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

      const sortedFilms = getSortedFilms(films, sortType, 0, showingFilmsCount);

      filmsListElement.innerHTML = ``;

      sortedFilms.slice(0, showingFilmsCount)
        .forEach((film) => {
          renderFilm(filmsListElement, film);
        });

      renderLoadMoreButton();
    });
  }
}
