import AbstractComponent from "./abstract-component.js";

const createProfileTemplate = (rating) => {
  return (
    `<section class="header__profile profile">
          <p class="profile__rating">${rating}</p>
          <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
  );
};

export default class Profile extends AbstractComponent {
  constructor(moviesModel) {
    super();

    this._moviesModel = moviesModel;

    this._onDataChange = this._onDataChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  getTemplate() {
    return createProfileTemplate(this.getRatingLabel());
  }

  getWatchedFilms() {
    const allMovies = this._moviesModel.getMoviesAll();

    return allMovies.filter((movie) => movie.isWatched).length;
  }

  getRatingLabel() {
    const watchedMovies = this.getWatchedFilms();

    switch (true) {
      case (watchedMovies > 20):
        return `movie buff`;
      case (watchedMovies > 10):
        return `fan`;
      case (watchedMovies > 0):
        return `novice`;
    }

    return ``;
  }

  updateRating() {
    const profileRatingLabel = this.getElement().querySelector(`.profile__rating`);
    profileRatingLabel.innerHTML = this.getRatingLabel();
  }

  _onDataChange() {
    this.updateRating();
  }
}
