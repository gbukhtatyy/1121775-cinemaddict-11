import AbstractComponent from "../abstract-component.js";

const createListMarkup = () => {
  return (
    `<ul class="film-details__comments-list">comments</ul>`
  );
};

export default class List extends AbstractComponent {
  getTemplate() {
    return createListMarkup();
  }
}
