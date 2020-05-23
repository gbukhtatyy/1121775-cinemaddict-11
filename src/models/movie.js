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

    this.releaseDate = data[`film_info`][`release`][`date`];
    this.releaseCountry = data[`film_info`][`release`][`release_country`];

    this.isWatchlist = data[`user_details`][`watchlist`];
    this.isFavorite = data[`user_details`][`favorite`];
    this.isWatched = data[`user_details`][`already_watched`];
    this.watchingDate = data[`user_details`][`watching_date`];

    this.comments = data[`comments`];
  }

  toRAW() {
    return {
      'id': this.id,
      'film_info': {
        'title': this.title,
        'alternative_title': this.alternativeTitle,
        'description': this.description,
        'poster': this.poster,

        'genre': this.genres,
        'age_rating': this.ageRating,
        'runtime': this.runtime,
        'total_rating': this.totalRating,

        'director': this.director,
        'writers': this.writers,
        'actors': this.actors,

        'release': {
          'date': this.releaseDate,
          'release_country': this.releaseCountry
        }
      },
      'user_details': {
        'watchlist': this.isWatchlist,
        'favorite': this.isFavorite,
        'already_watched': this.isWatched,
        'watching_date': this.watchingDate
      },
      'comments': this.comments
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
