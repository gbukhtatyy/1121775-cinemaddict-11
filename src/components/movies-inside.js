import AbstractComponent from "./abstract-component.js";

const createMoviesInsideTemplate = (amount) => {
  return (
    `<section class="footer__statistics"><p>${amount} movies inside</p></section>`
  );
};

export default class MoviesInside extends AbstractComponent {
  constructor(moviesModel) {
    super();

    this._moviesModel = moviesModel;

    this._amountMovies = 0;

    this._onDataChange = this._onDataChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  getTemplate() {
    return createMoviesInsideTemplate(this._amountMovies);
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);
  }

  _onDataChange() {
    this._amountMovies = this._moviesModel.getMoviesAll().length;
    this.rerender();
  }
}
