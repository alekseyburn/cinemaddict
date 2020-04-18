import {getRandomNumber} from '../utils/random';

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


const generateFilm = () => {
  const filmNumber = getRandomNumber(0, FILMS.length - 1);

  return {
    name: FILMS[filmNumber].name,
    poster: FILMS[filmNumber].poster,
  };
};


export const generateFilms = (count) => {
  return Array(count)
    .fill(``)
    .map(generateFilm);
};
