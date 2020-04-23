import ProfileComponent from './components/profile';
import MainNavComponent from './components/main-nav';
import SortComponent from './components/sort';
import FilmsContainerComponent from './components/films-main';
import FilmsListComponent from './components/films-list';
import FilmsListExtraComponent from './components/films-list-extra';
import LoadMoreButtonComponent from './components/load-more';
import FilmCardComponent from './components/film-card';
import FilmPopupComponent from './components/film-popup';

import {generateFilm} from './mocks/films';
import {filters} from './mocks/filters';

import {generateArray} from './utils/random';

import {render} from './utils/dom';


const CARDS_COUNT = 18;
const CARDS_ON_START_COUNT = 5;
const CARDS_ON_CLICK_COUNT = 5;


const films = generateArray(generateFilm, CARDS_COUNT);


const header = document.querySelector(`.header`);
render(header, new ProfileComponent().getElement());

const main = document.querySelector(`.main`);
render(main, new MainNavComponent(filters).getElement());
render(main, new SortComponent().getElement());
const filmsMain = new FilmsContainerComponent().getElement();
render(main, filmsMain);

const filmsList = new FilmsListComponent().getElement();
render(filmsMain, filmsList);
render(filmsMain, new FilmsListExtraComponent(`Top rated`).getElement());
render(filmsMain, new FilmsListExtraComponent(`Most commented`).getElement());

const loadMoreButton = new LoadMoreButtonComponent().getElement();
render(filmsList, loadMoreButton);


const filmsListContainer = document.querySelector(`.films-list__container`);
let cardsShownCount = CARDS_ON_START_COUNT;

films.slice(0, cardsShownCount)
  .forEach((film) => render(filmsListContainer, new FilmCardComponent(film).getElement()));

loadMoreButton.addEventListener(`click`, () => {
  const prevCardsShownCount = cardsShownCount;
  cardsShownCount += CARDS_ON_CLICK_COUNT;
  films.slice(prevCardsShownCount, cardsShownCount)
    .forEach((film) => render(filmsListContainer, new FilmCardComponent(film).getElement()));

  if (cardsShownCount >= films.length) {
    loadMoreButton.remove();
  }
});


const filmsExtraListsContainers = document.querySelectorAll(`.films-list--extra .films-list__container`);
const [topRatedContainer, mostCommentedContainer] = Array.from(filmsExtraListsContainers);

const filmsByRating = films.slice()
  .sort((filmA, filmB) => filmB.rating.valueOf() - filmA.rating.valueOf());
render(topRatedContainer, new FilmCardComponent(filmsByRating[0]).getElement());
render(topRatedContainer, new FilmCardComponent(filmsByRating[1]).getElement());

const filmsByCommentsNumber = films.slice()
  .sort((filmA, filmB) => filmB.comments.length - filmA.comments.length);
render(mostCommentedContainer, new FilmCardComponent(filmsByCommentsNumber[0]).getElement());
render(mostCommentedContainer, new FilmCardComponent(filmsByCommentsNumber[1]).getElement());


// For testing purposes (temporary)
render(document.body, new FilmPopupComponent(films[0]).getElement());
const popup = document.querySelector(`.film-details`);
const popupCloseButton = document.querySelector(`.film-details__close-btn`);
popupCloseButton.addEventListener(`click`, () => popup.remove());
