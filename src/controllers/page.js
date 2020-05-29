// Import components
import MoviesComponent from "../components/movies.js";
import LoadMoreButtonComponent from "../components/load-more-button.js";

// Import controllers
import MovieController from "../controllers/movie.js";

// Import models
import MovieModel from "../models/movie.js"

// Import constants and utils
import {AppState, AppPageTitle} from "../const.js";
import {RenderPosition, ClassName, render, replace, remove} from "../utils/render.js";
import {SortType} from "../const.js";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

// Define render functions
const renderMovies = (container, movies, onDataChange, onViewChange) => {
  return movies.map((movie) => {
    const movieController = new MovieController(container, onDataChange, onViewChange);
    movieController.render(movie);
    return movieController;
  });
};

export default class Page {
  constructor(api, container, moviesModel) {
    this._api = api;
    this._container = container;
    this._moviesModel = moviesModel;

    this._moviesComponent = null;
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();

    this._showedMovieControllers = [];
    this._showingMoviesCount = SHOWING_FILMS_COUNT_ON_START;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);
    this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);

    this._moviesModel.setSortChangeHandler(this._onSortTypeChange);
    this._moviesModel.setFilterChangeHandler(this._onFilterTypeChange);
  }

  render(params) {
    const {state} = params;
    const container = this._container.getElement();

    const oldMoviesComponent = this._moviesComponent;
    this._moviesComponent = new MoviesComponent();

    this._showingMoviesCount = SHOWING_FILMS_COUNT_ON_START;

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

        this._updateMovies();

        break;
    }

    if (oldMoviesComponent) {
      replace(this._moviesComponent, oldMoviesComponent);
    } else {
      render(container, this._moviesComponent, RenderPosition.BEFOREEND);
    }

    this._renderLoadMoreButton();
  }

  show() {
    const container = this._container.getElement();
    if (container) {
      container.classList.remove(ClassName.HIDDEN);
    }
  }

  hide() {
    const container = this._container.getElement();
    if (container) {
      container.classList.add(ClassName.HIDDEN);
    }
  }

  _renderFilms(movies) {
    const moviesContainer = this._moviesComponent.getMoviesListElement();
    const newMovies = renderMovies(moviesContainer, movies, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);
  }

  _updateMovies() {
    const movies = this._moviesModel.getMoviesWithSort();

    this._removeFilms();
    this._renderFilms(movies.slice(0, SHOWING_FILMS_COUNT_ON_START));

    this._renderLoadMoreButton();
  }

  _removeFilms() {
    this._showedMovieControllers.forEach((taskController) => taskController.destroy());
    this._showedMovieControllers = [];
  }

  _renderLoadMoreButton() {
    remove(this._loadMoreButtonComponent);

    const films = this._moviesModel.getMovies();

    if (this._showingMoviesCount >= films.length) {
      return;
    }

    const container = this._moviesComponent.getMoviesListElement();
    render(container, this._loadMoreButtonComponent, RenderPosition.AFTEREND);
    this._loadMoreButtonComponent.setClickHandler(this._onLoadMoreButtonClick);
  }

  _onLoadMoreButtonClick() {
    const movies = this._moviesModel.getMoviesWithSort();
    const prevMoviesCount = this._showingMoviesCount;

    this._showingMoviesCount = this._showingMoviesCount + SHOWING_FILMS_COUNT_BY_BUTTON;
    const sortedFilms = movies.slice(prevMoviesCount, this._showingMoviesCount);
    this._renderFilms(sortedFilms);

    if (this._showingMoviesCount >= movies.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((movieController) => movieController.setDefaultView());
  }

  _onSortTypeChange() {
    this._showingMoviesCount = SHOWING_FILMS_COUNT_ON_START;
    this._updateMovies();

    this._renderLoadMoreButton();
  }

  _onFilterTypeChange() {
    this._moviesModel.setSortType(SortType.DEFAULT);
  }

  _updateMovie(movieController, movieId, newData) {
    const isSuccess = this._moviesModel.updateMovie(movieId, newData);
    if (isSuccess) {
      movieController.render(newData);
    }
  }

  _onDataChange(movieController, oldData, newData) {
    const movie = movieController.getMovie();
    const {comments, commentsData} = movie;

    if (oldData === null) {
      this._api.addComment(movie.id, newData)
      .then((movieModel) => {
        this._updateMovie(movieController, movie.id, movieModel);
      });
    } else if (newData === null) {
      const deletedCommentId = oldData;

      const newComments = comments.filter((commentId) => commentId !== deletedCommentId);
      const newCommentsData = commentsData.filter((comment) => comment.id !== deletedCommentId);

      const newMovieData = MovieModel.clone(movie);

      newMovieData.comments = newComments;
      newMovieData.commentsData = newCommentsData;

      this._api
        .deleteComment(deletedCommentId)
        .then(() => this._updateMovie(movieController, movie.id, newMovieData));
    } else {
      this._updateMovie(movieController, movie.id, newData);
    }
  }
}
