import AbstractComponent from "./abstract-component.js";
import {SITE_MENU_ITEMS, SITE_MENU_ADDITIONAL_ITEMS} from "../const.js";

const createSiteMenuCountMarkup = (count) => {
  return count > 0 ? `<span class="main-navigation__item-count">${count}</span>` : ``;
};

const createSiteMenuMarkup = (item, isActive) => {
  const {href, title, count} = item;

  const activeClass = isActive ? `main-navigation__item--active` : ``;
  const countMarkup = createSiteMenuCountMarkup(count);

  return (
    `<a href="${href}" class="main-navigation__item ${activeClass}">${title} ${countMarkup}</a>`
  );
};

const createSiteMenuAdditionalMarkup = (item, isActive) => {
  const {href, title} = item;

  const activeClass = isActive ? `main-navigation__item--active` : ``;

  return (
    `<a href="${href}" class="main-navigation__additional ${activeClass}">${title}</a>`
  );
};

const createMenuTemplate = (menuItems, menuAdditionalItems) => {
  const siteMenuMarkup = menuItems.map((it, i) => createSiteMenuMarkup(it, i === 1)).join(`\n`);

  const siteMenuAdditionalMarkup = menuAdditionalItems.map((it) => createSiteMenuAdditionalMarkup(it, false)).join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${siteMenuMarkup}
      </div>
      ${siteMenuAdditionalMarkup}
    </nav>`
  );
};

export default class SiteMenu extends AbstractComponent {
  constructor() {
    super();

    this._menuItems = SITE_MENU_ITEMS;
    this._additionalMenuItems = SITE_MENU_ADDITIONAL_ITEMS;
  }

  getTemplate() {
    return createMenuTemplate(this._menuItems, this._additionalMenuItems);
  }
}
