import { createProfileTemplate } from "./components/profile.js";
import {createMenuTemplate} from "./components/site-menu.js";
import {createSortingTemplate} from "./components/sorting.js";
import {createFilmTemplate} from "./components/film.js";
import {createLoadMoreButtonTemplate} from "./components/load-more-button.js";
import {createBoardTemplate} from "./components/board.js";
import {createFilmsExtraTemplate} from "./components/films-extra.js";
import {createFilmShortTemplate} from "./components/film-short.js";
import {createFilmPopupTemplate} from "./components/film-popup.js";
import {createStatisticTemplate} from "./components/site-statistic.js";

const FILM_COUNT = 5;
const FILM_EXTRA_COUNT = 2;

const FILM_EXTRA_COMMENTED_TITLE = "Most commented";
const FILM_EXTRA_RATED_TITLE = "Top rated";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, createProfileTemplate(), 'beforeend');

render(siteMainElement, createMenuTemplate(), 'beforeend');
render(siteMainElement, createSortingTemplate(), 'beforeend');

render(siteMainElement, createBoardTemplate(), 'beforeend');

const filmsElement = document.querySelector(`.films`);
const filmsListElement = filmsElement.querySelector(`.films-list__container`);

for (let i = 0; i < FILM_COUNT; i++) {
  render(filmsListElement, createFilmTemplate(), `beforeend`);
}

render(filmsElement, createLoadMoreButtonTemplate(), 'beforeend');

render(filmsElement, createFilmsExtraTemplate(FILM_EXTRA_RATED_TITLE), `beforeend`);
const filmsRatedElement = document.querySelector(`.films-list--extra:last-child`);
const filmsRatedContentElement = filmsRatedElement.querySelector(`.films-list__container`);
for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
  render(filmsRatedContentElement, createFilmShortTemplate(), `beforeend`);
}

render(filmsElement, createFilmsExtraTemplate(FILM_EXTRA_COMMENTED_TITLE), `beforeend`);
const filmsCommentedElement = document.querySelector(`.films-list--extra:last-child`);
const filmsCommentedContentElement = filmsCommentedElement.querySelector(`.films-list__container`);
for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
  render(filmsCommentedContentElement, createFilmShortTemplate(), `beforeend`);
}

render(siteFooterElement, createStatisticTemplate(), `beforeend`);
