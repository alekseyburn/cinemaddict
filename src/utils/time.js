import {
  capitalizeString,
  zeroPad,
} from './common';

const MONTHS = [
  `january`,
  `february`,
  `march`,
  `april`,
  `may`,
  `june`,
  `july`,
  `august`,
  `september`,
  `october`,
  `november`,
  `december`,
];

export const formatRuntime = (runtimeMinutes) => {
  const hours = Math.floor(runtimeMinutes / 60);
  const minutes = runtimeMinutes - hours * 60;
  return `${hours}h ${minutes}m`;
};

export const formatDDMonthYYYY = (date) => {
  const zeroPadDate = zeroPad(date.getDate(), 2);
  const month = capitalizeString(MONTHS[date.getMonth()]);
  return `${zeroPadDate} ${month} ${date.getFullYear()}`;
};

export const formatCommentDate = (date) =>
  `${date.getFullYear()}/${zeroPad(date.getMonth() + 1, 2)}/${zeroPad(date.getDate(), 2)}
  ${zeroPad(date.getHours(), 2)}:${zeroPad(date.getMinutes(), 2)}`;
