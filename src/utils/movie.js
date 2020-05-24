import moment from 'moment';

export const getTotalDuration = (watchedMovies) => {
  const totalTimeMins = watchedMovies.reduce((total, {runtime}) => {
    return total + runtime;
  }, 0);

  const duration = moment.duration(totalTimeMins, `minutes`);
  const hours = duration.hours();
  const minutes = duration.minutes();

  return {hours, minutes};
};

export const getGenreFromWatched = (watchedMovies) => {
  if (watchedMovies.length === 0) {
    return [];
  }

  const countGenres = watchedMovies.reduce((prev, {genres}) => {
    for (const genre of genres) {
      if (!prev[genre]) {
        prev[genre] = 0;
      }

      prev[genre]++;
    }
    return prev;
  }, {});

  const genresList = Object.entries(countGenres);

  genresList.sort((a, b) => {
    return b[1] - a[1];
  });

  return Object.fromEntries(genresList);
};
