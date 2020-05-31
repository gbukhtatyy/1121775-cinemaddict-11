import FilterComponent from "../components/filter.js";
import {render, replace, RenderPosition} from "../utils/render.js";
import {getMoviesByFilter} from "../utils/filter.js";
import {FilterType} from "../const.js";

export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._filterItemClickHandler = null;
    this._statisticClickHandler = null;


    this._onFilterChange = this._onFilterChange.bind(this);
    this._onFilterTypeSet = this._onFilterTypeSet.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    this._moviesModel.setFilterChangeHandler(this._onFilterChange);
    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const oldComponent = this._filterComponent;

    const allMovies = this._moviesModel.getMoviesAll();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getMoviesByFilter(allMovies, filterType).length,
        isChecked: filterType === this._activeFilterType,
      };
    });

    this._filterComponent = new FilterComponent(filters);

    this._filterComponent.setType(this._activeFilterType);
    this._filterComponent.setTypeChangeHandler(this._onFilterTypeSet);

    this._filterComponent.setFilterItemClickHandler(this._filterItemClickHandler);
    this._filterComponent.setStatisticClickHandler(this._statisticClickHandler);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.AFTERBEGIN);
    }
  }

  setFilterItemClickHandler(handler) {
    if (this._filterComponent) {
      this._filterComponent.setFilterItemClickHandler(handler);
    }
    this._filterItemClickHandler = handler;
  }

  setStatisticClickHandler(handler) {
    if (this._filterComponent) {
      this._filterComponent.setStatisticClickHandler(handler);
    }
    this._statisticClickHandler = handler;
  }

  _onFilterChange() {
    const newFilterType = this._moviesModel.getFilterType();

    if (newFilterType === this._activeFilterType) {
      return;
    }

    this._activeFilterType = newFilterType;
    this.render();
  }

  _onFilterTypeSet(filterType) {
    if (this._activeFilterType === filterType) {
      return;
    }

    this._moviesModel.setFilterType(filterType);
  }

  _onDataChange() {
    this.render();
  }
}
