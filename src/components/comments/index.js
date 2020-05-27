import AbstractComponent from "../abstract-component.js";

const createCommentsMarkup = (countComments) => {
  return (
    `<section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${countComments}</span></h3>
    </section>`
  );
};

export default class Comments extends AbstractComponent {
  constructor(movie) {
    super();

    this._movie = movie;
  }

  getTemplate() {
    const countComments = this._movie.comments.length;

    return createCommentsMarkup(countComments);
  }
}
