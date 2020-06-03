import FilmModel from '../models/film-model';
import CommentModel from '../models/comment-model';


const checkOnline = () => {
  return window.navigator.onLine;
};


export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  addComment(filmID, commentData) {
    if (checkOnline()) {
      return this._api.addComment(filmID, commentData);
    }

    return Promise.reject(`offline`);
  }

  getComments(filmID) {
    if (checkOnline()) {
      return this._api.getComments(filmID);
    }

    return Promise.reject(`offline`);
  }

  removeComment(commentID) {
    if (checkOnline()) {
      return this._api.removeComment(commentID);
    }

    return Promise.reject(`offline`);
  }

  getFilms() {
    if (checkOnline()) {
      return this._api.getFilms()
        .then((films) => {

        })
    }

    return Promise.reject(`offline behavior is not implemented`);
  }

  updateFilm(id, data) {
    if (checkOnline()) {
      return this._api.updateFilm(id, data);
    }

    return Promise.reject(`offline behavior is not implemented`);
  }
}
