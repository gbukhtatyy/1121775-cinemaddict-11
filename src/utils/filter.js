import {FilterType} from "../const.js";

export const getActiveMovies = (movies) => {
  return movies.filter((movie) => movie.id);
};

export const getMoviesInWatchlist = (movies) => {
  return movies.filter((movie) => movie.isHistory);
};

export const getHistoryMovies = (movies) => {
  return movies.filter((movie) => movie.isHistory);
};

export const getFavoriteTasks = (movies) => {
  return movies.filter((movie) => movie.isFavorite);
};

export const getMoviesByFilter = (movies, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return getActiveMovies(movies);
    case FilterType.WATCHLIST:
      return getMoviesInWatchlist(movies);
    case FilterType.HISTORY:
      return getHistoryMovies(movies);
    case FilterType.FAVORITES:
      return getFavoriteTasks(movies);
  }

  return movies;
};
