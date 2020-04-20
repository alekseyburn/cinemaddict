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
import {generateArray} from './utils/random';

// import {render}

const CARDS_COUNT = 18;
const CARDS_ON_START_COUNT = 5;
const CARDS_ON_CLICK_COUNT = 5;


const films = generateArray(generateFilm, CARDS_COUNT);


const render = (parent, markup, place = `beforeend`) => {
  parent.insertAdjacentHTML(place, markup);
};

const header = document.querySelector(`.header`);
render(header, getProfileMarkup());

const main = document.querySelector(`.main`);
render(main, getMainNavMarkup());
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


// Obviously temporary solution
const filmsExtraListsContainers = document.querySelectorAll(`.films-list--extra .films-list__container`);
for (let container of filmsExtraListsContainers) {
  render(container, getFilmCardMarkup(films[0]));
  render(container, getFilmCardMarkup(films[1]));
}

// For testing purposes (temporary)
render(document.body, getFilmPopup(films[0]), `beforeend`);
