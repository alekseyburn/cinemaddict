import moment from 'moment';

export const formatCommentDate = (date) => {
  return moment(date).format(`YYYY/MM/DD hh:mm`);
};


export const formatDDMonthYYYY = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};


export const formatRuntime = (runtimeMinutes) => {
  const duration = moment.duration(runtimeMinutes, `minutes`);
  const hours = duration.hours() ? `${duration.hours()}h` : ``;
  const minutes = `${duration.minutes()}m`;
  return `${hours} ${minutes}`;
};
