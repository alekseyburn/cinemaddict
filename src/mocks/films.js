import {getRandomNumber, getArrayOfRandomElements} from '../utils/random';

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

const FILM_DESCRIPTIONS = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(`. `);


const generateFilm = () => {
  const filmNumber = getRandomNumber(0, FILMS.length - 1);

  return {
    name: FILMS[filmNumber].name,
    poster: FILMS[filmNumber].poster,
    description: getArrayOfRandomElements(FILM_DESCRIPTIONS, getRandomNumber(1, 5)).join(`. `),
  };
};


export const generateFilms = (count) => {
  return Array(count)
    .fill(``)
    .map(generateFilm);
};
