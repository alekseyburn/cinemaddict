import FilmModel from '../models/film-model';


const checkOnline = () => {
  return window.navigator.onLine;
};


const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
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
          const items = createStoreStructure(films.map((film) => film.toRAW()));

          this._store.setItems(items);

          return films;
        });
    }

    const storeFilms = Object.values(this._store.getItems());

    return Promise.resolve(FilmModel.parseFilms(storeFilms));
  }

  updateFilm(id, film) {
    if (checkOnline()) {
      return this._api.updateFilm(id, film)
        .then((newFilm) => {
          this._store.setItem(newFilm.id, newFilm.toRAW);

          return newFilm;
        });
    }

    const localFilm = FilmModel.clone(Object.assign(film, {id}));

    this._store.setItem(id, localFilm.toRAW());

    return Promise.resolve(localFilm);
  }

  sync() {
    if (checkOnline()) {
      const storeFilms = Object.values(this._store.getItems());

      return this._api.sync(storeFilms)
      .then((response) => {
        const updatedFilms = response.updated;

        const items = createStoreStructure(updatedFilms);

        this._store.setItems(items);
      });

    }

    return Promise.reject(new Error(`Sync data failed`));
  }
}
