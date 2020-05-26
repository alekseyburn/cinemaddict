import AbstractComponent from "./abstract-component";


const getFilmsContainerMarkup = () => {
  return (
    `<section class="films"></section>`
  );
};


export default class FilmsMainComponent extends AbstractComponent {
  getTemplate() {
    return getFilmsContainerMarkup();
  }
}
