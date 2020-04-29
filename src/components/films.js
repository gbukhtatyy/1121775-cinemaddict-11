import AbstractComponent from "./abstract-component.js";

const createFilmsTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container"></div>
    </div>`
  );
};

export default class Films extends AbstractComponent {
  getTemplate() {
    return createFilmsTemplate();
  }
}
