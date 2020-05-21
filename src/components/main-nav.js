import AbstractComponent from './abstract-component';

const getMainNavMarkup = () => {
  return (
    `<nav class="main-navigation">
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class MainNav extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return getMainNavMarkup();
  }
}
