import AbstractSmartComponent from './abstract-smart-component';
import {
  formatCommentDate,
  formatDDMonthYYYY,
  formatRuntime,
} from '../utils/time';

import {EMOJI} from '../mocks/comments';


const getGenresMarkup = (genres) => {
  return genres
    .map((genre) => `<span class="film-details__genre">${genre}</span>`)
    .join(``);
};

const getCommentsMarkup = (comments) => {
  const commentsMarkup = comments.map((comment) => {
    const {
      author,
      date,
      emoji,
      message,
    } = comment;

    return (
      `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
        </span>
        <div>
          <p class="film-details__comment-text">${message}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${formatCommentDate(date)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
    );
  }).join(``);

  return commentsMarkup;
};

const getEmojiOptionsMarkup = (currentCommentEmoji) => {
  return EMOJI.map((emojiName) => {
    return (
      `<input
        class="film-details__emoji-item visually-hidden" 
        name="comment-emoji"
        type="radio"
        id="emoji-${emojiName}"
        value="${emojiName}"
        ${emojiName === currentCommentEmoji ? `checked` : ``}
      >
      <label class="film-details__emoji-label" for="emoji-${emojiName}">
        <img src="./images/emoji/${emojiName}.png" width="30" height="30" alt="emoji">
      </label>`
    );
  }).join(``);
};

const getFilmPopupMarkup = (film, options) => {
  const {
    actors,
    comments,
    country,
    description,
    director,
    genres,
    mpaaRating,
    name,
    poster,
    rating,
    releaseDate,
    runtime,
    writers,
    isAddedToWatchlist,
    isMarkedAsWatched,
    isFavorite,
  } = film;

  const {currentCommentEmoji} = options;
  const currentEmojiMarkup = currentCommentEmoji
    ? `<img src="images/emoji/${currentCommentEmoji}.png" width="55" height="55" alt="emoji-${currentCommentEmoji}">`
    : ``;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt="${name}">
              <p class="film-details__age">${mpaaRating}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${name}</h3>
                  <p class="film-details__title-original">Original: ${name}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating.toFixed(1)}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${formatDDMonthYYYY(releaseDate)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${formatRuntime(runtime)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${getGenresMarkup(genres)}
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input
              type="checkbox"
              class="film-details__control-input visually-hidden"
              id="watchlist"
              name="watchlist"
              ${isAddedToWatchlist ? `checked` : ``}
            >
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
    
            <input
              type="checkbox"
              class="film-details__control-input visually-hidden"
              id="watched"
              name="watched"
              ${isMarkedAsWatched ? `checked` : ``}
            >
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
    
            <input
              type="checkbox"
              class="film-details__control-input visually-hidden"
              id="favorite"
              name="favorite"
              ${isFavorite ? `checked` : ``}
            >
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            <ul class="film-details__comments-list">
              ${getCommentsMarkup(comments)}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
                ${currentEmojiMarkup}
              </div>
    
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                ${getEmojiOptionsMarkup(currentCommentEmoji)}
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};


export default class FilmPopupComponent extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
    this._currentCommentEmoji = null;
    this._closeButtonClickHandler = null;
    this._addToWatchlistClickHandler = null;
    this._markAsWatchedClickHandler = null;
    this._favofiteClickHandler = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return getFilmPopupMarkup(this._film, {currentCommentEmoji: this._currentCommentEmoji});
  }

  recoveryListeners() {
    this.setCloseButtonClickHandler(this._closeButtonClickHandler);
    this.setAddToWatchlistClickHandler(this._addToWatchlistClickHandler);
    this.setMarkAsWatchedClickHandler(this._markAsWatchedClickHandler);
    this.setFavoriteClickHandler(this._favofiteClickHandler);
    this._subscribeOnEvents();
  }

  setCloseButtonClickHandler(handler) {
    const popupCloseButton = this.getElement().querySelector(`.film-details__close-btn`);
    popupCloseButton.addEventListener(`click`, handler);

    this._closeButtonClickHandler = handler;
  }

  setAddToWatchlistClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, handler);

    this._addToWatchlistClickHandler = handler;
  }

  setMarkAsWatchedClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, handler);

    this._markAsWatchedClickHandler = handler;
  }

  setFavoriteClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, handler);

    this._favofiteClickHandler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.film-details__emoji-list`)
      .addEventListener(`change`, (evt) => {
        evt.preventDefault();
        this._currentCommentEmoji = evt.target.value;
        this.rerender();
      });
  }
}
