export const capitalizeString = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const zeroPad = (value, digits) =>
  (value + Math.pow(10, digits))
  .toString()
  .slice(1);
