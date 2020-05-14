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

  getMovies() {
    return this._load(`movies`)
      .then((response) => response.json())
      .then(Movie.parseMovies);
  }

  getComments() {
    return this._load({url: `comments`})
      .then((response) => response.json());
  }

  updateMovie(id, data){

  }

  createComment(comment){

  }

  updateComment(id, data){

  }

  deleteComment(id){

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
