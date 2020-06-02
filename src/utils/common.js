export const getUserTitle = (moviesViewed) => {
  if (moviesViewed < 1) {
    return ``;
  } else if (moviesViewed > 0 && moviesViewed < 11) {
    return `Novice`;
  } else if (moviesViewed > 10 && moviesViewed < 21) {
    return `Fan`;
  }

  return `Movie Buff`;
};

export const getViewedMoviesCount = (films) => {
  return films.reduce((acc, film) => {
    return film.isMarkedAsWatched ? acc + 1 : acc;
  }, 0);
};
