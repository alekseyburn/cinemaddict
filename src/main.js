import ProfileComponent from './components/profile';
import PageController from './controllers/page-controller';
import {generateFilm} from './mocks/films';
import {generateArray} from './utils/random';

import {render} from './utils/dom';


const CARDS_COUNT = 18;


const headerElement = document.querySelector(`.header`);
render(headerElement, new ProfileComponent());
const mainElement = document.querySelector(`.main`);
const pageController = new PageController(mainElement);

const films = generateArray(generateFilm, CARDS_COUNT);

pageController.render(films);
