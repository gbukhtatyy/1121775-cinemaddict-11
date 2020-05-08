import AbstractComponent from "./abstract-component.js";

const createLoadMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class LoadMoreButton extends AbstractComponent {
  constructor(title) {
    super();

    this._title = title;
  }

  getTemplate() {
    return createLoadMoreButtonTemplate(this._title);
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
