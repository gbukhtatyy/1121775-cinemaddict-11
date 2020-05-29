import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import AbstractComponent from "../abstract-component.js";
import {BAR_HEIGHT, CHART_OPTIONS} from "../../const.js";


const createStatisticChartMarkup = () => {
  return (
    `<div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>`
  );
};

export default class StatisticChart extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createStatisticChartMarkup();
  }

  renderChart(watchedGenres) {
    const canvasElement = this.getElement().querySelector(`.statistic__chart`);
    const labels = Object.keys(watchedGenres);
    const data = Object.values(watchedGenres);

    canvasElement.height = BAR_HEIGHT * labels.length;

    return new Chart(canvasElement, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`,
          barThickness: 24
        }]
      },
      options: CHART_OPTIONS
    });
  }
}
