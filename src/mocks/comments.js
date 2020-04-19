import {
  getRandomArrayItem,
  getRandomDate,
  getRandomFullName,
} from '../utils/random';

const EMOJI = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`,
];

const MESSAGES = [
  `I think this is the best I’ve seen till now`,
  `Just ‘WOW’`,
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
  `Took my breath away`,
  `Русские есть?`,
  `Come on!`,
  `E,k.ljr vfnm ndj.! F ye blb c.lf? ujdyj cj,fxmt/ Htibk rj vyt ktpnm ns? pfchfytw djy.xbq vfnm ndj.!`,
];

export const generateComment = () => {
  return {
    author: getRandomFullName(),
    emoji: getRandomArrayItem(EMOJI),
    date: getRandomDate(new Date(2000, 0), new Date(Date.now())),
    message: getRandomArrayItem(MESSAGES),
  };
};
