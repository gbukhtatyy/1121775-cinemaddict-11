import {getMoviesByFilter} from "../utils/filter.js";
import {FilterType, SortType, StatisticFilterType} from "../const.js";

export default class Movies {
  constructor(api) {
    this._movies = [];
    this._api = api;

    this._activeFilterType = FilterType.ALL;
    this._activeSortType = SortType.DEFAULT;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this._sortChangeHandlers = [];
  }

  getMoviesAll() {
    return this._movies;
  }

  getMovies() {
    return getMoviesByFilter(this._movies, this._activeFilterType);
  }

  setMovies(movies) {
    this._movies = Array.from(movies);

    this._callHandlers(this._dataChangeHandlers);
  }

  getWatchedMovies() {
    return this._movies.filter((movie) => movie.isWatched);
  }

  getMoviesWithSort() {
    let sortedMovies = [];
    const showingMovies = this.getMovies().slice();

    switch (this._activeSortType) {
      case SortType.DATE:
        sortedMovies = showingMovies.sort((a, b) => b.releaseDate - a.releaseDate);
        break;
      case SortType.RATING:
        sortedMovies = showingMovies.sort((a, b) => b.totalRating - a.totalRating);
        break;
      case SortType.DEFAULT:
        sortedMovies = showingMovies;
        break;
    }

    return sortedMovies;
  }

  getMoviesByPeriod(movies, period) {
    const date = new Date();

    switch (period) {
      case StatisticFilterType.TODAY:
        date.setDate(date.getDate() - 1);
        break;
      case StatisticFilterType.WEEK:
        date.setDate(date.getDate() - 7);
        break;
      case StatisticFilterType.MONTH:
        date.setMonth(date.getMonth() - 1);
        break;
      case StatisticFilterType.YEAR:
        date.setFullYear(date.getFullYear() - 1);
        break;
      default:
        return movies;
    }

    return movies.filter((item) => item.watchingDate > date);
  }

  getFilterType() {
    return this._activeFilterType;
  }

  setFilterType(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);

    this.setSortType(SortType.DEFAULT);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  getSortType() {
    return this._activeSortType;
  }

  setSortType(sortType) {
    this._activeSortType = sortType;
    this._callHandlers(this._sortChangeHandlers);
  }

  setSortChangeHandler(handler) {
    this._sortChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  updateMovie(id, movie) {
    const index = this._movies.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), movie, this._movies.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  deleteComment(movieId, commentId) {
    return this._api.deleteComment(movieId, commentId);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
