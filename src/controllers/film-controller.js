import FilmCardComponent from '../components/film-card';
import FilmPopupComponent from '../components/film-popup';

import {render, remove, replace} from '../utils/dom';


const Mode = {
  DEFAULT: `default`,
  POPUP: `popup`,
};


export default class FilmController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._filmCardComponent = null;
    this._filmPopupComponent = null;

    this._escKeyHandler = this._escKeyHandler.bind(this);
  }

  render(film) {
    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmPopupComponent = this._filmPopupComponent;
    this._filmCardComponent = new FilmCardComponent(film);
    this._filmPopupComponent = new FilmPopupComponent(film);

    this._filmCardComponent.setClickHandler(() => {
      this._showFilmPopup();
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

    this._filmPopupComponent.setAddToWatchlistClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {isAddedToWatchlist: !film.isAddedToWatchlist}));
    });

    this._filmPopupComponent.setMarkAsWatchedClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {isMarkedAsWatched: !film.isMarkedAsWatched}));
    });

    this._filmPopupComponent.setFavoriteClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {isFavorite: !film.isFavorite}));
    });

    this._filmPopupComponent.setCloseButtonClickHandler(() => {
      this._hideFilmPopup();
    });


    if (oldFilmCardComponent && oldFilmPopupComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._filmPopupComponent, oldFilmPopupComponent);
    } else {
      render(this._container, this._filmCardComponent);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._hideFilmPopup();
    }
  }

  _showFilmPopup() {
    this._onViewChange();
    render(document.body, this._filmPopupComponent);
    document.addEventListener(`keydown`, this._escKeyHandler);
    this._mode = Mode.POPUP;
  }

  _hideFilmPopup() {
    remove(this._filmPopupComponent);
    document.removeEventListener(`keydown`, this._escKeyHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Ecs`) {
      this._hideFilmPopup();
    }
  }
}
