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
    this.watchingDate = new Date(data[`user_details`][`watching_date`]);

    this.comments = data[`comments`];
    this.commentsData = data[`comments_data`];
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
          'date': this.releaseDate ? this.releaseDate.toISOString() : null,
          'release_country': this.releaseCountry
        }
      },
      'user_details': {
        'watchlist': this.isWatchlist,
        'favorite': this.isFavorite,
        'already_watched': this.isWatched,
        'watching_date': this.watchedDate ? this.watchedDate.toISOString() : null
      },
      'comments': this.comments,
      'comments_data': this.commentsData
    };
  }

  static commentToRaw({id, author, text: comment, emoji: emotion, date}) {
    return {
      id,
      author,
      comment,
      emotion,
      date: date.toISOString()
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
