import {createElement} from "../utils.js";

const createStatisticTemplate = (number) => {
  return (
    `<section class="footer__statistics">
      <p>${number} movies inside</p>
    </section>`
  );
};

export default class SiteStatistic {
  constructor(number) {
    this._number = number;

    this._element = null;
  }

  getTemplate() {
    return createStatisticTemplate(this._number);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
