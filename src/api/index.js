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
   * Выполнение запроса к апи сервиса
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
