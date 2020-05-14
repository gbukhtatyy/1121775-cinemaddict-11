
export default class Movie {
  constructor(data) {
    this.id = data[`id`];

    this.title = data[`film_info`][`title`];
    this.alternativeTitle = data[`film_info`][`alternative_title`];
    this.description = data[`film_info`][`description`];
    this.poster = data[`film_info`][`poster`];

    this.genres = data[`film_info`][`genre`];
    this.ageRating = data[`film_info`][`age_rating`];
    this.runtime = data[`film_info`][`runtime`];
    this.totalRating = data[`film_info`][`total_rating`];

    this.director = data[`film_info`][`director`];
    this.writers = data[`film_info`][`writers`];
    this.actors = data[`film_info`][`actors`];

    this.releaseDate = new Date(data[`film_info`][`release`][`date`]);
    this.releaseCountry = data[`film_info`][`release`][`release_country`];

    this.isWatchlist = data[`user_details`][`watchlist`];
    this.isFavorite = data[`user_details`][`favorite`];
    this.isWatched = data[`user_details`][`already_watched`];
    this.watchingDate = data[`user_details`][`watching_date`];

    this.comments = data[`comments`];
  }

  toRAW() {
    return {
      'id': this.id
    };
  }

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie);
  }

  static clone(movie) {
    return new Movie(movie.toRAW());
  }
}
