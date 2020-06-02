import moment from 'moment';

export const formatCommentDate = (date) => {
  return moment(date).fromNow();
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
