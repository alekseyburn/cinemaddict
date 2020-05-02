import AbstractComponent from './abstract-component';

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

export default class MainNav extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return getMainNavMarkup(this._filters);
  }
}
