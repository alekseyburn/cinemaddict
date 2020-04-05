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

/***/ "./src/components/film-card.js":
/*!*************************************!*\
  !*** ./src/components/film-card.js ***!
  \*************************************/
/*! exports provided: getFilmCardMarkup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFilmCardMarkup", function() { return getFilmCardMarkup; });
const getFilmCardMarkup = () => {
  return (
    `<article class="film-card">
      <h3 class="film-card__title">The Dance of Life</h3>
      <p class="film-card__rating">8.3</p>
      <p class="film-card__info">
        <span class="film-card__year">1929</span>
        <span class="film-card__duration">1h 55m</span>
        <span class="film-card__genre">Musical</span>
      </p>
      <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
      <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
      <a class="film-card__comments">5 comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};


/***/ }),

/***/ "./src/components/films-list-extra.js":
/*!********************************************!*\
  !*** ./src/components/films-list-extra.js ***!
  \********************************************/
/*! exports provided: getFilmsListExtraMarkup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFilmsListExtraMarkup", function() { return getFilmsListExtraMarkup; });
const getFilmsListExtraMarkup = (title) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>
    
      <div class="films-list__container">
      </div>
    </section>`
  );
};


/***/ }),

/***/ "./src/components/films-list.js":
/*!**************************************!*\
  !*** ./src/components/films-list.js ***!
  \**************************************/
/*! exports provided: getFilmsListMarkup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFilmsListMarkup", function() { return getFilmsListMarkup; });
const getFilmsListMarkup = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
      </div>
    </section>`
  );
};


/***/ }),

/***/ "./src/components/films-main.js":
/*!**************************************!*\
  !*** ./src/components/films-main.js ***!
  \**************************************/
/*! exports provided: getFilmsMainMarkup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFilmsMainMarkup", function() { return getFilmsMainMarkup; });
const getFilmsMainMarkup = () => {
  return (
    `<section class="films"></section>`
  );
};


/***/ }),

/***/ "./src/components/load-more.js":
/*!*************************************!*\
  !*** ./src/components/load-more.js ***!
  \*************************************/
/*! exports provided: getLoadMoreButtonMarkup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLoadMoreButtonMarkup", function() { return getLoadMoreButtonMarkup; });
const getLoadMoreButtonMarkup = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};


/***/ }),

/***/ "./src/components/main-nav.js":
/*!************************************!*\
  !*** ./src/components/main-nav.js ***!
  \************************************/
/*! exports provided: getMainNavMarkup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMainNavMarkup", function() { return getMainNavMarkup; });
const getMainNavMarkup = () => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};


/***/ }),

/***/ "./src/components/profile.js":
/*!***********************************!*\
  !*** ./src/components/profile.js ***!
  \***********************************/
/*! exports provided: getProfileMarkup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProfileMarkup", function() { return getProfileMarkup; });
const getProfileMarkup = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">Movie Buff</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};


/***/ }),

/***/ "./src/components/sort.js":
/*!********************************!*\
  !*** ./src/components/sort.js ***!
  \********************************/
/*! exports provided: getSortMarkup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSortMarkup", function() { return getSortMarkup; });
const getSortMarkup = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};


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
/* harmony import */ var _components_main_nav__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/main-nav */ "./src/components/main-nav.js");
/* harmony import */ var _components_sort__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/sort */ "./src/components/sort.js");
/* harmony import */ var _components_films_main__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/films-main */ "./src/components/films-main.js");
/* harmony import */ var _components_films_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/films-list */ "./src/components/films-list.js");
/* harmony import */ var _components_films_list_extra__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/films-list-extra */ "./src/components/films-list-extra.js");
/* harmony import */ var _components_load_more__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/load-more */ "./src/components/load-more.js");
/* harmony import */ var _components_film_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/film-card */ "./src/components/film-card.js");









const CARDS_COUNT = 5;

const render = (parent, markup, place = `beforeend`) => {
  parent.insertAdjacentHTML(place, markup);
};

const header = document.querySelector(`.header`);
render(header, Object(_components_profile__WEBPACK_IMPORTED_MODULE_0__["getProfileMarkup"])());

const main = document.querySelector(`.main`);
render(main, Object(_components_main_nav__WEBPACK_IMPORTED_MODULE_1__["getMainNavMarkup"])());
render(main, Object(_components_sort__WEBPACK_IMPORTED_MODULE_2__["getSortMarkup"])());
render(main, Object(_components_films_main__WEBPACK_IMPORTED_MODULE_3__["getFilmsMainMarkup"])());

const filmsMain = document.querySelector(`.films`);
render(filmsMain, Object(_components_films_list__WEBPACK_IMPORTED_MODULE_4__["getFilmsListMarkup"])());
render(filmsMain, Object(_components_films_list_extra__WEBPACK_IMPORTED_MODULE_5__["getFilmsListExtraMarkup"])(`Top rated`));
render(filmsMain, Object(_components_films_list_extra__WEBPACK_IMPORTED_MODULE_5__["getFilmsListExtraMarkup"])(`Most commented`));

const filmsList = document.querySelector(`.films-list`);
render(filmsList, Object(_components_load_more__WEBPACK_IMPORTED_MODULE_6__["getLoadMoreButtonMarkup"])());

const filmsListContainer = document.querySelector(`.films-list__container`);
for (let i = 0; i < CARDS_COUNT; i++) {
  render(filmsListContainer, Object(_components_film_card__WEBPACK_IMPORTED_MODULE_7__["getFilmCardMarkup"])());
}

// Obviously temporary solution
const filmsExtraListsContainers = document.querySelectorAll(`.films-list--extra .films-list__container`);
for (let container of filmsExtraListsContainers) {
  render(container, Object(_components_film_card__WEBPACK_IMPORTED_MODULE_7__["getFilmCardMarkup"])());
  render(container, Object(_components_film_card__WEBPACK_IMPORTED_MODULE_7__["getFilmCardMarkup"])());
}


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map