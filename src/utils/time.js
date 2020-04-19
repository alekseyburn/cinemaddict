export const formatRuntime = (runtimeMinutes) => {
  const hours = Math.floor(runtimeMinutes / 60);
  const minutes = runtimeMinutes - hours * 60;
  return `${hours}h ${minutes}m`;
};
