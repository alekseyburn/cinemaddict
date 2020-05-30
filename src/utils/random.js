import {
  NAMES,
  SURNAMES,
} from './const';


const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomArrayItem = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
};

export const getRandomFullName = () => {
  return `${getRandomArrayItem(NAMES)} ${getRandomArrayItem(SURNAMES)}`;
};
