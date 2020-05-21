const USER_STATUSES = [
  {
    min: 21,
    name: `Movie buff`
  },
  {
    min: 11,
    name: `Fan`,
  },
  {
    min: 1,
    name: `Novice`,
  },
];

const getUserStatus = (watchedFilms) => {
  const statusData = USER_STATUSES.find(({min}) => watchedFilms >= min);
  return statusData ? statusData.name : ``;
};

const getWatchedFilms = (films) => {
  return films.filter((film) => film.isWatched);
};

export default class User {
  constructor(filmsModel) {
    this._user = null;
    this._filmsModel = filmsModel;

    this._onDataChange = this._onDataChange.bind(this);

    this._filmsModel.setDataChangeHandler(this._onDataChange);
  }

  getUser() {
    return this._user;
  }

  setUser(user) {
    this._user = Object.assign({}, user);
    this._updateStatus();
  }

  getStatus() {
    return this._user ? this._user.status : ``;
  }

  _updateStatus() {
    const watchedFilms = getWatchedFilms(this._filmsModel.getMovies());
    this._user.status = getUserStatus(watchedFilms);
  }

  _onDataChange() {
    this._updateStatus();
  }
}
