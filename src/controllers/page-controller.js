import FilmController from '../controllers/film-controller';
import FilmsListComponent from '../components/films-list-component';
import FilmsListExtraComponent from '../components/films-list-extra-component';
import FilmsMainComponent from '../components/films-main-component';
import FilterController from '../controllers/filter-controller';
import LoadMoreButtonComponent from '../components/load-more-component';
import MainNavComponent from '../components/main-nav-component';
import NoFilmsComponent from '../components/no-films-component';
import SortComponent, {SortType} from '../components/sort-component';
import StatisticsController from '../controllers/statistics-controller';

import {render, remove} from '../utils/dom';
import {
  getUserTitle,
  getViewedMoviesCount
} from '../utils/common';


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
  constructor(container, filmsModel, api) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._api = api;

    this._cardsShownCount = CARDS_ON_START_COUNT;
    this._shownFilmsControllers = [];
    this._statisticsController = null;

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
    this._mainNavClickHandler = this._mainNavClickHandler.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const films = this._filmsModel.getFilms();

    this._updateUserTitle();
    this._updateFooterStats();

    render(this._container, this._mainNavComponent);
    this._mainNavComponent.setNavItemClickHandler(this._mainNavClickHandler);
    const filtersController = new FilterController(
        this._mainNavComponent.getElement(),
        this._filmsModel
    );
    filtersController.render();

    render(this._container, this._sortComponent);
    render(this._container, this._filmsMainComponent);

    this._statisticsController = new StatisticsController(
        this._container,
        this._filmsModel
    );
    this._statisticsController.render();
    this._statisticsController.hide();

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

  _renderFilms(filmsContainerElement, films) {
    const filmsControllers = films.map((film) => {
      const filmController = new FilmController(
          filmsContainerElement,
          this._onDataChange,
          this._onViewChange,
          this._api
      );
      filmController.render(film);
      return filmController;
    });

    this._shownFilmsControllers = this._shownFilmsControllers.concat(filmsControllers);
  }

  _removeFilms() {
    this._shownFilmsControllers.forEach((filmController) => filmController.destroy());
    this._shownFilmsControllers = [];
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

  _renderLoadMoreButton() {
    remove(this._loadMoreButtonComponent);

    if (this._cardsShownCount >= this._filmsModel.getFilms().length) {
      return;
    }

    render(this._filmsListComponent.getElement(), this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setClickHandler(this._onLoadMoreButtonClick);
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

  _onDataChange(filmController, oldData, newData, isUpdateFilms = true) {
    this._api.updateFilm(oldData.id, newData)
      .then((filmModel) => {
        const isSuccess = this._filmsModel.updateFilm(oldData.id, filmModel);
        if (isSuccess) {
          if (isUpdateFilms) {
            this._updateFilms(this._cardsShownCount);
            this._updateUserTitle();
          } else {
            filmController.setFilmData(this._filmsModel.getFilm(newData.id));
          }
        }
      })
      .catch(() => {
        filmController.shake();
      });
  }

  _onViewChange() {
    this._shownFilmsControllers
      .forEach((it) => it.setDefaultView());
  }

  _mainNavClickHandler(navItem) {
    if (navItem === `stats`) {
      this._statisticsController.show();
      this._sortComponent.hide();
      this._filmsMainComponent.hide();
    } else {
      this._statisticsController.hide();
      this._sortComponent.show();
      this._filmsMainComponent.show();
    }
  }

  _updateUserTitle() {
    const profileRatingElement = document
      .querySelector(`.profile__rating`);
    const viewedMoviesCount = getViewedMoviesCount(this._filmsModel.getAllFilms());
    profileRatingElement.innerHTML = getUserTitle(viewedMoviesCount);
  }

  _updateFooterStats() {
    const footerStatsElement = document
      .querySelector(`.footer__statistics`);
    footerStatsElement.innerHTML = `${this._filmsModel.getAllFilms().length} movies inside`;
  }
}
