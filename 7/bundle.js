/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/absstract-component.js":
/*!***********************************************!*\
  !*** ./src/components/absstract-component.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AbstractComponent; });
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/dom */ "./src/utils/dom.js");


class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrety one.`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_dom__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element.remove();
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/film-card.js":
/*!*************************************!*\
  !*** ./src/components/film-card.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FilmCard; });
/* harmony import */ var _absstract_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./absstract-component */ "./src/components/absstract-component.js");
/* harmony import */ var _utils_time__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/time */ "./src/utils/time.js");



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
        <span class="film-card__duration">${Object(_utils_time__WEBPACK_IMPORTED_MODULE_1__["formatRuntime"])(runtime)}</span>
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

class FilmCard extends _absstract_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return getFilmCardMarkup(this._film);
  }

  setClickHandler(handler) {
    const posterImage = this.getElement().querySelector(`.film-card__poster`);
    const titleHeading = this.getElement().querySelector(`.film-card__title`);
    const commentsLink = this.getElement().querySelector(`.film-card__comments`);

    posterImage.addEventListener(`click`, handler);
    titleHeading.addEventListener(`click`, handler);
    commentsLink.addEventListener(`click`, handler);
  }
}


/***/ }),

/***/ "./src/components/film-popup.js":
/*!**************************************!*\
  !*** ./src/components/film-popup.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FilmPopup; });
/* harmony import */ var _absstract_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./absstract-component */ "./src/components/absstract-component.js");
/* harmony import */ var _utils_time__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/time */ "./src/utils/time.js");




const getGenresMarkup = (genres) => genres
  .map((genre) => `<span class="film-details__genre">${genre}</span>`)
  .join(``);


const getCommentsMarkup = (comments) => comments.map(({
  author,
  date,
  emoji,
  message,
}) => (
  `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
    </span>
    <div>
      <p class="film-details__comment-text">${message}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${Object(_utils_time__WEBPACK_IMPORTED_MODULE_1__["formatCommentDate"])(date)}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`
)).join(``);


const getFilmPopupMarkup = ({
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
}) => {
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
                  <td class="film-details__cell">${Object(_utils_time__WEBPACK_IMPORTED_MODULE_1__["formatDDMonthYYYY"])(releaseDate)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${Object(_utils_time__WEBPACK_IMPORTED_MODULE_1__["formatRuntime"])(runtime)}</td>
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
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
    
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
    
            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
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
              <div for="add-emoji" class="film-details__add-emoji-label"></div>
    
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>
    
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

class FilmPopup extends _absstract_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return getFilmPopupMarkup(this._film);
  }

  setCloseButtonClickHandler(handler) {
    const popupCloseButton = this.getElement().querySelector(`.film-details__close-btn`);
    popupCloseButton.addEventListener(`click`, handler);
  }
}


/***/ }),

/***/ "./src/components/films-list-extra.js":
/*!********************************************!*\
  !*** ./src/components/films-list-extra.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FilmsListExtra; });
/* harmony import */ var _absstract_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./absstract-component */ "./src/components/absstract-component.js");


const getFilmsListExtraMarkup = (title) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>
    
      <div class="films-list__container">
      </div>
    </section>`
  );
};

class FilmsListExtra extends _absstract_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(title) {
    super();
    this._title = title;
  }

  getTemplate() {
    return getFilmsListExtraMarkup(this._title);
  }
}


/***/ }),

/***/ "./src/components/films-list.js":
/*!**************************************!*\
  !*** ./src/components/films-list.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FilmsList; });
/* harmony import */ var _absstract_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./absstract-component */ "./src/components/absstract-component.js");


