import {createElement} from "../utils/dom";


const HIDDEN_CLASS = `visually-hidden`;
const SHAKE_ANIMATION_TIMEOUT = 600;


export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrety one.`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  hide() {
    if (this._element) {
      this._element.classList.add(HIDDEN_CLASS);
    }
  }

  show() {
    if (this._element) {
      this._element.classList.remove(HIDDEN_CLASS);
    }
  }

  shake() {
    if (this.getElement()) {
      this.getElement().classList.add(`shake`);

      setTimeout(() => {
        this.getElement().classList.remove(`shake`);
      }, SHAKE_ANIMATION_TIMEOUT);
    }
  }

  removeElement() {
    this._element = null;
  }
}
