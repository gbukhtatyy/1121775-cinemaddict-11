import AbstractComponent from "../abstract-component.js";

const createStatisticTextMarkup = (userData) => {
  const {watchedTotal, watchedDuration, watchedGenreTop} = userData;

  return (
    `<ul class="statistic__text-list">
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">${watchedTotal} <span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">${watchedDuration.hours} <span class="statistic__item-description">h</span> ${watchedDuration.minutes} <span class="statistic__item-description">m</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">${watchedGenreTop}</p>
    </li>
  </ul>`
  );
};

export default class StatisticText extends AbstractComponent {
  constructor(userData) {
    super();

    this._userData = userData;
  }

  getTemplate() {
    return createStatisticTextMarkup(this._userData);
  }
}