const getFilmsListMarkup = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
      </div>
    </section>`
  );
};

class FilmsList extends _absstract_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return getFilmsListMarkup();
  }
}


/***/ }),

/***/ "./src/components/films-main.js":
/*!**************************************!*\
  !*** ./src/components/films-main.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FilmsContainer; });
/* harmony import */ var _absstract_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./absstract-component */ "./src/components/absstract-component.js");


const getFilmsContainerMarkup = () => {
  return (
    `<section class="films"></section>`
  );
};

class FilmsContainer extends _absstract_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return getFilmsContainerMarkup();
  }
}


/***/ }),

/***/ "./src/components/load-more.js":
/*!*************************************!*\
  !*** ./src/components/load-more.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LoadMoreButton; });
/* harmony import */ var _absstract_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./absstract-component */ "./src/components/absstract-component.js");


const getLoadMoreButtonMarkup = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

class LoadMoreButton extends _absstract_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return getLoadMoreButtonMarkup();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}


/***/ }),

/***/ "./src/components/main-nav.js":
/*!************************************!*\
  !*** ./src/components/main-nav.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MainNav; });
/* harmony import */ var _absstract_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./absstract-component */ "./src/components/absstract-component.js");


const getMainNavMarkup = (filters) => {
  const filtersMarkup = filters.map(({name, title, count}, index) => {

    const countMarkup = `<span class="main-navigation__item-count">${count}</span>`;
    const activeClass = index === 0 ? `main-navigation__item--active` : ``;

    return (
      `<a
        href="#${name}"
        class="main-navigation__item ${activeClass}"
      >
        ${title}
        ${count ? countMarkup : ``}
      </a>`
    );
  }).join(``);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

class MainNav extends _absstract_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return getMainNavMarkup(this._filters);
  }
}


/***/ }),

/***/ "./src/components/no-films.js":
/*!************************************!*\
  !*** ./src/components/no-films.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NoFilms; });
/* harmony import */ var _absstract_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./absstract-component */ "./src/components/absstract-component.js");


const getNoFilmsMarkup = () => {
  return (
    `<h2 class="films-list__title">There are no movies in our database</h2>`
  );
};

class NoFilms extends _absstract_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return getNoFilmsMarkup();
  }
}


/***/ }),

/***/ "./src/components/profile.js":
/*!***********************************!*\
  !*** ./src/components/profile.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Profile; });
/* harmony import */ var _absstract_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./absstract-component */ "./src/components/absstract-component.js");



const getProfileMarkup = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">Movie Buff</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

class Profile extends _absstract_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return getProfileMarkup();
  }
}


/***/ }),

/***/ "./src/components/sort.js":
/*!********************************!*\
  !*** ./src/components/sort.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Sort; });
/* harmony import */ var _absstract_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./absstract-component */ "./src/components/absstract-component.js");


const getSortMarkup = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

class Sort extends _absstract_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return getSortMarkup();
  }
}


/***/ }),

/***/ "./src/controllers/page-controller.js":
/*!********************************************!*\
  !*** ./src/controllers/page-controller.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PageController; });
/* harmony import */ var _components_film_card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/film-card */ "./src/components/film-card.js");
/* harmony import */ var _components_film_popup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/film-popup */ "./src/components/film-popup.js");
/* harmony import */ var _components_films_main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/films-main */ "./src/components/films-main.js");
/* harmony import */ var _components_films_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/films-list */ "./src/components/films-list.js");
/* harmony import */ var _components_films_list_extra__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/films-list-extra */ "./src/components/films-list-extra.js");
/* harmony import */ var _components_load_more__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/load-more */ "./src/components/load-more.js");
/* harmony import */ var _components_main_nav__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/main-nav */ "./src/components/main-nav.js");
/* harmony import */ var _components_no_films__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/no-films */ "./src/components/no-films.js");
/* harmony import */ var _components_sort__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/sort */ "./src/components/sort.js");
/* harmony import */ var _mocks_filters__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../mocks/filters */ "./src/mocks/filters.js");
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/dom */ "./src/utils/dom.js");















const CARDS_ON_START_COUNT = 5;
const CARDS_ON_CLICK_COUNT = 5;

const renderFilmCard = (filmContainer, film) => {
  const escKeyHandler = (evt) => {
    if (evt.key === `Escape` || evt.key === `Ecs`) {
      filmPopupComponent.removeElement();
      document.removeEventListener(`keydown`, escKeyHandler);
    }
  };

  const filmCardComponent = new _components_film_card__WEBPACK_IMPORTED_MODULE_0__["default"](film);
  const filmPopupComponent = new _components_film_popup__WEBPACK_IMPORTED_MODULE_1__["default"](film);

  filmCardComponent.setClickHandler(() => {
    Object(_utils_dom__WEBPACK_IMPORTED_MODULE_10__["render"])(document.body, filmPopupComponent);
    filmPopupComponent.setCloseButtonClickHandler(() => {
      filmPopupComponent.removeElement();
      document.removeEventListener(`keydown`, escKeyHandler);
    });
    document.addEventListener(`keydown`, escKeyHandler);
  });

  Object(_utils_dom__WEBPACK_IMPORTED_MODULE_10__["render"])(filmContainer, filmCardComponent);
};

class PageController {
  constructor(container) {
    this._container = container;

    this._noFilmsComponent = new _components_no_films__WEBPACK_IMPORTED_MODULE_7__["default"]();
    this._mainNavComponent = new _components_main_nav__WEBPACK_IMPORTED_MODULE_6__["default"](_mocks_filters__WEBPACK_IMPORTED_MODULE_9__["filters"]);
    this._sortComponent = new _components_sort__WEBPACK_IMPORTED_MODULE_8__["default"]();
    this._filmsContainerComponent = new _components_films_main__WEBPACK_IMPORTED_MODULE_2__["default"]();
  }

  render(films) {
    Object(_utils_dom__WEBPACK_IMPORTED_MODULE_10__["render"])(this._container, this._mainNavComponent);
    Object(_utils_dom__WEBPACK_IMPORTED_MODULE_10__["render"])(this._container, this._sortComponent);
    Object(_utils_dom__WEBPACK_IMPORTED_MODULE_10__["render"])(this._container, this._filmsContainerComponent);

    const filmsListComponent = new _components_films_list__WEBPACK_IMPORTED_MODULE_3__["default"]();
    Object(_utils_dom__WEBPACK_IMPORTED_MODULE_10__["render"])(this._filmsContainerComponent.getElement(), filmsListComponent);

    if (films.length === 0) {
      Object(_utils_dom__WEBPACK_IMPORTED_MODULE_10__["render"])(filmsListComponent.getElement(), this._noFilmsComponent);
      return;
    }

    Object(_utils_dom__WEBPACK_IMPORTED_MODULE_10__["render"])(this._filmsContainerComponent.getElement(), new _components_films_list_extra__WEBPACK_IMPORTED_MODULE_4__["default"](`Top rated`));
    Object(_utils_dom__WEBPACK_IMPORTED_MODULE_10__["render"])(this._filmsContainerComponent.getElement(), new _components_films_list_extra__WEBPACK_IMPORTED_MODULE_4__["default"](`Most commented`));

    const loadMoreButtonComponent = new _components_load_more__WEBPACK_IMPORTED_MODULE_5__["default"]();
    Object(_utils_dom__WEBPACK_IMPORTED_MODULE_10__["render"])(filmsListComponent.getElement(), loadMoreButtonComponent);


    const filmsListContainer = document.querySelector(`.films-list__container`);
    let cardsShownCount = CARDS_ON_START_COUNT;

    films.slice(0, cardsShownCount)
      .forEach((film) => renderFilmCard(filmsListContainer, film));

    loadMoreButtonComponent.setClickHandler(() => {
      const prevCardsShownCount = cardsShownCount;
      cardsShownCount += CARDS_ON_CLICK_COUNT;
      films.slice(prevCardsShownCount, cardsShownCount)
        .forEach((film) => renderFilmCard(filmsListContainer, film));

      if (cardsShownCount >= films.length) {
        loadMoreButtonComponent.removeElement();
      }
    });


    const filmsExtraListsContainers = document.querySelectorAll(`.films-list--extra .films-list__container`);
    const [topRatedContainer, mostCommentedContainer] = Array.from(filmsExtraListsContainers);

    const filmsByRating = films.slice()
      .sort((filmA, filmB) => filmB.rating.valueOf() - filmA.rating.valueOf());
    renderFilmCard(topRatedContainer, filmsByRating[0]);
    renderFilmCard(topRatedContainer, filmsByRating[1]);

    const filmsByCommentsNumber = films.slice()
      .sort((filmA, filmB) => filmB.comments.length - filmA.comments.length);
    renderFilmCard(mostCommentedContainer, filmsByCommentsNumber[0]);
    renderFilmCard(mostCommentedContainer, filmsByCommentsNumber[1]);
  }
}


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_profile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/profile */ "./src/components/profile.js");
/* harmony import */ var _controllers_page_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controllers/page-controller */ "./src/controllers/page-controller.js");
/* harmony import */ var _mocks_films__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mocks/films */ "./src/mocks/films.js");
/* harmony import */ var _utils_random__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/random */ "./src/utils/random.js");
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/dom */ "./src/utils/dom.js");








const CARDS_COUNT = 18;


const headerElement = document.querySelector(`.header`);
Object(_utils_dom__WEBPACK_IMPORTED_MODULE_4__["render"])(headerElement, new _components_profile__WEBPACK_IMPORTED_MODULE_0__["default"]());
const mainElement = document.querySelector(`.main`);
const pageController = new _controllers_page_controller__WEBPACK_IMPORTED_MODULE_1__["default"](mainElement);

const films = Object(_utils_random__WEBPACK_IMPORTED_MODULE_3__["generateArray"])(_mocks_films__WEBPACK_IMPORTED_MODULE_2__["generateFilm"], CARDS_COUNT);

pageController.render(films);


/***/ }),

/***/ "./src/mocks/comments.js":
/*!*******************************!*\
  !*** ./src/mocks/comments.js ***!
  \*******************************/
/*! exports provided: generateComment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateComment", function() { return generateComment; });
/* harmony import */ var _utils_random__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/random */ "./src/utils/random.js");


const EMOJI = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`,
];

