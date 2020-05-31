import FilmModel from '../models/film-model';
import CommentModel from '../models/comment-model';


const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};


export default class API {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({url: `movies`})
      .then((response) => response.json())
      .then(FilmModel.parseFilms);
  }

  updateFilm(id, data) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(FilmModel.parseFilm);
  }

  getComments(filmID) {
    return this._load({url: `comments/${filmID}`})
      .then((response) => response.json())
      .then(CommentModel.parseComments);
  }

  removeComment(commentID) {
    return this._load({
      url: `comments/${commentID}`,
      method: Method.DELETE
    });
  }

  addComment(filmID, commentData) {
    return this._load({
      url: `comments/${filmID}`,
      method: Method.POST,
      body: JSON.stringify(commentData.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    });
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
