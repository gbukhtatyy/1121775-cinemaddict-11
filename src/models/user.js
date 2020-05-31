const MinimalWatchedMovies = {
  BUFF: 20,
  FAN: 10,
  NOVICE: 0
};

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
      case (watchedMovies > MinimalWatchedMovies.BUFF):
        return `movie buff`;
      case (watchedMovies > MinimalWatchedMovies.FAN):
        return `fan`;
      case (watchedMovies > MinimalWatchedMovies.NOVICE):
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
