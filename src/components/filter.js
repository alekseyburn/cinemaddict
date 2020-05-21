import AbstractComponent from './abstract-component';

const getFiltersMarkup = (filters) => {
  const filtersMarkup = filters.map(({name, title, count, isActive}) => {
    const countMarkup = `<span class="main-navigation__item-count">${count}</span>`;
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

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }

      const filterName = evt.target.href.substring(1);
      handler(filterName);
    });
  }
}
