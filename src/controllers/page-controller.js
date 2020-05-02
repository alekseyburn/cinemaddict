import FilmCardComponent from '../components/film-card';
import FilmPopupComponent from '../components/film-popup';
import FilmsContainerComponent from '../components/films-main';
import FilmsListComponent from '../components/films-list';
import FilmsListExtraComponent from '../components/films-list-extra';
import LoadMoreButtonComponent from '../components/load-more';
import MainNavComponent from '../components/main-nav';
import NoFilmsComponent from '../components/no-films';
import SortComponent, {SortType} from '../components/sort';

import {filters} from '../mocks/filters';

import {render} from '../utils/dom';


const CARDS_ON_START_COUNT = 5;
const CARDS_ON_CLICK_COUNT = 5;

const renderFilmCard = (filmContainer, film) => {
  const filmCardComponent = new FilmCardComponent(film);
  const filmPopupComponent = new FilmPopupComponent(film);

  const escKeyHandler = (evt) => {
    if (evt.key === `Escape` || evt.key === `Ecs`) {
      filmPopupComponent.removeElement();
      document.removeEventListener(`keydown`, escKeyHandler);
    }
  };

  filmCardComponent.setClickHandler(() => {
    render(document.body, filmPopupComponent);
    filmPopupComponent.setCloseButtonClickHandler(() => {
      filmPopupComponent.removeElement();
      document.removeEventListener(`keydown`, escKeyHandler);
    });
    document.addEventListener(`keydown`, escKeyHandler);
  });

  render(filmContainer, filmCardComponent);
};


const getSortedFilms = (films, sortType, from, to) => {
  const sortedFilms = films.slice();

  switch (sortType) {
    case SortType.DATE:
      sortedFilms.sort((a, b) => b.releaseDate - a.releaseDate);
      break;
    case SortType.RATING:
      sortedFilms.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.DEFAULT:
      break;
  }

  return sortedFilms.slice(from, to);
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._noFilmsComponent = new NoFilmsComponent();
    this._mainNavComponent = new MainNavComponent(filters);
    this._sortComponent = new SortComponent();
    this._filmsContainerComponent = new FilmsContainerComponent();
    this._filmsListComponent = new FilmsListComponent();
  }

  render(films) {
    const renderLoadMoreButton = () => {
      if (cardsShownCount >= films.length) {
        return;
      }

      loadMoreButtonComponent.setClickHandler(() => {
        const prevCardsShownCount = cardsShownCount;
        cardsShownCount += CARDS_ON_CLICK_COUNT;

        const sortedFilms = getSortedFilms(films, this._sortComponent.getSortType(), prevCardsShownCount, cardsShownCount);
        sortedFilms.forEach((film) => renderFilmCard(filmsListContainer, film));

        if (cardsShownCount >= films.length) {
          loadMoreButtonComponent.removeElement();
        }
      });
    };

    render(this._container, this._mainNavComponent);
    render(this._container, this._sortComponent);
    render(this._container, this._filmsContainerComponent);

    render(this._filmsContainerComponent.getElement(), this._filmsListComponent);

    if (films.length === 0) {
      render(this._filmsListComponent.getElement(), this._noFilmsComponent);
      return;
    }

    render(this._filmsContainerComponent.getElement(), new FilmsListExtraComponent(`Top rated`));
    render(this._filmsContainerComponent.getElement(), new FilmsListExtraComponent(`Most commented`));

    const loadMoreButtonComponent = new LoadMoreButtonComponent();
    render(this._filmsListComponent.getElement(), loadMoreButtonComponent);


    const filmsListContainer = document.querySelector(`.films-list__container`);
    let cardsShownCount = CARDS_ON_START_COUNT;

    films.slice(0, cardsShownCount)
      .forEach((film) => renderFilmCard(filmsListContainer, film));

    renderLoadMoreButton();

    const filmsExtraListsContainers = document.querySelectorAll(`.films-list--extra .films-list__container`);
    const [topRatedContainer, mostCommentedContainer] = filmsExtraListsContainers;

    const filmsByRating = films.slice()
      .sort((filmA, filmB) => filmB.rating - filmA.rating);
    renderFilmCard(topRatedContainer, filmsByRating[0]);
    renderFilmCard(topRatedContainer, filmsByRating[1]);

    const filmsByCommentsNumber = films.slice()
      .sort((filmA, filmB) => filmB.comments.length - filmA.comments.length);
    renderFilmCard(mostCommentedContainer, filmsByCommentsNumber[0]);
    renderFilmCard(mostCommentedContainer, filmsByCommentsNumber[1]);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      cardsShownCount = CARDS_ON_CLICK_COUNT;

      const sortedFilms = getSortedFilms(films, sortType, 0, cardsShownCount);
      filmsListContainer.innerHTML = ``;
      sortedFilms.forEach((film) => renderFilmCard(filmsListContainer, film));

      renderLoadMoreButton();
    });
  }
}
