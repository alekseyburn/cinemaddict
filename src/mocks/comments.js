import {
  getRandomArrayItem,
  getRandomDate,
  getRandomFullName,
} from '../utils/random';


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


export const EMOJI = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`,
];


export const generateComment = () => {
  return {
    author: getRandomFullName(),
    date: getRandomDate(new Date(2000, 0), new Date(Date.now())),
    emoji: getRandomArrayItem(EMOJI),
    message: getRandomArrayItem(MESSAGES),
  };
};
