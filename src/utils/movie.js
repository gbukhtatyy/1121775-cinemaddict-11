import moment from 'moment';

const DESCRIPTION_MAX_LENGTH = 140;

export const generateRelativeDate = (date) => {
  if (!date) {
    return ``;
  }

  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  return moment(date).fromNow();
};

export const generateDescriptionMarkup = (description) => {
  if (description.length <= DESCRIPTION_MAX_LENGTH) {
    return description;
  }

  return description.substr(0, DESCRIPTION_MAX_LENGTH - 1) + `...`;
};

export const generateLengthMarkup = (totalMinutes) => {
  const duration = moment.duration(totalMinutes, `minutes`);

  return (`${duration.hours()}h ${duration.minutes()}m`);
};

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
