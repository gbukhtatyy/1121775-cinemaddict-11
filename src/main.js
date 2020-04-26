// Import components
import ProfileComponent from "./components/profile.js";
import SiteMenuComponent from "./components/site-menu.js";
import SortComponent from "./components/sort.js";
import BoardComponent from "./components/board.js";
import FilmComponent from "./components/film.js";
import FilmPopupComponent from "./components/film-popup.js";
import FilmsListExtraComponent from "./components/films-list-extra.js";
import LoadMoreButtonComponent from "./components/load-more-button.js";
import SiteStatisticComponent from "./components/site-statistic.js";

// Import conostants and utils
import {SITE_MENU_ITEMS, SITE_MENU_ADDITIONAL_ITEMS, SORT_ITEMS} from "./const.js";
import {RenderPosition, render, getRandomElementsArray} from "./utils.js";

// Import mocks
import {generateFilms} from "./mock/film.js";

// Define constants
const FILM_COUNT = 17;
const FILM_EXTRA_COUNT = 2;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const FILM_EXTRA_COMMENTED_TITLE = `Most commented`;
const FILM_EXTRA_RATED_TITLE = `Top rated`;
const STATISTIC_NUMBER = `123 456`;

// Define render functions
const renderFilm = (filmListElement, film) => {
  const openFilmPopup = () => {
    bodyElement.appendChild(filmPopupComponent.getElement());
  };
  const closeFilmPopup = () => {
    bodyElement.removeChild(filmPopupComponent.getElement());
  };

  const filmComponent = new FilmComponent(film);
  const filmPopupComponent = new FilmPopupComponent(film);

  const filmPoster = filmComponent.getElement().querySelector(`.film-card__poster`);
  const filmTitle = filmComponent.getElement().querySelector(`.film-card__title`);
  const filmComments = filmComponent.getElement().querySelector(`.film-card__comments`);
  filmPoster.addEventListener(`click`, openFilmPopup);
  filmTitle.addEventListener(`click`, openFilmPopup);
  filmComments.addEventListener(`click`, openFilmPopup);

  const buttonClosePopup = filmPopupComponent.getElement().querySelector(`.film-details__close-btn`);
  buttonClosePopup.addEventListener(`click`, closeFilmPopup);

  render(filmListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderFilmsListExtra = (containerElement, title, films) => {
  const filmsListExtraComponent = new FilmsListExtraComponent(title);
  render(containerElement, filmsListExtraComponent.getElement(), RenderPosition.BEFOREEND);

  const filmsContentElement = filmsListExtraComponent.getElement().querySelector(`.films-list__container`);
  films.forEach((film) => renderFilm(filmsContentElement, film));
};

const renderBoard = (boardComponent, films) => {
  const filmsElement = document.querySelector(`.films`);
  const filmsListElement = filmsElement.querySelector(`.films .films-list__container`);

  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

  films.slice(0, showingFilmsCount)
    .forEach((film) => {
      renderFilm(filmsListElement, film);
    });

  const loadMoreButtonComponent = new LoadMoreButtonComponent();
  render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    films.slice(prevTasksCount, showingFilmsCount)
      .forEach((task) => renderFilm(filmsListElement, task));

    if (showingFilmsCount >= films.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });

  renderFilmsListExtra(filmsElement, FILM_EXTRA_RATED_TITLE, getRandomElementsArray(films, FILM_EXTRA_COUNT));
  renderFilmsListExtra(filmsElement, FILM_EXTRA_COMMENTED_TITLE, getRandomElementsArray(films, FILM_EXTRA_COUNT));
};

// Define Data
const films = generateFilms(FILM_COUNT);

// Define containers
const bodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

// Render
render(siteHeaderElement, new ProfileComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenuComponent(SITE_MENU_ITEMS, SITE_MENU_ADDITIONAL_ITEMS).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortComponent(SORT_ITEMS).getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);
renderBoard(boardComponent, films);

render(siteFooterElement, new SiteStatisticComponent(STATISTIC_NUMBER).getElement(), RenderPosition.BEFOREEND);
