import AbstractComponent from "./abstract-component.js";

const createStatisticTemplate = (number) => {
  return (
    `<section class="footer__statistics">
      <p>${number} movies inside</p>
    </section>`
  );
};

export default class SiteStatistic extends AbstractComponent {
  constructor(number) {
    super();

    this._number = number;
  }

  getTemplate() {
    return createStatisticTemplate(this._number);
  }
}
