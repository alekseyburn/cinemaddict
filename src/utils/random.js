export const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const getRandomArrayItem = (array) => array[getRandomNumber(0, array.length - 1)];

export const getArrayOfRandomElements = (array, numberOfElements) => {
  const arrayCopy = array.slice();
  return Array(numberOfElements)
    .fill(``)
    .map(() => arrayCopy.splice(getRandomNumber(0, arrayCopy.length - 1), 1));
};
