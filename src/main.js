// Import components
import ProfileComponent from "./components/profile.js";
import SiteMenuComponent from "./components/site-menu.js";
import SiteStatisticComponent from "./components/site-statistic.js";
import BoardComponent from "./components/board.js";

// Import controllers
import BoardController from "./controllers/board.js";

// Import constants and utils
import {RenderPosition, render} from "./utils/render.js";

// Import mocks
import {generateFilms} from "./mock/film.js";

// Define constants
const FILM_COUNT = 17;
const STATISTIC_NUMBER = `123 456`;

// Define Data
const films = generateFilms(FILM_COUNT);

// Define containers
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

// Render
render(siteHeaderElement, new ProfileComponent(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenuComponent(), RenderPosition.BEFOREEND);
render(siteFooterElement, new SiteStatisticComponent(STATISTIC_NUMBER), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent);
render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
boardController.render(films);
