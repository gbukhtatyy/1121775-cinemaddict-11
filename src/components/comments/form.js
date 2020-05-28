import AbstractComponent from "../abstract-component.js";

import {createElement} from "../../utils/render";

const EmojiType = {
  SMILE: `smile`,
  SLEEPING: `sleeping`,
  PUKE: `puke`,
  ANGRY: `angry`,
};

const EMOJI_TYPES = [
  EmojiType.SMILE,
  EmojiType.SLEEPING,
  EmojiType.PUKE,
  EmojiType.ANGRY
];

const EMOJI_SIZE_SMALL = 30;
const EMOJI_SIZE_BIG = 55;

const createEmojiImgMarkup = (type, size) => {
  return (
    `<img src="./images/emoji/${type}.png" width="${size}" height="${size}" alt="emoji">`
  );
};

const createEmojiMarkup = (type, isChecked) => {
  const inputChecked = isChecked ? `checked` : ``;
  const imageEmojiMarkup = createEmojiImgMarkup(type, EMOJI_SIZE_SMALL);
  return (
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${type}" value="${type}" ${inputChecked}>
    <label class="film-details__emoji-label" for="emoji-${type}">
      ${imageEmojiMarkup}
    </label>`
  );
};

const createFormMarkup = () => {
  const emojiesMarkup = EMOJI_TYPES.slice().map((type) => {
    return createEmojiMarkup(type, false);
  }).join(`\n`);

  return (
    `<div class="film-details__new-comment">
      <div for="add-emoji" class="film-details__add-emoji-label"></div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>

      <div class="film-details__emoji-list">
        ${emojiesMarkup}
      </div>
    </div>`
  );
};

export default class Form extends AbstractComponent {
  getTemplate() {
    return createFormMarkup();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());

      this._subscribeOnEvents();
    }
    return this._element;
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const elementEmoji = element.querySelector(`.film-details__add-emoji-label`);

    element.querySelectorAll(`[name="comment-emoji"]`).forEach((el) => {
      el.addEventListener(`change`, (evt) => {
        elementEmoji.innerHTML = createEmojiImgMarkup(evt.target.value, EMOJI_SIZE_BIG);
      });
    });
  }
}
