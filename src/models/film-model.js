export default class FilmModel {
  constructor(data) {
    this.id = data[`id`];

    this.actors = data[`film_info`][`actors`];
    this.altName = data[`film_info`][`alternative_title`];
    this.ageRating = data[`film_info`][`age_rating`];
    this.comments = data[`comments`];
    this.country = data[`film_info`][`release`][`release_country`];
    this.description = data[`film_info`][`description`];
    this.director = data[`film_info`][`director`];
    this.genres = data[`film_info`][`genre`];
    this.name = data[`film_info`][`title`];
    this.poster = data[`film_info`][`poster`];
    this.rating = data[`film_info`][`total_rating`];
    this.releaseDate = new Date(data[`film_info`][`release`][`date`]);
    this.runtime = data[`film_info`][`runtime`];
    this.writers = data[`film_info`][`writers`];

    this.isAddedToWatchlist = data[`user_details`][`watchlist`];
    this.isFavorite = data[`user_details`][`favorite`];
    this.isMarkedAsWatched = data[`user_details`][`already_watched`];
    this.watchingDate = new Date(data[`user_details`][`watching_date`]);
  }

  toRAW() {
    return {
      "id": this.id,
      "comments": this.comments,
      "film_info": {
        "title": this.name,
        "alternative_title": this.altName,
        "total_rating": this.rating,
        "poster": this.poster,
        "age_rating": this.ageRating,
        "director": this.director,
        "writers": this.writers,
        "actors": this.actors,
        "release": {
          "date": this.releaseDate.toISOString(),
          "release_country": this.country,
        },
        "runtime": this.runtime,
        "genre": this.genres,
        "description": this.description,
      },
      "user_details": {
        "watchlist": this.isAddedToWatchlist,
        "already_watched": this.isMarkedAsWatched,
        "watching_date": this.watchingDate.toISOString(),
        "favorite": this.isFavorite
      }
    };
  }

  static parseFilm(film) {
    return new FilmModel(film);
  }

  static parseFilms(films) {
    return films.map(FilmModel.parseFilm);
  }

  static clone(film) {
    return new FilmModel(film.toRAW());
  }
}
