import StatisticComponent from "../components/statistic";
import {ClassName} from "../utils/render.js";
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
        .add(ClassName.HIDDEN);
    }

    if (oldStatisticComponent) {
      replace(this._statisticComponent, oldStatisticComponent);
    } else {
      render(this._container, this._statisticComponent, RenderPosition.BEFOREEND);
    }
  }

  show() {
    this._isVisible = true;

    this._activeFilterType = StatisticFilterType.ALL_TIME;
    this._statisticComponent.setFilterType(this._activeFilterType);

    const container = this._statisticComponent.getElement();
    if (container) {
      container.classList.remove(ClassName.HIDDEN);
    }

    this.render();
  }

  hide() {
    this._isVisible = false;
    const container = this._statisticComponent.getElement();
    if (container) {
      container.classList.add(ClassName.HIDDEN);
    }
  }

  _getUserData() {
    const userStatus = this._userModel.getStatus();

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
