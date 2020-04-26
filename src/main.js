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


const renderFilmCard = (filmContainer, film) => {
  const showPopupHandler = () => {
    render(document.body, filmPopupElement);
    document.addEventListener(`keydown`, escKeyHandler);
  };

  const escKeyHandler = (evt) => {
    if (evt.key === `Escape` || evt.key === `Ecs`) {
      filmPopupElement.remove();
      document.removeEventListener(`keydown`, escKeyHandler);
    }
  };

  const filmCardElement = new FilmCardComponent(film).getElement();
  const posterImage = filmCardElement.querySelector(`.film-card__poster`);
  const titleHeading = filmCardElement.querySelector(`.film-card__title`);
  const commentsLink = filmCardElement.querySelector(`.film-card__comments`);

  posterImage.addEventListener(`click`, showPopupHandler);
  titleHeading.addEventListener(`click`, showPopupHandler);
  commentsLink.addEventListener(`click`, showPopupHandler);

  const filmPopupElement = new FilmPopupComponent(film).getElement();
  const popupCloseButton = filmPopupElement.querySelector(`.film-details__close-btn`);
  popupCloseButton.addEventListener(`click`, () => filmPopupElement.remove());

  render(filmContainer, filmCardElement);
};

const renderFilmsContainer = (filmsComponent, films) => {
  const filmsList = new FilmsListComponent().getElement();
  render(filmsMain, filmsList);
  render(filmsMain, new FilmsListExtraComponent(`Top rated`).getElement());
  render(filmsMain, new FilmsListExtraComponent(`Most commented`).getElement());

  const loadMoreButton = new LoadMoreButtonComponent().getElement();
  render(filmsList, loadMoreButton);


  const filmsListContainer = document.querySelector(`.films-list__container`);
  let cardsShownCount = CARDS_ON_START_COUNT;

  films.slice(0, cardsShownCount)
    .forEach((film) => renderFilmCard(filmsListContainer, film));

  loadMoreButton.addEventListener(`click`, () => {
    const prevCardsShownCount = cardsShownCount;
    cardsShownCount += CARDS_ON_CLICK_COUNT;
    films.slice(prevCardsShownCount, cardsShownCount)
      .forEach((film) => renderFilmCard(filmsListContainer, film));

    if (cardsShownCount >= films.length) {
      loadMoreButton.remove();
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
};


const header = document.querySelector(`.header`);
render(header, new ProfileComponent().getElement());
const main = document.querySelector(`.main`);
render(main, new MainNavComponent(filters).getElement());
render(main, new SortComponent().getElement());
const filmsMain = new FilmsContainerComponent().getElement();
render(main, filmsMain);

const films = generateArray(generateFilm, CARDS_COUNT);
renderFilmsContainer(filmsMain, films);
