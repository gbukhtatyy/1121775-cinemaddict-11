import {getMoviesByFilter} from "../utils/filter.js";
import {FilterType, SortType} from "../const.js";

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
    return this._movies.filter((movie) => movie.isWatched).length;
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
