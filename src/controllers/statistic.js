// Import components
import StatisticComponent from "../components/statistic";

// Import constants and utils
import {HIDDEN_CLASS} from "../utils/render.js";
import {RenderPosition, render, replace} from "../utils/render.js";
import {getTotalDuration, getGenreFromWatched} from "../utils/movie.js";
import {StatisticFilterType} from "../const.js";

export default class Statistic {
  constructor(container, moviesModel, userModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._userModel = userModel;

    this._isVisible = false;
    this._activeFilterType = StatisticFilterType.ALL_TIME;

    this._onDateChange = this._onDateChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDateChange);
  }

  render() {
    const userData = this._getUserData();

    const oldStatisticComponent = this._statisticComponent;
    this._statisticComponent = new StatisticComponent(userData);

    this._statisticComponent.setFilterType(this._activeFilterType);
    this._statisticComponent.setFilterClickHandler((filterType) => {
      this._activeFilterType = filterType;
      this.render();
    });

    if (!this._isVisible) {
      this._statisticComponent.getElement()
        .classList
        .add(HIDDEN_CLASS);
    }

    if (oldStatisticComponent) {
      replace(this._statisticComponent, oldStatisticComponent);
    } else {
      render(this._container, this._statisticComponent, RenderPosition.BEFOREEND);
    }
  }

  show() {
    this._isVisible = true;
    this._statisticComponent.setFilterType(StatisticFilterType.ALL_TIME);

    const container = this._statisticComponent.getElement();
    if (container) {
      container.classList.remove(HIDDEN_CLASS);
    }
  }

  hide() {
    this._isVisible = false;
    const container = this._statisticComponent.getElement();
    if (container) {
      container.classList.add(HIDDEN_CLASS);
    }
  }

  _getUserData() {
    const userStatus = this._userModel.getUserStatus();

    const watched = this._moviesModel.getWatchedMovies();
    const watchedByPeriod = this._moviesModel.getMoviesByPeriod(watched, this._activeFilterType);

    const watchedTotal = watchedByPeriod.length;
    const watchedDuration = getTotalDuration(watchedByPeriod);
    const watchedGenres = getGenreFromWatched(watchedByPeriod);

    let watchedGenreTop = Object.keys(watchedGenres)[0];
    watchedGenreTop = watchedGenreTop ? watchedGenreTop : ``;

    return {
      userStatus,
      watched,
      watchedTotal,
      watchedDuration,
      watchedGenres,
      watchedGenreTop
    };
  }

  _onDateChange() {
    this.render();
  }
}
