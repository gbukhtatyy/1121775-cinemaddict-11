import he from 'he';
import AbstractComponent from "../abstract-component.js";
import {ClassName, createElement} from "../../utils/render";

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
  constructor() {
    super();

    this._isCommentSending = false;
    this._selectedEmoji = null;

    this._textareaElement = null;

    this._submitHandler = null;
    this._submitGeneratedHandler = null;

    this._pressedButtons = {};

  }

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

  _getSubmitHandler(handler) {
    const textareaElement = this.getElement().querySelector(`.film-details__comment-input`);
    const emojiLabelElement = this.getElement().querySelector(`.film-details__add-emoji-label`);

    return (event) => {
      if (this._isCommentSending) {
        return;
      }

      if (event.key === `Enter`) {
        this._pressedButtons.enter = true;
      } else if (event.key === `Control` || event.key === `Meta`) {
        this._pressedButtons.ctrl = true;
      }

      if (this._pressedButtons.enter && this._pressedButtons.ctrl) {
        this._pressedButtons = {};
        textareaElement.classList.remove(ClassName.REQUIRED);
        emojiLabelElement.classList.remove(ClassName.REQUIRED);

        const value = textareaElement.value.trim();

        if (!this._selectedEmoji) {
          emojiLabelElement.classList.add(ClassName.REQUIRED);
        }

        if (!value) {
          textareaElement.classList.add(ClassName.REQUIRED);
          textareaElement.focus();
        }

        if (!value || !this._selectedEmoji) {
          return;
        }

        textareaElement.classList.remove(ClassName.REQUIRED);
        emojiLabelElement.classList.remove(ClassName.REQUIRED);

        this._isCommentSending = true;

        handler({
          text: he.encode(value),
          emoji: this._selectedEmoji,
          date: new Date()
        });
      }

    };
  }

  setSubmitHandler(handler) {
    this._submitHandler = handler;
    this._submitGeneratedHandler = this._getSubmitHandler(handler);

    document.addEventListener(`keydown`, this._submitGeneratedHandler);
    document.addEventListener(`keyup`, this._keyUpHandler);
  }

  removeSubmitFormHandler() {
    this._isCommentSending = false;
    document.removeEventListener(`keyup`, this._keyUpHandler);
    document.removeEventListener(`keydown`, this._submitGeneratedHandler);
  }

  _subscribeOnEvents() {
    this._isCommentSending = false;

    const element = this.getElement();
    const elementEmoji = element.querySelector(`.film-details__add-emoji-label`);

    element.querySelectorAll(`[name="comment-emoji"]`).forEach((el) => {
      el.addEventListener(`change`, (evt) => {
        this._selectedEmoji = evt.target.value;
        elementEmoji.innerHTML = createEmojiImgMarkup(evt.target.value, EMOJI_SIZE_BIG);
      });
    });
  }

  _keyUpHandler() {
    this._pressedButtons = {};
  }
}
