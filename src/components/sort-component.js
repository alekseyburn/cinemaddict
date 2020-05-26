import AbstractComponent from './abstract-component';


export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};


const getSortItemsMarkup = (currentSortType) => {
  let sortItemsMarkup = ``;
  for (const key of Object.keys(SortType)) {
    const activeSortClass = SortType[key] === currentSortType ? `sort__button--active` : ``;
    sortItemsMarkup += `<li>
      <a
        href="#"
        data-sort-type="${SortType[key]}"
        class="sort__button ${activeSortClass}"
      >Sort by ${SortType[key]}</a>
    </li>`;
  }

  return sortItemsMarkup;
};


const getSortMarkup = (currentSortType) => {
  return (
    `<ul class="sort">
      ${getSortItemsMarkup(currentSortType)}
    </ul>`
  );
};


export default class SortComponent extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return getSortMarkup(this._currentSortType);
  }

  getSortType() {
    return this._currentSortType;
  }

  redrawElement() {
    this.getElement().innerHTML = getSortItemsMarkup(this.getSortType());
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `A`) {
        const sortType = evt.target.dataset.sortType;

        if (this._currentSortType !== sortType) {
          this._currentSortType = sortType;
          this.redrawElement();
          handler();
        }
      }
    });
  }
}
