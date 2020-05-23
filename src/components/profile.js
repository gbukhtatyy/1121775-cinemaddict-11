import AbstractComponent from "./abstract-component.js";

const createProfileTemplate = () => {
  return (
    `<section class="header__profile profile">
          <p class="profile__rating"></p>
          <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
  );
};

export default class Profile extends AbstractComponent {
  constructor(moviesModel, userModel) {
    super();

    this._moviesModel = moviesModel;
    this._userModel = userModel;

    this._onDataChange = this._onDataChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  getTemplate() {
    return createProfileTemplate();
  }

  updateRating() {
    const profileRatingLabel = this.getElement().querySelector(`.profile__rating`);

    profileRatingLabel.innerHTML = this._userModel.getUserStatus();
  }

  _onDataChange() {
    this.updateRating();
  }
}
