import Movie from "../models/movie";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  throw new Error(`${response.status}: ${response.statusText}`);
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  //#region movies

  /**
   * Получение информации о фильмах
   * @return {Array}
   * @return {Promise}
   */
  getMovies() {
    return this._load(`movies`)
      .then((response) => response.json())
      .then(Movie.parseMovies);
  }

  /**
   * Выставление рейтинга, добавление в избранное.
   *
   * @param {number} filmId
   * @param {array} userDetails
   * @return {Promise}
   */
  updateMovie(filmId, userDetails) {
    return this._load({
      url: `movies/${filmId}`,
      method: Method.PUT,
      body: JSON.stringify(userDetails),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then(Movie.parseMovies);
  }

  //#endregion

  //#region comments

  /**
   * Получение комментариев к фильму.
   * GET /comments/:film_id
   *
   * @param {number} filmId
   * @return {Promise}
   */
  getComments(filmId) {
    return this._load({url: `comments/${filmId}`})
      .then((response) => response.json());
  }

  /**
   * Создание нового комментария к фильму
   * POST /comments/:film_id
   *
   * @param {number} filmId
   * @param {array} comment
   * @return {Promise}
   */
  createComment(filmId, comment) {
    return this._load({
      url: `comments/${filmId}`,
      method: Method.PUT,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then(Movie.parseMovies);
  }

  /**
   * Удаление существующего комментария.
   * DELETE /comments/:comment_id
   *
   * @param {number} commentId
   * @return {Promise}
   */
  deleteComment(commentId) {
    return this._load({url: `comments/${commentId}`, method: Method.DELETE});
  }

  //#endregion

  /**
   * Синхронизация фильмов
   *
   * @param {array} movies
   * @return {Promise}
   */
  sync(movies) {
    return this._load({
      url: `movies/sync`,
      method: Method.POST,
      body: JSON.stringify(movies),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json());
  }

  /**
   *
   * @param {string} url
   * @param {Method} method
   * @param {array} body
   * @param {array} headers
   * @return {Promise}
   */
  _load(url, method = Method.GET, body = null, headers = new Headers()) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {
      method,
      body,
      headers
    }).then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
