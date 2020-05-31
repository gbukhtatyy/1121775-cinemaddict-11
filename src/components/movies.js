import AbstractComponent from "./abstract-component.js";
import {ClassName} from "../utils/render.js";
import {AppPageTitle} from "../const.js";

const createPageTemplate = (title, isVisible) => {
  const hiddenClass = isVisible ? `` : ClassName.HIDDEN;

  return (
    `<section class="films-list">
      <h2 class="films-list__title ${hiddenClass}">${title}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class Movies extends AbstractComponent {
  constructor() {
    super();

    this._titleElement = null;

    this._title = AppPageTitle.LOADING;
    this._isTitleVisible = true;
  }

  getTemplate() {
    return createPageTemplate(this._title, this._isTitleVisible);
  }

  getListElement() {
    return this.getElement().querySelector(`.films-list__container`);
  }

  setTitle(title) {
    if (this._title === title) {
      return;
    }

    this._title = title;

    const titleElement = this._getTitleElement();

    titleElement.innerHtml = this._title;
  }

  setTitleVisible(isVisible) {
    if (this._isTitleVisible === isVisible) {
      return;
    }

    this._isTitleVisible = isVisible;

    const titleElement = this._getTitleElement();

    if (this._isTitleVisible) {
      titleElement.classList.remove(ClassName.HIDDEN);
    } else {
      titleElement.classList.add(ClassName.HIDDEN);
    }
  }

  _getTitleElement() {
    if (this._titleElement === null) {
      this._titleElement = this.getElement().querySelector(`.films-list__title`);
    }

    return this._titleElement;
  }
}
