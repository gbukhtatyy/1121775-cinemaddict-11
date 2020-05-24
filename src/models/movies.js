import {getMoviesByFilter} from "../utils/filter.js";
import {FilterType, SortType, StatisticFilterType} from "../const.js";

export default class Movies {
  constructor() {
    this._movies = [];

    this._activeFilterType = FilterType.ALL;
    this._activeSortType = SortType.DEFAULT;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this._sortChangeHandlers = [];

    this._log = this._log.bind(this);

    this.setDataChangeHandler(this._log);
    this.setFilterChangeHandler(this._log);
    this.setSortChangeHandler(this._log);
  }

  _log() {
    return;
    console.log(`Filter: `, this._activeFilterType);
    console.log(`Sort: `, this._activeSortType);
    console.log(`Movies: `, this._movies);
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

  getMoviesByPeriod(movies, period) {
    if (period === StatisticFilterType.ALL_TIME) {
      return movies;
    }

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

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
