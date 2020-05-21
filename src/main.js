// Import Api
import Api from './api';

// Import components
import ProfileComponent from "./components/profile.js";
import SiteStatisticComponent from "./components/site-statistic.js";
import BoardComponent from "./components/board.js";

// Import controllers
import PageController from "./controllers/page.js";
import FilterController from "./controllers/filter.js";

// Import models
import MoviesModel from "./models/movies.js";

// Import constants and utils
import {RenderPosition, render} from "./utils/render.js";

const AUTHORIZATION = `Basic 73uthf73ghf85674isop9guz`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

const api = new Api(END_POINT, AUTHORIZATION);

// Define Data
const moviesModel = new MoviesModel();

// Define containers
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

// Render

Promise.all([
  api.getMovies()
]).then((result) => {
  const [movies] = result;

  // Define Data
  moviesModel.setMovies(movies);

  // Render profile and static
  render(siteHeaderElement, new ProfileComponent(moviesModel), RenderPosition.BEFOREEND);
  render(siteFooterElement, new SiteStatisticComponent(movies.length), RenderPosition.BEFOREEND);


  const filterController = new FilterController(siteMainElement, moviesModel);
  filterController.render();

  const boardComponent = new BoardComponent();
  const boardController = new PageController(boardComponent, moviesModel);

  render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
  boardController.render();

});
