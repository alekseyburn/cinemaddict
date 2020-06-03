import API from './api/api';
import Provider from './api/provider';
import Store from './api/store';
import FilmsModel from './models/films-model';
import PageController from './controllers/page-controller';
import ProfileComponent from './components/profile-component';
import {render} from './utils/dom';


const AUTHORIZATION = `Basic k5duwggfc7`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;
const STORE_PREFIX = `taskmanager-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;


const api = new API(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
mainElement.innerHTML = `<h2 class="films-list__title">Loading...</h2>`;
const filmsModel = new FilmsModel();
const pageController = new PageController(mainElement, filmsModel, apiWithProvider);


render(headerElement, new ProfileComponent());

apiWithProvider.getFilms()
  .then((films) => {
    mainElement.innerHTML = ``;
    filmsModel.setFilms(films);
    pageController.render(films);
  })
  .catch(() => {
    mainElement.innerHTML = ``;
    pageController.render([]);
  });


window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);

  // apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
