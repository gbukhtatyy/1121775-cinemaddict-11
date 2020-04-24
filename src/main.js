import {createProfileTemplate} from "./components/profile.js";
import {createMenuTemplate} from "./components/site-menu.js";
import {createSortingTemplate} from "./components/sorting.js";
import {createFilmTemplate} from "./components/film.js";
import {createLoadMoreButtonTemplate} from "./components/load-more-button.js";
import {createBoardTemplate} from "./components/board.js";
import {createFilmsExtraTemplate} from "./components/films-extra.js";
import {createFilmShortTemplate} from "./components/film-short.js";
import {createFilmPopupTemplate} from "./components/film-popup.js";
import {createStatisticTemplate} from "./components/site-statistic.js";

import {SORTINGS, SITE_MENU_ITEMS, SITE_MENU_ADDITIONAL_ITEMS} from "./const.js";
import {getRandomElementArray, getRandomElementsArray} from "./utils.js";

import {generateFilms} from "./mock/film.js";

const FILM_COUNT = 22;
const FILM_EXTRA_COUNT = 2;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const FILM_EXTRA_COMMENTED_TITLE = `Most commented`;
const FILM_EXTRA_RATED_TITLE = `Top rated`;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const films = generateFilms(FILM_COUNT);

let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, createProfileTemplate(), `beforeend`);

render(siteMainElement, createMenuTemplate(SITE_MENU_ITEMS, SITE_MENU_ADDITIONAL_ITEMS), `beforeend`);
render(siteMainElement, createSortingTemplate(SORTINGS), `beforeend`);

render(siteMainElement, createBoardTemplate(), `beforeend`);

const filmsElement = document.querySelector(`.films`);
const filmsListElement = filmsElement.querySelector(`.films-list__container`);

films.slice(0, showingFilmsCount)
    .forEach((film) => render(filmsListElement, createFilmTemplate(film), `beforeend`));

render(filmsElement, createLoadMoreButtonTemplate(), `beforeend`);

const loadMoreButton = document.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

  films.slice(prevTasksCount, showingFilmsCount)
    .forEach((film) => render(filmsListElement, createFilmTemplate(film), `beforeend`));
});

render(filmsElement, createFilmsExtraTemplate(FILM_EXTRA_RATED_TITLE), `beforeend`);
const filmsRatedElement = document.querySelector(`.films-list--extra:last-child`);
const filmsRatedContentElement = filmsRatedElement.querySelector(`.films-list__container`);
getRandomElementsArray(films, FILM_EXTRA_COUNT)
.forEach((film) => render(filmsRatedContentElement, createFilmShortTemplate(film), `beforeend`));

render(filmsElement, createFilmsExtraTemplate(FILM_EXTRA_COMMENTED_TITLE), `beforeend`);
const filmsCommentedElement = document.querySelector(`.films-list--extra:last-child`);
const filmsCommentedContentElement = filmsCommentedElement.querySelector(`.films-list__container`);
getRandomElementsArray(films, FILM_EXTRA_COUNT)
.forEach((film) => render(filmsCommentedContentElement, createFilmShortTemplate(film), `beforeend`));

render(siteFooterElement, createStatisticTemplate(), `beforeend`);

// render(siteFooterElement, createFilmPopupTemplate(getRandomElementArray(films)), `afterend`);