const MESSAGES = [
  `I think this is the best I’ve seen till now`,
  `Just ‘WOW’`,
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
  `Took my breath away`,
  `Русские есть?`,
  `Come on!`,
  `E,k.ljr vfnm ndj.! F ye blb c.lf? ujdyj cj,fxmt/ Htibk rj vyt ktpnm ns? pfchfytw djy.xbq vfnm ndj.!`,
];

const generateComment = () => {
  return {
    author: Object(_utils_random__WEBPACK_IMPORTED_MODULE_0__["getRandomFullName"])(),
    date: Object(_utils_random__WEBPACK_IMPORTED_MODULE_0__["getRandomDate"])(new Date(2000, 0), new Date(Date.now())),
    emoji: Object(_utils_random__WEBPACK_IMPORTED_MODULE_0__["getRandomArrayItem"])(EMOJI),
    message: Object(_utils_random__WEBPACK_IMPORTED_MODULE_0__["getRandomArrayItem"])(MESSAGES),
  };
};


/***/ }),

/***/ "./src/mocks/common.js":
/*!*****************************!*\
  !*** ./src/mocks/common.js ***!
  \*****************************/
/*! exports provided: NAMES, SURNAMES, COUNTRIES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NAMES", function() { return NAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SURNAMES", function() { return SURNAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COUNTRIES", function() { return COUNTRIES; });
const NAMES = [
  `Emma`,
  `Olivia`,
  `Ava`,
  `Isabella`,
  `Sophia`,
  `Charlotte`,
  `Mia`,
  `Amelia`,
  `Harper`,
  `Evelyn`,
  `Abigail`,
  `Emily`,
  `Elizabeth`,
  `Mila`,
  `Ella`,
  `Avery`,
  `Sofia`,
  `Camila`,
  `Aria`,
  `Scarlett`,
  `Victoria`,
  `Madison`,
  `Luna`,
  `Grace`,
  `Chloe`,
  `Penelope`,
  `Layla`,
  `Riley`,
  `Zoey`,
  `Nora`,
  `Lily`,
  `Eleanor`,
  `Hannah`,
  `Lillian`,
  `Addison`,
  `Aubrey`,
  `Ellie`,
  `Stella`,
  `Natalie`,
  `Zoe`,
  `Leah`,
  `Hazel`,
  `Violet`,
  `Aurora`,
  `Savannah`,
  `Audrey`,
  `Brooklyn`,
  `Bella`,
  `Claire`,
  `Skylar`,
  `Liam`,
  `Noah`,
  `William`,
  `James`,
  `Oliver`,
  `Benjamin`,
  `Elijah`,
  `Lucas`,
  `Mason`,
  `Logan`,
  `Alexander`,
  `Ethan`,
  `Jacob`,
  `Michael`,
  `Daniel`,
  `Henry`,
  `Jackson`,
  `Sebastian`,
  `Aiden`,
  `Matthew`,
  `Samuel`,
  `David`,
  `Joseph`,
  `Carter`,
  `Owen`,
  `Wyatt`,
  `John`,
  `Jack`,
  `Luke`,
  `Jayden`,
  `Dylan`,
  `Grayson`,
  `Levi`,
  `Isaac`,
  `Gabriel`,
  `Julian`,
  `Mateo`,
  `Anthony`,
  `Jaxon`,
  `Lincoln`,
  `Joshua`,
  `Christopher`,
  `Andrew`,
  `Theodore`,
  `Caleb`,
  `Ryan`,
  `Asher`,
  `Nathan`,
  `Thomas`,
  `Leo`,
];

const SURNAMES = [
  `Smith`,
  `Johnson`,
  `Williams`,
  `Brown`,
  `Jones`,
  `Miller`,
  `Davis`,
  `Garcia`,
  `Rodriguez`,
  `Wilson`,
];

const COUNTRIES = [
  `United States`,
  `United Kingdom`,
  `China`,
  `France`,
  `Japan`,
  `Germany`,
  `Republic of Korea`,
  `Canada`,
  `Australia`,
  `India`,
  `New`,
  `Hong`,
  `Italy`,
  `Spain`,
  `Belgium`,
  `Russian Federation`,
  `Mexico`,
];


/***/ }),

