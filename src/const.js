// Api
export const API_END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;
export const API_AUTHORIZATION = `Basic 73uthf73ghf85674isop9guz`;

// App
export const AppState = {
  LOADING: `loading`,
  EMPTY: `empty`,
  DEFAULT: `default`
};

export const AppPageTitle = {
  LOADING: `Loading...`,
  EMPTY: `There are no movies in our database`,
  DEFAULT: `All movies. Upcoming`,
};

// Filters
export const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`
};

export const FilterLabels = {
  "all": `All movies`,
  "watchlist": `Watchlist`,
  "history": `History`,
  "favorites": `Favorites`,
};

// Sortings
export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `raiting`,
  COMMENTS: `comments`
};

// Statistic
export const StatisticFilterType = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`,
};

// Chart
export const BAR_HEIGHT = 50;
export const CHART_OPTIONS = {
  plugins: {
    datalabels: {
      font: {
        size: 20
      },
      color: `#ffffff`,
      anchor: `start`,
      align: `start`,
      offset: 40,
    }
  },
  scales: {
    yAxes: [{
      ticks: {
        fontColor: `#ffffff`,
        padding: 100,
        fontSize: 20
      },
      gridLines: {
        display: false,
        drawBorder: false
      }
    }],
    xAxes: [{
      ticks: {
        display: false,
        beginAtZero: true
      },
      gridLines: {
        display: false,
        drawBorder: false
      },
    }],
  },
  legend: {
    display: false
  },
  tooltips: {
    enabled: false
  }
};
