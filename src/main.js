// Import Api
import Api from './api';

// Import models
import MoviesModel from "./models/movies.js";
import UserModel from "./models/user.js";

// Import components
import ProfileComponent from "./components/profile.js";
import MoviesInsideComponent from "./components/movies-inside.js";
import PageComponent from "./components/page.js";

// Import controllers
import FilterController from "./controllers/filter.js";
import PageController from "./controllers/page.js";
import StatisticController from "./controllers/statistic.js";

// Import constants and utils
import {API_END_POINT, API_AUTHORIZATION, AppState} from "./const.js";
import {RenderPosition, render} from "./utils/render.js";
import SortController from './controllers/sort';

// Define constants
const PAGE_TITLE_OFFLINE = ` [offline]`;

// Define containers
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

// Define Api
const api = new Api(API_END_POINT, API_AUTHORIZATION);

// Define Data
const moviesModel = new MoviesModel();
const userModel = new UserModel(moviesModel);

// Define variables
let statisticIsHidden = true;

// Define components
const pageComponent = new PageComponent();

// Define controllers
const filterController = new FilterController(siteMainElement, moviesModel);
const sortController = new SortController(siteMainElement, moviesModel);

const pageController = new PageController(pageComponent, moviesModel);
const statisticController = new StatisticController(siteMainElement, moviesModel, userModel);

// Define switch functions
const showFilms = () => {
  if (statisticIsHidden) {
    return;
  }

  sortController.show();
  pageController.show();

  statisticController.hide();

  statisticIsHidden = true;
};

const showStatistic = () => {
  if (!statisticIsHidden) {
    return;
  }

  sortController.hide();
  pageController.hide();

  statisticController.show();

  statisticIsHidden = false;
};

// Set handlers
filterController.setFilterItemClickHandler(showFilms);
filterController.setStatisticClickHandler(showStatistic);

// Render components
render(siteHeaderElement, new ProfileComponent(moviesModel, userModel), RenderPosition.BEFOREEND);
render(siteFooterElement, new MoviesInsideComponent(moviesModel), RenderPosition.BEFOREEND);
render(siteMainElement, pageComponent, RenderPosition.BEFOREEND);

// Render controllers
sortController.render();
filterController.render();

pageController.render({state: AppState.LOADING});
statisticController.render();

// Hide statistic
statisticController.hide();

// Render
Promise.all([
  api.getMovies()
]).then((result) => {
  const [movies] = result;

  // Define Data
  moviesModel.setMovies(movies);

  pageController.render({state: AppState.DEFAULT});
}).catch((error) => {
  pageController.render({state: AppState.EMPTY});
  throw new Error(error);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(PAGE_TITLE_OFFLINE, ``);
});

window.addEventListener(`offline`, () => {
  document.title += PAGE_TITLE_OFFLINE;
});
