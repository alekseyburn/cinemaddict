import API from './api/index.js';
import FilmsModel from './models/films-model';
import PageController from './controllers/page-controller';
import ProfileComponent from './components/profile-component';

import {render} from './utils/dom';


const AUTHORIZATION = `Basic ${Math.random().toString(36).substring(2)}`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

const api = new API(END_POINT, AUTHORIZATION);
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const filmsModel = new FilmsModel();
const pageController = new PageController(mainElement, filmsModel, api);

render(headerElement, new ProfileComponent());


api.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    pageController.render(films);
  });
