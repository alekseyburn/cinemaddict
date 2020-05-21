import FilterComponent from '../components/filter';
import {FilterType, FilterTitle, getFilmsByFilter} from '../utils/filter';
import {render, replace} from '../utils/dom';

export default class FilterController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    // this._filmsModel.set
  }

  render() {
    const allFilms = this._filmsModel.getAllFilms();
    const filters = Object.values(FilterType)
      .map((filterType) => {
        return {
          name: filterType,
          title: FilterTitle[filterType.toUpperCase()],
          count: getFilmsByFilter(allFilms, filterType).length,
          isActive: filterType === this._activeFilterType,
        };
      });

    const oldComponent = this._filterComponent;
    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(this._container, this._filterComponent, `afterbegin`);
    }
  }

  _onDataChange() {
    this.render();
  }

  _onFilterChange(filterType) {
    this._activeFilterType = filterType;
  }
}
