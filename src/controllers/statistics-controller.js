import StatisticsComponent from '../components/statistics-component';
import {render} from '../utils/dom';


export default class StatisticsController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    // this._dateFrom = dateFrom;
    // this._dateTo = dateTo;

    this._statisticsComponent = null;
  }

  render() {
    this._statisticsComponent = new StatisticsComponent();
    render(this._container, this._statisticsComponent);
    this._statisticsComponent.setFilterClickHander((evt) => {
      console.log(evt.target.value);
    });
  }

  show() {
    this._statisticsComponent.show();
  }

  hide() {
    this._statisticsComponent.hide();
  }
}