/***/ "./src/mocks/films.js":
/*!****************************!*\
  !*** ./src/mocks/films.js ***!
  \****************************/
/*! exports provided: generateFilm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateFilm", function() { return generateFilm; });
/* harmony import */ var _utils_random__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/random */ "./src/utils/random.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ "./src/mocks/common.js");
/* harmony import */ var _comments__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./comments */ "./src/mocks/comments.js");




const FILMS = [
  {
    name: `Made for Each Other`,
    poster: `made-for-each-other.png`,
  },
  {
    name: `Popeye the Sailor Meets Sindbad the Sailor`,
    poster: `popeye-meets-sinbad.png`,
  },
  {
    name: `Sagebrush Trail`,
    poster: `sagebrush-trail.jpg`,
  },
  {
    name: `Santa Claus Conquers the Martians`,
    poster: `santa-claus-conquers-the-martians.jpg`,
  },
  {
    name: `The Dance of Life`,
    poster: `the-dance-of-life.jpg`,
  },
  {
    name: `The Great Flamarion`,
    poster: `the-great-flamarion.jpg`,
  },
  {
    name: `The Man with the Golden Arm`,
    poster: `the-man-with-the-golden-arm.jpg`,
  },
];

const FILM_DESCRIPTIONS = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
  .split(`. `);

