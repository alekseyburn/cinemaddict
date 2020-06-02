import StatisticsComponent, {Range} from '../components/statistics-component';
import {render} from '../utils/dom';
import {
  getUserTitle,
  getViewedMoviesCount
} from '../utils/common';


export default class StatisticsController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._currentRange = Range.ALL_TIME.name;

    this._statisticsComponent = null;
    this._rerenderComponent = this._rerenderComponent.bind(this);
  }

  render() {
    this._statisticsComponent = new StatisticsComponent(
        this._filmsModel.getAllFilms(),
        this._currentRange,
        getUserTitle(getViewedMoviesCount(this._filmsModel.getAllFilms()))
    );
    render(this._container, this._statisticsComponent);
    this._statisticsComponent.setFilterClickHander((evt) => {
      this._currentRange = evt.target.value;
      this._rerenderComponent();
    });
  }

  show() {
    this._statisticsComponent.show();
    this._rerenderComponent();
  }

  hide() {
    this._statisticsComponent.hide();
  }

  _rerenderComponent() {
    this._statisticsComponent.rerender(
        this._filmsModel.getAllFilms(),
        this._currentRange,
        getUserTitle(getViewedMoviesCount(this._filmsModel.getAllFilms()))
    );
  }
}
