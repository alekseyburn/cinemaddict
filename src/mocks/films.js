import {
  getRandomNumber,
  getShuffledArray,
  getRandomArrayItem,
  getRandomDate,
  getRandomFullName,
  generateArray,
} from '../utils/random';
import {COUNTRIES} from './common';
import {generateComment} from './comments';

const FILMS = [
  {
    name: `Made for Each Other`,
    poster: `made-for-each-other.png`,
  },
  {
    name: `Popeye the Sailor Meets Sindbad the Sailor`,
    poster: `popeye-meets-sinbad.png`,
  },
  {
    name: `Sagebrush Trail`,
    poster: `sagebrush-trail.jpg`,
  },
  {
    name: `Santa Claus Conquers the Martians`,
    poster: `santa-claus-conquers-the-martians.jpg`,
  },
  {
    name: `The Dance of Life`,
    poster: `the-dance-of-life.jpg`,
  },
  {
    name: `The Great Flamarion`,
    poster: `the-great-flamarion.jpg`,
  },
  {
    name: `The Man with the Golden Arm`,
    poster: `the-man-with-the-golden-arm.jpg`,
  },
];

const FILM_DESCRIPTIONS = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
  .split(`. `);

const FILM_GENRES = [
  `Action`,
  `Animation`,
  `Comedy`,
  `Crime`,
  `Drama`,
  `Experimental`,
  `Fantasy`,
  `Historical`,
  `Horror`,
  `Romance`,
  `Science`,
  `Thriller`,
  `Western`,
  `Other`,
];

const MPAA_RATING = [
  `G`,
  `PG`,
  `PG-13`,
  `R`,
  `NC-17`,
];


export const generateFilm = () => {
  const filmNumber = getRandomNumber(0, FILMS.length - 1);

  return {
    id: String(new Date() + Math.random()),
    actors: generateArray(getRandomFullName, getRandomNumber(3, 9)),
    comments: generateArray(generateComment, getRandomNumber(0, 5)),
    country: getRandomArrayItem(COUNTRIES),
    description: getShuffledArray(FILM_DESCRIPTIONS, getRandomNumber(1, 5))
    .join(`. `),
    director: getRandomFullName(),
    genres: getShuffledArray(FILM_GENRES, getRandomNumber(1, 3)),
    mpaaRating: getRandomArrayItem(MPAA_RATING),
    name: FILMS[filmNumber].name,
    poster: FILMS[filmNumber].poster,
    rating: getRandomNumber(10, 99) / 10,
    releaseDate: getRandomDate(new Date(1900, 0), new Date(Date.now())),
    runtime: getRandomNumber(45, 210),
    writers: generateArray(getRandomFullName, getRandomNumber(1, 3)),
  };
};
