import SortComponent from "../components/sort.js";
import {RenderPosition, ClassName, render, replace} from "../utils/render.js";
import {SortType} from "../const.js";

export default class SortController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._activeSort = SortType.DEFAULT;
    this._sortComponent = null;

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onSortTypeSet = this._onSortTypeSet.bind(this);

    this._moviesModel.setSortChangeHandler(this._onSortTypeChange);
  }

  render() {
    const container = this._container;

    const oldComponent = this._sortComponent;
    this._sortComponent = new SortComponent();

    this._sortComponent.setSortType(this._activeSort);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeSet);

    if (oldComponent) {
      replace(this._sortComponent, oldComponent);
    } else {
      render(container, this._sortComponent, RenderPosition.AFTERBEGIN);
    }
  }

  show() {
    if (this._sortComponent) {
      this._sortComponent.getElement().classList.remove(ClassName.HIDDEN);
    }
  }

  hide() {
    if (this._sortComponent) {
      this._sortComponent.getElement().classList.add(ClassName.HIDDEN);
    }
  }

  _onSortTypeChange() {
    const newSort = this._moviesModel.getSortType();

    if (newSort === this._activeSort) {
      return;
    }

    this._activeSort = newSort;
    this.render();
  }

  _onSortTypeSet(sortType) {
    if (this._activeSort === sortType) {
      return;
    }

    this._moviesModel.setSortType(sortType);
  }

}
