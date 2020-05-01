import FilmCardComponent from './components/film-card';
import FilmPopupComponent from './components/film-popup';
import FilmsContainerComponent from './components/films-main';
import FilmsListComponent from './components/films-list';
import FilmsListExtraComponent from './components/films-list-extra';
import LoadMoreButtonComponent from './components/load-more';
import MainNavComponent from './components/main-nav';
import NoFilmsComponent from './components/no-films';
import ProfileComponent from './components/profile';
import SortComponent from './components/sort';

import {generateFilm} from './mocks/films';
import {filters} from './mocks/filters';

import {generateArray} from './utils/random';

import {render} from './utils/dom';


const CARDS_COUNT = 18;
const CARDS_ON_START_COUNT = 5;
const CARDS_ON_CLICK_COUNT = 5;


const renderFilmCard = (filmContainer, film) => {
  const showPopupHandler = () => {
    render(document.body, filmPopupComponent);
    document.addEventListener(`keydown`, escKeyHandler);
  };

  const escKeyHandler = (evt) => {
    if (evt.key === `Escape` || evt.key === `Ecs`) {
      filmPopupComponent.removeElement();
      document.removeEventListener(`keydown`, escKeyHandler);
    }
  };

  const filmCardComponent = new FilmCardComponent(film);
  const posterImage = filmCardComponent.getElement()
    .querySelector(`.film-card__poster`);
  const titleHeading = filmCardComponent.getElement()
    .querySelector(`.film-card__title`);
  const commentsLink = filmCardComponent.getElement()
    .querySelector(`.film-card__comments`);

  posterImage.addEventListener(`click`, showPopupHandler);
  titleHeading.addEventListener(`click`, showPopupHandler);
  commentsLink.addEventListener(`click`, showPopupHandler);

  const filmPopupComponent = new FilmPopupComponent(film);
  const popupCloseButton = filmPopupComponent.getElement()
    .querySelector(`.film-details__close-btn`);
  popupCloseButton.addEventListener(`click`, () => filmPopupComponent.removeElement());

  render(filmContainer, filmCardComponent);
};

const renderFilmsContainer = (filmsContainer, films) => {
  const filmsList = new FilmsListComponent();
  render(filmsContainer, filmsList);

  if (films.length === 0) {
    render(filmsList.getElement(), new NoFilmsComponent());
    return;
  }

  render(filmsContainer, new FilmsListExtraComponent(`Top rated`));
  render(filmsContainer, new FilmsListExtraComponent(`Most commented`));

  const loadMoreButtonComponent = new LoadMoreButtonComponent();
  render(filmsList.getElement(), loadMoreButtonComponent);


  const filmsListContainer = document.querySelector(`.films-list__container`);
  let cardsShownCount = CARDS_ON_START_COUNT;

  films.slice(0, cardsShownCount)
    .forEach((film) => renderFilmCard(filmsListContainer, film));

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
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
};


const header = document.querySelector(`.header`);
render(header, new ProfileComponent());
const main = document.querySelector(`.main`);
render(main, new MainNavComponent(filters));
render(main, new SortComponent());
const filmsMain = new FilmsContainerComponent();
render(main, filmsMain);

const films = generateArray(generateFilm, CARDS_COUNT);
renderFilmsContainer(filmsMain.getElement(), films);
