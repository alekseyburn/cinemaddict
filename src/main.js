import getProfileMarkup from './components/profile';
import getMainNavMarkup from './components/main-nav';
import getSortMarkup from './components/sort';
import getFilmsMainMarkup from './components/films-main';
import getFilmsListMarkup from './components/films-list';
import getFilmsListExtraMarkup from './components/films-list-extra';
import getLoadMoreButtonMarkup from './components/load-more';
import getFilmCardMarkup from './components/film-card';
import getFilmPopup from './components/film-popup';

import {generateFilm} from './mocks/films';
import {filters} from './mocks/filters';

import {generateArray} from './utils/random';

import {render} from './utils/dom';

const CARDS_COUNT = 18;
const CARDS_ON_START_COUNT = 5;
const CARDS_ON_CLICK_COUNT = 5;


const films = generateArray(generateFilm, CARDS_COUNT);




const header = document.querySelector(`.header`);
render(header, getProfileMarkup());

const main = document.querySelector(`.main`);
render(main, getMainNavMarkup(filters));
render(main, getSortMarkup());
render(main, getFilmsMainMarkup());

const filmsMain = document.querySelector(`.films`);
render(filmsMain, getFilmsListMarkup());
render(filmsMain, getFilmsListExtraMarkup(`Top rated`));
render(filmsMain, getFilmsListExtraMarkup(`Most commented`));

const filmsList = document.querySelector(`.films-list`);
render(filmsList, getLoadMoreButtonMarkup());


const filmsListContainer = document.querySelector(`.films-list__container`);
let cardsShownCount = CARDS_ON_START_COUNT;

films.slice(0, cardsShownCount)
  .forEach((film) => render(filmsListContainer, getFilmCardMarkup(film), `beforeend`));

const loadMoreButton = document.querySelector(`.films-list__show-more`);
loadMoreButton.addEventListener(`click`, () => {
  const prevCardsShownCount = cardsShownCount;
  cardsShownCount += CARDS_ON_CLICK_COUNT;
  films.slice(prevCardsShownCount, cardsShownCount)
  .forEach((film) => render(filmsListContainer, getFilmCardMarkup(film), `beforeend`));

  if (cardsShownCount >= films.length) {
    loadMoreButton.remove();
  }
});


const filmsExtraListsContainers = document.querySelectorAll(`.films-list--extra .films-list__container`);
const [topRatedContainer, mostCommentedContainer] = Array.from(filmsExtraListsContainers);

const filmsByRating = films.slice()
  .sort((filmA, filmB) => filmB.rating.valueOf() - filmA.rating.valueOf());
render(topRatedContainer, getFilmCardMarkup(filmsByRating[0]), `beforeend`);
render(topRatedContainer, getFilmCardMarkup(filmsByRating[1]), `beforeend`);

const filmsByCommentsNumber = films.slice()
  .sort((filmA, filmB) => filmB.comments.length - filmA.comments.length);
render(mostCommentedContainer, getFilmCardMarkup(filmsByCommentsNumber[0]), `beforeend`);
render(mostCommentedContainer, getFilmCardMarkup(filmsByCommentsNumber[1]), `beforeend`);


// For testing purposes (temporary)
render(document.body, getFilmPopup(films[0]), `beforeend`);
const popup = document.querySelector(`.film-details`);
const popupCloseButton = document.querySelector(`.film-details__close-btn`);
popupCloseButton.addEventListener(`click`, () => popup.remove());
