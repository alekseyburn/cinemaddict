import FilmController from '../controllers/film-controller';
import FilmsMainComponent from '../components/films-main';
import FilmsListComponent from '../components/films-list';
import FilmsListExtraComponent from '../components/films-list-extra';
import LoadMoreButtonComponent from '../components/load-more';
import MainNavComponent from '../components/main-nav';
import NoFilmsComponent from '../components/no-films';
import SortComponent, {SortType} from '../components/sort';

import {filters} from '../mocks/filters';

import {render, remove} from '../utils/dom';


const CARDS_ON_START_COUNT = 5;
const CARDS_ON_CLICK_COUNT = 5;


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

    this._films = [];
    this._shownFilmsControllers = [];
    this._cardsShownCount = 0;

    this._noFilmsComponent = new NoFilmsComponent();
    this._mainNavComponent = new MainNavComponent(filters);
    this._sortComponent = new SortComponent();
    this._filmsMainComponent = new FilmsMainComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._filmsListContainer = null;
    this._loadMoreButtonComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(films) {
    this._films = films;

    render(this._container, this._mainNavComponent);
    render(this._container, this._sortComponent);
    render(this._container, this._filmsMainComponent);
    const filmsMainElement = this._filmsMainComponent.getElement();
    render(filmsMainElement, this._filmsListComponent);

    if (this._films.length === 0) {
      render(this._filmsListComponent.getElement(), this._noFilmsComponent);
      return;
    }

    render(filmsMainElement, new FilmsListExtraComponent(`Top rated`));
    render(filmsMainElement, new FilmsListExtraComponent(`Most commented`));

    this._filmsListContainer = filmsMainElement.querySelector(`.films-list__container`);
    this._cardsShownCount = CARDS_ON_START_COUNT;

    const initialFilmsControllers = this._renderFilms(
        this._filmsListContainer,
        this._films.slice(0, this._cardsShownCount),
        this._onDataChange,
        this._onViewChange
    );
    this._shownFilmsControllers = this._shownFilmsControllers.concat(initialFilmsControllers);

    this._renderLoadMoreButton();


    const filmsExtraListsContainers = filmsMainElement.querySelectorAll(`.films-list--extra .films-list__container`);
    const [topRatedContainer, mostCommentedContainer] = filmsExtraListsContainers;

    const filmsByRating = films.slice()
      .sort((filmA, filmB) => filmB.rating - filmA.rating);
    const filmsByRatingControllers = this._renderFilms(
        topRatedContainer,
        filmsByRating.slice(0, 2),
        this._onDataChange,
        this._onViewChange
    );
    this._shownFilmsControllers = this._shownFilmsControllers.concat(filmsByRatingControllers);

    const filmsByCommentsNumber = films.slice()
      .sort((filmA, filmB) => filmB.comments.length - filmA.comments.length);
    const filmsByCommentsNumberController = this._renderFilms(
        mostCommentedContainer,
        filmsByCommentsNumber.slice(0, 2),
        this._onDataChange,
        this._onViewChange
    );
    this._shownFilmsControllers = this._shownFilmsControllers.concat(filmsByCommentsNumberController);
  }

  _renderFilms(filmsContainerElement, films, onDataChange, onViewChange) {
    return films.map((film) => {
      const filmController = new FilmController(filmsContainerElement, onDataChange, onViewChange);
      filmController.render(film);
      return filmController;
    });
  }

  _renderLoadMoreButton() {
    if (this._cardsShownCount >= this._films.length) {
      return;
    }

    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    render(this._filmsListComponent.getElement(), this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevCardsShownCount = this._cardsShownCount;
      this._cardsShownCount += CARDS_ON_CLICK_COUNT;

      const sortedFilms = getSortedFilms(
          this._films,
          this._sortComponent.getSortType(),
          prevCardsShownCount,
          this._cardsShownCount
      );
      const newFilmsControllers = this._renderFilms(
          this._filmsListContainer,
          sortedFilms,
          this._onDataChange,
          this._onViewChange
      );
      this._shownFilmsControllers = this._shownFilmsControllers.concat(newFilmsControllers);

      if (this._cardsShownCount >= this._films.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }

  _onSortTypeChange(sortType) {
    this._cardsShownCount = CARDS_ON_START_COUNT;

    const sortedFilms = getSortedFilms(this._films, sortType, 0, this._cardsShownCount);
    this._filmsListContainer.innerHTML = ``;
    if (this._loadMoreButtonComponent) {
      remove(this._loadMoreButtonComponent);
    }
    const newFilmsControllers = this._renderFilms(
        this._filmsListContainer,
        sortedFilms,
        this._onDataChange,
        this._onViewChange
    );
    this._shownFilmsControllers = this._shownFilmsControllers.concat(newFilmsControllers);

    this._renderLoadMoreButton();
  }

  _onDataChange(filmController, oldData, newData) {
    const index = this._films.findIndex((film) => film === oldData);
    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));
    filmController.render(this._films[index]);
  }

  _onViewChange() {
    this._shownFilmsControllers
      .forEach((it) => it.setDefaultView());
  }
}
