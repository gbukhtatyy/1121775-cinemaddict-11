import MoviesComponent from "../components/movies.js";
import LoadMoreButtonComponent from "../components/load-more-button.js";
import MovieController from "../controllers/movie.js";
import MovieModel from "../models/movie.js";
import {AppState, AppPageTitle} from "../const.js";
import {RenderPosition, ClassName, render, replace, remove} from "../utils/render.js";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

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
    this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);

    this._moviesModel.setSortChangeHandler(this._onSortTypeChange);
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
        this._showEmptyTitle();
        break;
      default:
        this._updateMovies();
        break;
    }

    if (oldMoviesComponent) {
      replace(this._moviesComponent, oldMoviesComponent);
    } else {
      render(container, this._moviesComponent, RenderPosition.BEFOREEND);
    }
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

  _showEmptyTitle() {
    this._moviesComponent.setTitle(AppPageTitle.EMPTY);
    this._moviesComponent.setTitleVisible(true);
  }

  _showDefaultTitle() {
    this._moviesComponent.setTitle(AppPageTitle.DEFAULT);
    this._moviesComponent.setTitleVisible(false);
  }

  _renderFilms(movies) {
    const moviesContainer = this._moviesComponent.getListElement();
    const newMovies = renderMovies(moviesContainer, movies, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);
  }

  _updateMovies() {
    const movies = this._moviesModel.getMoviesWithSort();
    if (movies.length > 0) {
      this._showDefaultTitle();
    } else {
      this._showEmptyTitle();
    }

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

    const container = this._moviesComponent.getListElement();
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