const FILM_GENRES = [
  `Action`,
  `Animation`,
  `Comedy`,
  `Crime`,
  `Drama`,
  `Experimental`,
  `Fantasy`,
  `Historical`,
  `Horror`,
  `Romance`,
  `Science`,
  `Thriller`,
  `Western`,
  `Other`,
];

const MPAA_RATING = [
  `G`,
  `PG`,
  `PG-13`,
  `R`,
  `NC-17`,
];


const generateFilm = () => {
  const filmNumber = Object(_utils_random__WEBPACK_IMPORTED_MODULE_0__["getRandomNumber"])(0, FILMS.length - 1);

  return {
    actors: Object(_utils_random__WEBPACK_IMPORTED_MODULE_0__["generateArray"])(_utils_random__WEBPACK_IMPORTED_MODULE_0__["getRandomFullName"], Object(_utils_random__WEBPACK_IMPORTED_MODULE_0__["getRandomNumber"])(3, 9)),
    comments: Object(_utils_random__WEBPACK_IMPORTED_MODULE_0__["generateArray"])(_comments__WEBPACK_IMPORTED_MODULE_2__["generateComment"], Object(_utils_random__WEBPACK_IMPORTED_MODULE_0__["getRandomNumber"])(0, 5)),
    country: Object(_utils_random__WEBPACK_IMPORTED_MODULE_0__["getRandomArrayItem"])(_common__WEBPACK_IMPORTED_MODULE_1__["COUNTRIES"]),
    description: Object(_utils_random__WEBPACK_IMPORTED_MODULE_0__["getShuffledArray"])(FILM_DESCRIPTIONS, Object(_utils_random__WEBPACK_IMPORTED_MODULE_0__["getRandomNumber"])(1, 5))
    .join(`. `),
    director: Object(_utils_random__WEBPACK_IMPORTED_MODULE_0__["getRandomFullName"])(),
    genres: Object(_utils_random__WEBPACK_IMPORTED_MODULE_0__["getShuffledArray"])(FILM_GENRES, Object(_utils_random__WEBPACK_IMPORTED_MODULE_0__["getRandomNumber"])(1, 3)),
    mpaaRating: Object(_utils_random__WEBPACK_IMPORTED_MODULE_0__["getRandomArrayItem"])(MPAA_RATING),
    name: FILMS[filmNumber].name,
    poster: FILMS[filmNumber].poster,
    rating: Object(_utils_random__WEBPACK_IMPORTED_MODULE_0__["getRandomNumber"])(10, 99) / 10,
    releaseDate: Object(_utils_random__WEBPACK_IMPORTED_MODULE_0__["getRandomDate"])(new Date(1900, 0), new Date(Date.now())),
    runtime: Object(_utils_random__WEBPACK_IMPORTED_MODULE_0__["getRandomNumber"])(45, 210),
    writers: Object(_utils_random__WEBPACK_IMPORTED_MODULE_0__["generateArray"])(_utils_random__WEBPACK_IMPORTED_MODULE_0__["getRandomFullName"], Object(_utils_random__WEBPACK_IMPORTED_MODULE_0__["getRandomNumber"])(1, 3)),
  };
};


