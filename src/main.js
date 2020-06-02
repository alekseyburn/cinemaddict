import API from './api/api';
import FilmsModel from './models/films-model';
import PageController from './controllers/page-controller';
import ProfileComponent from './components/profile-component';
import {render} from './utils/dom';


const AUTHORIZATION = `Basic k5duwggfc7`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;


const api = new API(END_POINT, AUTHORIZATION);
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
mainElement.innerHTML = `<h2 class="films-list__title">Loading...</h2>`;
const filmsModel = new FilmsModel();
const pageController = new PageController(mainElement, filmsModel, api);


render(headerElement, new ProfileComponent());

api.getFilms()
  .then((films) => {
    mainElement.innerHTML = ``;
    filmsModel.setFilms(films);
    pageController.render(films);
  })
  .catch(() => {
    mainElement.innerHTML = ``;
    pageController.render([]);
  });
