import AbstractSmartComponent from './abstract-smart-component';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  getViewedMoviesCount
} from '../utils/common';
import moment from 'moment';

export const Range = {
  ALL_TIME: {
    name: `all-time`,
    title: `All time`,
  },
  TODAY: {
    name: `today`,
    title: `Today`,
  },
  WEEK: {
    name: `week`,
    title: `Week`,
  },
  MONTH: {
    name: `month`,
    title: `Month`,
  },
  YEAR: {
    name: `year`,
    title: `Year`,
  },
};

const getFiltersMarkup = (range) => {
  return Object.values(Range)
    .map((value) => {
      const {name, title} = value;
      const checkedMarkup = name === range ? `checked` : ``;

      return (
        `<input 
          type="radio"
          class="statistic__filters-input visually-hidden" name="statistic-filter"
          id="statistic-${name}"
          value="${name}"
          ${checkedMarkup}
        >
        <label 
          for="statistic-${name}" class="statistic__filters-label"
        >
          ${title}
        </label>`
      );
    }).join(``);
};


const getDurationMarkup = (films) => {
  const totalDuration = films.reduce((acc, film) => {
    return acc + film.runtime;
  }, 0);

  const duration = moment.duration(totalDuration, `minutes`);
  const hours = duration.hours() ? `${duration.hours()}h` : ``;
  const minutes = `${duration.minutes()}m`;

  return (
    `<p class="statistic__item-text">
      ${hours}
      <span class="statistic__item-description">h</span> 
      ${minutes}
      <span class="statistic__item-description">m</span>
    </p>`
  );
};


const getStatisticsMarkup = (films, range, userTitle) => {
  const filtersMarkup = getFiltersMarkup(range);
  const filmsWatched = getViewedMoviesCount(films);
  const durationMarkup = getDurationMarkup(films);

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${userTitle}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>
        ${filtersMarkup}
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${filmsWatched} <span class="statistic__item-description">movie${filmsWatched !== 1 ? `s` : ``}</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          ${durationMarkup}
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">Sci-Fi</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );
};

export default class StatisticsComponent extends AbstractSmartComponent {
  constructor(films, range, userTitle) {
    super();
    this._films = this._getFilmsInRange(films, range);
    this._range = range;
    this._userTitle = userTitle;

    this._filterClickHandler = null;
  }

  getTemplate() {
    return getStatisticsMarkup(this._films, this._range, this._userTitle);
  }

  recoveryListeners() {
    this.setFilterClickHander(this._filterClickHandler);
  }

  rerender(films, range, userTitle) {
    this._films = this._getFilmsInRange(films, range);
    this._range = range;
    this._userTitle = userTitle;

    super.rerender();
  }

  setFilterClickHander(handler) {
    this.getElement().querySelector(`.statistic__filters`)
      .addEventListener(`input`, handler);

    this._filterClickHandler = handler;
  }

  _renderChart() {
    const BAR_HEIGHT = 50;
    const statisticCtx = document.querySelector(`.statistic__chart`);

    // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
    statisticCtx.height = BAR_HEIGHT * 5;

    return new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: [`Sci-Fi`, `Animation`, `Fantasy`, `Comedy`, `TV Series`],
        datasets: [{
          data: [11, 8, 7, 4, 3],
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 24
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }

  _getFilmsInRange(films, range) {
    switch (range) {
      case Range.TODAY.name:
        return films.filter((film) => {
          return film.isMarkedAsWatched &&
            (film.watchingDate.getDate() === new Date(Date.now()).getDate());
        });
      case Range.WEEK.name:
      case Range.MONTH.name:
      case Range.YEAR.name:
        return films.filter((film) => {
          return film.isMarkedAsWatched
            && this._isDateInRange(film.watchingDate, range);
        });
      default:
        return films.filter((film) => film.isMarkedAsWatched);
    }
  }

  _isDateInRange(date, range) {
    return moment(date).isAfter(moment().subtract(1, `${range}s`));
  }
}
