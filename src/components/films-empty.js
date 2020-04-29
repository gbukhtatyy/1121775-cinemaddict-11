import AbstractComponent from "./abstract-component.js";

const createFilmsEmptyTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </div>`
  );
};

export default class FilmsEmpty extends AbstractComponent {
  getTemplate() {
    return createFilmsEmptyTemplate();
  }
}
