import getProfileMarkup from './components/profile';
import getMainNavMarkup from './components/main-nav';
import getSortMarkup from './components/sort';
import getFilmsMainMarkup from './components/films-main';
import getFilmsListMarkup from './components/films-list';
import getFilmsListExtraMarkup from './components/films-list-extra';
import getLoadMoreButtonMarkup from './components/load-more';
import getFilmCardMarkup from './components/film-card';

import {generateFilms} from './mocks/films';

// import {render}

const CARDS_COUNT = 18;
const films = generateFilms(CARDS_COUNT);


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
for (let i = 0; i < CARDS_COUNT; i++) {
  render(filmsListContainer, getFilmCardMarkup(films[i]));
}

// Obviously temporary solution
const filmsExtraListsContainers = document.querySelectorAll(`.films-list--extra .films-list__container`);
for (let container of filmsExtraListsContainers) {
  render(container, getFilmCardMarkup(films[0]));
  render(container, getFilmCardMarkup(films[1]));
}
