// Import components
import SortComponent, {
  SortType
} from "../components/sort.js";
import FilmsComponent from "../components/films.js";
import FilmsEmptyComponent from "../components/films-empty.js";
import FilmsExtraComponent from "../components/films-extra.js";
import LoadMoreButtonComponent from "../components/load-more-button.js";

// Import controllers
import MovieController from "./movie.js";

// Import constants and utils
import {
  RenderPosition,
  render,
  remove
} from "../utils/render.js";
import {
  getRandomElementsArray
} from "../utils/common.js";

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
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.DATE:
      sortedFilms = showingFilms.sort((a, b) => a.releaseDate - b.releaseDate);
      break;
    case SortType.RATING:
      sortedFilms = showingFilms.sort((a, b) => b.totalRating - a.totalRating);
      break;
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms.slice(from, to);
};

export default class Page {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._sortComponent = new SortComponent();
    this._filmsComponent = new FilmsComponent();
    this._filmsEmptyComponent = new FilmsEmptyComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();

    this._showedFilmControllers = [];
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);
    this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._moviesModel.setFilterChangeHandler(this._onFilterTypeChange);
  }

  render() {
    const container = this._container.getElement();
    const films = this._moviesModel.getMovies();

    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    if (films.length === 0) {
      render(container, this._filmsEmptyComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFORE);
    render(container, this._filmsComponent, RenderPosition.BEFOREEND);

    const filmsListElement = this._filmsComponent.getFilmsListElement();

    let newFilms = renderFilms(filmsListElement, films.slice(0, this._showingFilmsCount), this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    this._renderLoadMoreButton();

    //newFilms = renderFilmsExtra(container, FILM_EXTRA_RATED_TITLE, getRandomElementsArray(films, FILM_EXTRA_COUNT), this._onDataChange, this._onViewChange);
    //this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    //newFilms = renderFilmsExtra(container, FILM_EXTRA_COMMENTED_TITLE, getRandomElementsArray(films, FILM_EXTRA_COUNT), this._onDataChange, this._onViewChange);
    //this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
  }

  _removeFilms() {
    this._showedFilmControllers.forEach((taskController) => taskController.destroy());
    this._showedFilmControllers = [];
  }

  _renderFilms(films) {
    const filmsListElement = this._filmsComponent.getFilmsListElement();
    const newFilms = renderFilms(filmsListElement, films, this._onDataChange, this._onViewChange);

    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    this._showingFilmsCount = this._showedFilmControllers.length;
  }

  _renderLoadMoreButton() {
    remove(this._loadMoreButtonComponent);

    const films = this._moviesModel.getMovies();

    if (this._showingFilmsCount >= films.length) {
      return;
    }

    const container = this._filmsComponent.getFilmsListElement();
    render(container, this._loadMoreButtonComponent, RenderPosition.AFTEREND);
    this._loadMoreButtonComponent.setClickHandler(this._onLoadMoreButtonClick);
  }

  _updateFilms(count) {
    const films = this._moviesModel.getMovies();

    this._removeFilms();
    this._renderFilms(films.slice(0, count));
    this._renderLoadMoreButton();
  }

  _onDataChange(filmController, oldData, newData) {
    if (oldData === null) {
      return;
    } else if (newData === null) {
      return;
    } else {
      const isSuccess = this._moviesModel.updateMovie(oldData.id, newData);

      if (isSuccess) {
        filmController.render(newData);
      }
    }
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((filmController) => filmController.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    const films = this._moviesModel.getMovies();
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    const sortedFilms = getSortedFilms(films, sortType, 0, this._showingFilmsCount);

    this._removeFilms();
    this._renderFilms(sortedFilms);

    this._renderLoadMoreButton();
  }

  _onLoadMoreButtonClick() {
    const films = this._moviesModel.getMovies();
    const prevFilmsCount = this._showingFilmsCount;

    this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    const sortedFilms = getSortedFilms(films, this._sortComponent.getSortType(), prevFilmsCount, this._showingFilmsCount);
    this._renderFilms(sortedFilms);


    if (this._showingFilmsCount >= films.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _onFilterTypeChange() {
    this._sortComponent.setSortType(SortType.DEFAULT);
    this._updateFilms(SHOWING_FILMS_COUNT_ON_START);
  }
}
