import ProfileComponent from './components/profile-component';
import PageController from './controllers/page-controller';
import FilmsModel from './models/films-model';
import {generateFilm} from './mocks/films';
import {generateArray} from './utils/random';

import {render} from './utils/dom';


const CARDS_COUNT = 18;


const headerElement = document.querySelector(`.header`);
render(headerElement, new ProfileComponent());

const mainElement = document.querySelector(`.main`);

const films = generateArray(generateFilm, CARDS_COUNT);
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const pageController = new PageController(mainElement, filmsModel);
pageController.render(films);
