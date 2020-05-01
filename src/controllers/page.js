// Import components
import SortComponent, {SortType} from "../components/sort.js";
import FilmsComponent from "../components/films.js";
import FilmsEmptyComponent from "../components/films-empty.js";
import FilmsExtraComponent from "../components/films-extra.js";
import LoadMoreButtonComponent from "../components/load-more-button.js";

import MovieController from "./movie.js";

// Import constants and utils
import {RenderPosition, render, remove} from "../utils/render.js";
import {getRandomElementsArray} from "../utils/common.js";

// Define constants
const FILM_EXTRA_COUNT = 2;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const FILM_EXTRA_COMMENTED_TITLE = `Most commented`;
const FILM_EXTRA_RATED_TITLE = `Top rated`;

// Define render functions
const renderFilms = (container, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const movieController = new MovieController(container, onDataChange, onViewChange);

    movieController.render(film);

    return movieController;
  });
};

const renderFilmsExtra = (containerElement, title, films, onDataChange, onViewChange) => {
  const filmsExtraComponent = new FilmsExtraComponent(title);
  render(containerElement, filmsExtraComponent, RenderPosition.BEFOREEND);

  const filmsContentElement = filmsExtraComponent.getElement().querySelector(`.films-list__container`);
  return renderFilms(filmsContentElement, films, onDataChange, onViewChange);
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

    this._films = [];
    this._showedFilmControllers = [];
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(films) {
    const container = this._container.getElement();

    this._films = films;
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    if (films.length === 0) {
      render(container, this._filmsEmptyComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFORE);
    render(container, this._filmsComponent, RenderPosition.BEFOREEND);

    const filmsListElement = this._filmsComponent.getElement().querySelector(`.films-list__container`);

    let newFilms = renderFilms(filmsListElement, films.slice(0, this._showingFilmsCount), this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    this._renderLoadMoreButton();

    newFilms = renderFilmsExtra(container, FILM_EXTRA_RATED_TITLE, getRandomElementsArray(films, FILM_EXTRA_COUNT), this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    newFilms = renderFilmsExtra(container, FILM_EXTRA_COMMENTED_TITLE, getRandomElementsArray(films, FILM_EXTRA_COUNT), this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

      const sortedFilms = getSortedFilms(films, sortType, 0, this._showingFilmsCount);

      filmsListElement.innerHTML = ``;

      newFilms = renderFilms(filmsListElement, sortedFilms.slice(0, this._showingFilmsCount), this._onDataChange, this._onViewChange);
      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

      this._renderLoadMoreButton();
    });
  }

  _onDataChange(filmController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    filmController.render(this._films[index]);
  }

  _onViewChange() {
    this._showedFilmControllers.map((filmController) => {
      filmController.setDefaultView();

      return filmController;
    });
  }

  _renderLoadMoreButton() {
    if (this._showingFilmsCount >= this._films.length) {
      this._loadMoreButtonComponent.getElement().classList.add(`visually-hidden`);
      return;
    }

    this._loadMoreButtonComponent.getElement().classList.remove(`visually-hidden`);

    const filmsListElement = this._filmsComponent.getElement().querySelector(`.films-list__container`);

    render(filmsListElement, this._loadMoreButtonComponent, RenderPosition.AFTEREND);

    this._loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
      const prevTasksCount = this._showingFilmsCount;
      this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

      renderFilms(filmsListElement, this._films.slice(prevTasksCount, this._showingFilmsCount), this._onDataChange, this._onViewChange);

      if (this._showingFilmsCount >= this._films.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }

  _onSortTypeChange(sortType) {
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    const sortedFilms = getSortedFilms(this._films, sortType, 0, this._showingFilmsCount);
    const filmsListElement = this._filmsComponent.getElement().querySelector(`.films-list__container`);

    filmsListElement.innerHTML = ``;

    const newTasks = renderFilms(filmsListElement, sortedFilms, this._onDataChange, this._onViewChange);
    this._showedFilmControllers = newTasks;

    this._renderLoadMoreButton();
  }
}
