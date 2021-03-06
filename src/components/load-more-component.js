import AbstractComponent from "./abstract-component";


const getLoadMoreButtonMarkup = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};


export default class LoadMoreButtonComponent extends AbstractComponent {
  getTemplate() {
    return getLoadMoreButtonMarkup();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
