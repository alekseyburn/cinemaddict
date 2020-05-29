import AbstractComponent from './abstract-component';


const getMainNavMarkup = () => {
  return (
    `<nav class="main-navigation">
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};


export default class MainNav extends AbstractComponent {
  getTemplate() {
    return getMainNavMarkup();
  }

  setNavItemClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }
      const navItem = evt.target.getAttribute(`href`).substring(1);
      handler(navItem);
    });
  }
}