/***/ }),

/***/ "./src/mocks/filters.js":
/*!******************************!*\
  !*** ./src/mocks/filters.js ***!
  \******************************/
/*! exports provided: filters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filters", function() { return filters; });
const filters = [
  {
    name: `all`,
    title: `All movies`,
  },
  {
    name: `watchlist`,
    title: `Watchlist`,
    count: 13,
  },
  {
    name: `history`,
    title: `History`,
    count: 7,
  },
  {
    name: `favorites`,
    title: `Favorites`,
    count: 3,
  },
];


/***/ }),

/***/ "./src/utils/common.js":
/*!*****************************!*\
  !*** ./src/utils/common.js ***!
  \*****************************/
/*! exports provided: capitalizeString, zeroPad */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "capitalizeString", function() { return capitalizeString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zeroPad", function() { return zeroPad; });
const capitalizeString = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const zeroPad = (value, digits) =>
  (value + Math.pow(10, digits))
  .toString()
  .slice(1);


/***/ }),

/***/ "./src/utils/dom.js":
/*!**************************!*\
  !*** ./src/utils/dom.js ***!
  \**************************/
/*! exports provided: render, createElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
const render = (parent, component, place = `beforeend`) =>
  parent.insertAdjacentElement(place, component.getElement());

const createElement = (markup) => {
  const container = document.createElement(`div`);
  container.innerHTML = markup;
  return container.firstChild;
};


/***/ }),

