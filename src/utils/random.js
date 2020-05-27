import {
  NAMES,
  SURNAMES,
} from '../mocks/common';

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomArrayItem = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
};

export const getShuffledArray = (array, numberOfElements) => {
  numberOfElements = numberOfElements || array.length;
  const arrayCopy = array.slice();
  return Array(numberOfElements)
    .fill(``)
    .map(() => arrayCopy.splice(getRandomNumber(0, arrayCopy.length - 1), 1));
};

export const getRandomDate = (minDate, maxDate) => {
  const randomUnixDate = getRandomNumber(minDate.valueOf(), maxDate.valueOf());
  return new Date(randomUnixDate);
};

export const getRandomFullName = () => {
  return `${getRandomArrayItem(NAMES)} ${getRandomArrayItem(SURNAMES)}`;
};

export const generateArray = (generationFunction, length) => {
  return Array(length)
    .fill(``)
    .map(generationFunction);
};
