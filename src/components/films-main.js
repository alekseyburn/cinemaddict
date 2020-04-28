import AbstractComponent from "./absstract-component";

const getFilmsContainerMarkup = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class FilmsContainer extends AbstractComponent {
  getTemplate() {
    return getFilmsContainerMarkup();
  }
}
