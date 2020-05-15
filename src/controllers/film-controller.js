import FilmCardComponent from '../components/film-card';
import FilmPopupComponent from '../components/film-popup';

import {render, remove, replace} from '../utils/dom';


export default class FilmController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._filmCardComponent = null;
    this._filmPopupComponent = null;
  }

  render(film) {
    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmPopupComponent = this._filmPopupComponent;
    this._filmCardComponent = new FilmCardComponent(film);
    this._filmPopupComponent = new FilmPopupComponent(film);

    const escKeyHandler = (evt) => {
      if (evt.key === `Escape` || evt.key === `Ecs`) {
        remove(this._filmPopupComponent);
        document.removeEventListener(`keydown`, escKeyHandler);
      }
    };

    this._filmCardComponent.setClickHandler(() => {
      render(document.body, this._filmPopupComponent);
      this._filmPopupComponent.setCloseButtonClickHandler(() => {
        remove(this._filmPopupComponent);
        document.removeEventListener(`keydown`, escKeyHandler);
      });
      document.addEventListener(`keydown`, escKeyHandler);
    });

    this._filmCardComponent.setAddToWatchlistClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {isAddedToWatchlist: !film.isAddedToWatchlist}));
    });

    this._filmCardComponent.setMarkAsWatchedClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {isMarkedAsWatched: !film.isMarkedAsWatched}));
    });

    this._filmCardComponent.setFavoriteClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {isFavorite: !film.isFavorite}));
    });


    if (oldFilmCardComponent && oldFilmPopupComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._filmPopupComponent, oldFilmPopupComponent);
    } else {
      render(this._container, this._filmCardComponent);
    }
  }
}
