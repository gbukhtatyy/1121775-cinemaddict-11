import AbstractComponent from "../abstract-component.js";
import {generateRelativeDate} from "../../utils/movie";

const ButtonText = {
  DEFAULT: `Delete`,
  WAITING: `Deleting...`
};

const createCommentListItemMarkup = (comment) => {
  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-puke">
      </span>
      <div>
        <p class="film-details__comment-text">${comment.comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${generateRelativeDate(comment.date)}</span>
          <button class="film-details__comment-delete" data-comment-id="${comment.id}">${ButtonText.DEFAULT}</button>
        </p>
      </div>
    </li>`
  );
};

const createCommentsListMarkup = (movie) => {
  const commentsMarkup = movie.commentsData.map((it) => createCommentListItemMarkup(it)).join(`\n`);

  return (
    `<ul class="film-details__comments-list">${commentsMarkup}</ul>`
  );
};

export default class List extends AbstractComponent {
  constructor(movie) {
    super();

    this._movie = movie;
  }

  getTemplate() {
    return createCommentsListMarkup(this._movie);
  }

  setDeleteClickHandler(handler) {
    const deleteButtonElements = this.getElement().querySelectorAll(`.film-details__comment-delete`);

    deleteButtonElements.forEach((item) => {
      item.addEventListener(`click`, (event) => {
        event.preventDefault();

        item.disabled = true;
        item.innerHTML = ButtonText.WAITING;

        const commentId = item.dataset.commentId;

        handler(commentId);
      });
    });
  }
}
