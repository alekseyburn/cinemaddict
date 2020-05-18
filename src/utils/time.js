import moment from 'moment';

// Применять тут moment не очень хорошая идея
// Сделано только изза требований задания
export const formatRuntime = (runtimeMinutes) => {
  const duration = moment.duration(runtimeMinutes, `minutes`);
  const hours = duration.hours() ? `${duration.hours()}h` : ``;
  const minutes = `${duration.minutes()}m`;
  return `${hours} ${minutes}`;
};

export const formatDDMonthYYYY = (date) => moment(date)
  .format(`DD MMMM YYYY`);

export const formatCommentDate = (date) => moment(date)
  .format(`YYYY/MM/DD hh:mm`);
