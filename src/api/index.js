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

  _getCommentsPromise(movieJson) {
    return new Promise((resolve, reject) => {
      this._load(`comments/${movieJson.id}`)
        .then((response) => response.json())
        .then((commentsJson) => {
          movieJson[`comments_data`] = commentsJson;

          resolve(movieJson);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getMovies() {
    return this._load(`movies`)
      .then((response) => response.json())
      .then((moviesJson) => {
        const commentsPromises = moviesJson.reduce((prev, movieJson) => {
          const commentPromise = this._getCommentsPromise(movieJson);
          prev.push(commentPromise);
          return prev;
        }, []);

        return Promise.all(commentsPromises);
      })
      .then(Movie.parseMovies);
  }

  deleteComment(commentId) {
    return this._load(`comments/${commentId}`, Method.DELETE);
  }

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
