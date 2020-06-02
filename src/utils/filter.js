export const FilterTitle = {
  ALL: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`,
};

export const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
};


export const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return films.slice();
    case FilterType.WATCHLIST:
      return films.filter((film) => film.isAddedToWatchlist);
    case FilterType.HISTORY:
      return films.filter((film) => film.isMarkedAsWatched);
    case FilterType.FAVORITES:
      return films.filter((film) => film.isFavorite);
  }

  return films;
};
