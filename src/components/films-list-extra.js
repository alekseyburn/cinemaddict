import {createElement} from '../utils/dom';

const getFilmsListExtraMarkup = (title) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>
    
      <div class="films-list__container">
      </div>
    </section>`
  );
};

export default class FilmsListExtra {
  constructor(title) {
    this._element = null;
    this._title = title;
  }

  getTemplate() {
    return getFilmsListExtraMarkup(this._title);
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