export default class User {
  constructor(moviesModel) {
    this._moviesModel = moviesModel;

    this._user = null;
    this._user = {
      status: ``
    };

    this._setStatus();

    this._onDataChange = this._onDataChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  _calculateStatus() {
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

  getStatus() {
    return this._user.status;
  }

  _setStatus() {
    this._user.status = this._calculateStatus();
  }

  _onDataChange() {
    this._setStatus();
  }
}
