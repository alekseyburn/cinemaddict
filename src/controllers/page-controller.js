import FilmController from '../controllers/film-controller';
import FilterController from '../controllers/filter-controller';
import FilmsMainComponent from '../components/films-main-component';
import FilmsListComponent from '../components/films-list-component';
import FilmsListExtraComponent from '../components/films-list-extra-component';
import LoadMoreButtonComponent from '../components/load-more-component';
import MainNavComponent from '../components/main-nav-component';
import NoFilmsComponent from '../components/no-films-component';
import SortComponent, {SortType} from '../components/sort-component';

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
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._shownFilmsControllers = [];
    this._cardsShownCount = CARDS_ON_START_COUNT;

    this._noFilmsComponent = new NoFilmsComponent();
    this._mainNavComponent = new MainNavComponent();
    this._sortComponent = new SortComponent();
    this._filmsMainComponent = new FilmsMainComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._filmsListContainer = null;
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const films = this._filmsModel.getFilms();

    render(this._container, this._mainNavComponent);
    const filtersController = new FilterController(
        this._mainNavComponent.getElement(),
        this._filmsModel
    );
    filtersController.render();

    render(this._container, this._sortComponent);
    render(this._container, this._filmsMainComponent);
    const filmsMainElement = this._filmsMainComponent.getElement();
    render(filmsMainElement, this._filmsListComponent);

    if (films.length === 0) {
      render(this._filmsListComponent.getElement(), this._noFilmsComponent);
      return;
    }

    render(filmsMainElement, new FilmsListExtraComponent(`Top rated`));
    render(filmsMainElement, new FilmsListExtraComponent(`Most commented`));

    this._filmsListContainer = filmsMainElement.querySelector(`.films-list__container`);

    this._renderFilms(
        this._filmsListContainer,
        films.slice(0, this._cardsShownCount)
    );

    this._renderLoadMoreButton();

    this._renderExtraFilmLists();
  }

  _removeFilms() {
    this._shownFilmsControllers.forEach((filmController) => filmController.destroy());
    this._shownFilmsControllers = [];
  }

  _renderFilms(filmsContainerElement, films) {
    const filmsControllers = films.map((film) => {
      const filmController = new FilmController(
          filmsContainerElement,
          this._onDataChange,
          this._onViewChange
      );
      filmController.render(film);
      return filmController;
    });

    this._shownFilmsControllers = this._shownFilmsControllers.concat(filmsControllers);
  }

  _renderLoadMoreButton() {
    remove(this._loadMoreButtonComponent);

    if (this._cardsShownCount >= this._filmsModel.getFilms().length) {
      return;
    }

    render(this._filmsListComponent.getElement(), this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setClickHandler(this._onLoadMoreButtonClick);
  }

  _updateFilms(count) {
    this._removeFilms();
    const sortedFilms = getSortedFilms(
        this._filmsModel.getFilms(),
        this._sortComponent.getSortType(),
        0,
        count
    );
    this._renderFilms(
        this._filmsListContainer,
        sortedFilms
    );
    this._renderLoadMoreButton();
    this._renderExtraFilmLists();
  }

  _renderExtraFilmLists() {
    const filmsExtraListsContainers = this._filmsMainComponent.getElement()
      .querySelectorAll(`.films-list--extra .films-list__container`);
    const [topRatedContainer, mostCommentedContainer] = filmsExtraListsContainers;

    const filmsByRating = this._filmsModel.getAllFilms()
      .slice()
      .sort((filmA, filmB) => filmB.rating - filmA.rating);
    this._renderFilms(
        topRatedContainer,
        filmsByRating.slice(0, 2)
    );

    const filmsByCommentsNumber = this._filmsModel.getAllFilms()
      .slice()
      .sort((filmA, filmB) => filmB.comments.length - filmA.comments.length);
    this._renderFilms(
        mostCommentedContainer,
        filmsByCommentsNumber.slice(0, 2)
    );
  }

  _onSortTypeChange() {
    this._cardsShownCount = CARDS_ON_START_COUNT;
    this._updateFilms(CARDS_ON_START_COUNT);
  }

  _onLoadMoreButtonClick() {
    const prevCardsShownCount = this._cardsShownCount;
    this._cardsShownCount += CARDS_ON_CLICK_COUNT;

    const sortedFilms = getSortedFilms(
        this._filmsModel.getFilms(),
        this._sortComponent.getSortType(),
        prevCardsShownCount,
        this._cardsShownCount
    );
    this._renderFilms(
        this._filmsListContainer,
        sortedFilms
    );

    if (this._cardsShownCount >= this._filmsModel.getFilms().length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _onFilterChange() {
    this._cardsShownCount = CARDS_ON_START_COUNT;
    this._updateFilms(CARDS_ON_START_COUNT);
  }

  _onDataChange(filmController, oldData, newData) {
    const isSuccess = this._filmsModel.updateFilm(oldData.id, newData);
    if (isSuccess) {
      filmController.render(newData);
    }
  }

  _onViewChange() {
    this._shownFilmsControllers
      .forEach((it) => it.setDefaultView());
  }
}
