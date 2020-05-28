import AbstractComponent from "../abstract-component.js";

import CommentsListComponent from "./list.js";
import CommentsFormComponent from "./form.js";

import {createElement, render, RenderPosition} from "../../utils/render";

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

    this._commentsListComponent = new CommentsListComponent(movie);
    this._commentsFormComponent = new CommentsFormComponent(movie);
  }

  getTemplate() {
    const countComments = this._movie.comments.length;

    return createCommentsMarkup(countComments);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());

      render(this._element, this._commentsListComponent, RenderPosition.BEFOREEND);
      render(this._element, this._commentsFormComponent, RenderPosition.BEFOREEND);
    }
    return this._element;
  }

  setDeleteCommentHandler(handler) {
    this._commentsListComponent.setDeleteClickHandler(handler);
  }
}
