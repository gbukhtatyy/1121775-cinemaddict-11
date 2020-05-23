import AbstractComponent from "./abstract-component.js";
import {HIDDEN_CLASS} from "../utils/render.js";
import {AppPageTitle} from "../const.js";

const FILMS_LIST_TITLE_CLASS = `films-list__title`;

const createPageTemplate = (title, isVisible) => {
  const hiddenClass = isVisible ? `` : HIDDEN_CLASS;

  return (
    `<section class="films-list">
      <h2 class="${FILMS_LIST_TITLE_CLASS} ${hiddenClass}">${title}</h2>
    </section>`
  );
};

export default class Movies extends AbstractComponent {
  constructor() {
    super();

    this._title = AppPageTitle.LOADING;
    this._isTitleVisible = true;
  }

  getTemplate() {
    return createPageTemplate(this._title, this._isTitleVisible);
  }

  setTitle(title) {
    this._title = title;
  }

  setTitleVisible(isVisible) {
    this._isTitleVisible = isVisible;
  }
}
