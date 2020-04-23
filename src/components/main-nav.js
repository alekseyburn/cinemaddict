import {createElement} from '../utils/dom';

const getMainNavMarkup = (filters) => {
  const filtersMarkup = filters.map(({name, title, count}, index) => {

    const countMarkup = `<span class="main-navigation__item-count">${count}</span>`;
    const activeClass = index === 0 ? `main-navigation__item--active` : ``;

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
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class MainNav {
  constructor(filters) {
    this._element = null;
    this._filters = filters;
  }

  getTemplate() {
    return getMainNavMarkup(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
