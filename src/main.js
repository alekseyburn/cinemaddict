import FilmsModel from './models/films-model';
import PageController from './controllers/page-controller';
import ProfileComponent from './components/profile-component';
import {generateFilm} from './mocks/films';
import {generateArray} from './utils/random';

import {render} from './utils/dom';


const CARDS_COUNT = 18;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const films = generateArray(generateFilm, CARDS_COUNT);
const filmsModel = new FilmsModel();
const pageController = new PageController(mainElement, filmsModel);

render(headerElement, new ProfileComponent());

filmsModel.setFilms(films);
pageController.render(films);
