import {createElement} from "../utils.js";

const createProfileTemplate = () => {
  return (
    `<section class="header__profile profile">
          <p class="profile__rating">Movie Buff</p>
          <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
  );
};

export default class Profile {
  constructor(menuItems, additionalMenuItems) {
    this._menuItems = menuItems;
    this._additionalMenuItems = additionalMenuItems;

    this._element = null;
  }

  getTemplate() {
    return createProfileTemplate(this._menuItems, this._additionalMenuItems);
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
