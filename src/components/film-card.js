import {createElement} from '../utils/dom';
import {formatRuntime} from '../utils/time';

const getFilmCardMarkup = ({
  comments,
  description,
  genres,
  name,
  poster,
  rating,
  releaseDate,
  runtime,
}) => {
  const formatedDescription = description.length > 140
    ? `${description.slice(0, 138)}…`
    : description;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rating.toFixed(1)}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseDate.getFullYear()}</span>
        <span class="film-card__duration">${formatRuntime(runtime)}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="./images/posters/${poster}" alt="${name}" class="film-card__poster">
      <p class="film-card__description">${formatedDescription}</p>
      <a class="film-card__comments">
        ${comments.length} ${comments.length === 1 ? `comment` : `comments`}
      </a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard {
  constructor(film) {
    this._element = null;
    this._film = film;
  }

  getTemplate() {
    return getFilmCardMarkup(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
