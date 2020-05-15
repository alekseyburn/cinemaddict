import FilmCardComponent from '../components/film-card';
import FilmPopupComponent from '../components/film-popup';

import {render, remove} from '../utils/dom';


export default class FilmController {
  constructor(container) {
    this._container = container;
    this._filmCardComponent = null;
    this._filmPopupComponent = null;
  }

  render(film) {
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

    render(this._container, this._filmCardComponent);
  }
}
