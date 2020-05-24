import AbstractComponent from "../abstract-component.js";

const createStatisticUserRankMarkup = (userData) => {
  const {userStatus} = userData;
  return (
    `<p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${userStatus}</span>
    </p>`
  );
};

export default class StatisticUserRank extends AbstractComponent {
  constructor(userData) {
    super();

    this._userData = userData;
  }

  getTemplate() {
    return createStatisticUserRankMarkup(this._userData);
  }
}