/***/ "./src/utils/random.js":
/*!*****************************!*\
  !*** ./src/utils/random.js ***!
  \*****************************/
/*! exports provided: getRandomNumber, getRandomArrayItem, getShuffledArray, getRandomDate, getRandomFullName, generateArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomNumber", function() { return getRandomNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomArrayItem", function() { return getRandomArrayItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getShuffledArray", function() { return getShuffledArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomDate", function() { return getRandomDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomFullName", function() { return getRandomFullName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateArray", function() { return generateArray; });
/* harmony import */ var _mocks_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mocks/common */ "./src/mocks/common.js");


const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const getRandomArrayItem = (array) =>
  array[getRandomNumber(0, array.length - 1)];

const getShuffledArray = (array, numberOfElements) => {
  numberOfElements = numberOfElements || array.length;
  const arrayCopy = array.slice();
  return Array(numberOfElements)
    .fill(``)
    .map(() => arrayCopy.splice(getRandomNumber(0, arrayCopy.length - 1), 1));
};

const getRandomDate = (minDate, maxDate) => {
  const randomUnixDate = getRandomNumber(minDate.valueOf(), maxDate.valueOf());
  return new Date(randomUnixDate);
};

const getRandomFullName = () =>
  `${getRandomArrayItem(_mocks_common__WEBPACK_IMPORTED_MODULE_0__["NAMES"])} ${getRandomArrayItem(_mocks_common__WEBPACK_IMPORTED_MODULE_0__["SURNAMES"])}`;

const generateArray = (generationFunction, length) =>
  Array(length)
    .fill(``)
    .map(generationFunction);


/***/ }),

/***/ "./src/utils/time.js":
/*!***************************!*\
  !*** ./src/utils/time.js ***!
  \***************************/
/*! exports provided: formatRuntime, formatDDMonthYYYY, formatCommentDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatRuntime", function() { return formatRuntime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDDMonthYYYY", function() { return formatDDMonthYYYY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatCommentDate", function() { return formatCommentDate; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ "./src/utils/common.js");


const MONTHS = [
  `january`,
  `february`,
  `march`,
  `april`,
  `may`,
  `june`,
  `july`,
  `august`,
  `september`,
  `october`,
  `november`,
  `december`,
];

const formatRuntime = (runtimeMinutes) => {
  const hours = Math.floor(runtimeMinutes / 60);
  const minutes = runtimeMinutes - hours * 60;
  return `${hours}h ${minutes}m`;
};

const formatDDMonthYYYY = (date) => {
  const zeroPadDate = Object(_common__WEBPACK_IMPORTED_MODULE_0__["zeroPad"])(date.getDate(), 2);
  const month = Object(_common__WEBPACK_IMPORTED_MODULE_0__["capitalizeString"])(MONTHS[date.getMonth()]);
  return `${zeroPadDate} ${month} ${date.getFullYear()}`;
};

const formatCommentDate = (date) =>
  `${date.getFullYear()}/${Object(_common__WEBPACK_IMPORTED_MODULE_0__["zeroPad"])(date.getMonth() + 1, 2)}/${Object(_common__WEBPACK_IMPORTED_MODULE_0__["zeroPad"])(date.getDate(), 2)} ${Object(_common__WEBPACK_IMPORTED_MODULE_0__["zeroPad"])(date.getHours(), 2)}:${Object(_common__WEBPACK_IMPORTED_MODULE_0__["zeroPad"])(date.getMinutes(), 2)}`;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map