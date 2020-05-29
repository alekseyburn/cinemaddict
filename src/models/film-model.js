export default class FilmModel {
  constructor(data) {
    this.id = data[`id`];

    this.actors = data[`film_info`][`actors`];
    this.altName = data[`film_info`][`alternative_title`];
    this.ageRating = data[`film_info`][`age_rating`];
    this.comments = data[`comments`];
    this.comments = []; // temporary solution
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

  static parseFilm(data) {
    return new FilmModel(data);
  }

  static parseFilms(data) {
    return data.map(FilmModel.parseFilm);
  }
}
