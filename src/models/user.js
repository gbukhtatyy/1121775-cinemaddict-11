export default class User {
  constructor(moviesModel) {
    this._moviesModel = moviesModel;

    this._user = null;
    this._user = {
      avatar: `./images/bitmap@2x.png`,
      status: ``
    };

    this._setUserStatus();

    this._onDataChange = this._onDataChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  _calculateUserStatus() {
    const watchedMovies = this._moviesModel.getWatchedMovies().length;

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

  getUserStatus() {
    return this._user.status;
  }

  _setUserStatus() {
    this._user.status = this._calculateUserStatus();
  }

  _onDataChange() {
    this._setUserStatus();
  }
}
