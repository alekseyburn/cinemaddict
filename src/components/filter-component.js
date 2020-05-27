import AbstractComponent from './abstract-component';
import {FilterType} from '../utils/filter';


const getFiltersMarkup = (filters) => {
  const filtersMarkup = filters.map((filter) => {
    const {name, title, count, isActive} = filter;
    const countMarkup = name !== FilterType.ALL
      ? `<span class="main-navigation__item-count">${count}</span>`
      : ``;
    const activeClass = isActive ? `main-navigation__item--active` : ``;

    return (
      `<a
        href="#${name}"
        class="main-navigation__item ${activeClass}"
      >
        ${title}
        ${count ? countMarkup : ``}
      </a>`
    );
  }).join(``);

  return (
    `<div class="main-navigation__items">
      ${filtersMarkup}
    </div>`
  );
};


export default class FilterComponent extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return getFiltersMarkup(this._filters);
  }

  setFilterClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }
      const filterName = evt.target.getAttribute(`href`).substring(1);
      handler(filterName);
    });
  }
}
