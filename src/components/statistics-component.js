import AbstractSmartComponent from './abstract-smart-component';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getViewedMoviesCount} from '../utils/common';
import moment from 'moment';


const Range = {
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

const BAR_HEIGHT = 50;


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
  const hours = duration.hours();
  const minutes = duration.minutes();

  return (
    `<p class="statistic__item-text">
      ${hours}
      <span class="statistic__item-description">h</span> 
      ${minutes}
      <span class="statistic__item-description">m</span>
    </p>`
  );
};

const getSortedGenresCount = (films) => {
  if (films.length === 0) {
    return null;
  }

  const genresToCount = films
    .reduce((acc, film) => {
      return acc.concat(film.genres);
    }, [])
    .reduce((acc, genre) => {
      acc[genre] = (acc[genre] || 0) + 1;
      return acc;
    }, {});

  const sortedGenresCount = Object.keys(genresToCount)
    .map((key) => {
      return {
        genre: key,
        count: genresToCount[key],
      };
    })
    .sort((a, b) => {
      return b.count - a.count;
    });

  return sortedGenresCount;
};


const getStatisticsMarkup = (films, range, userTitle) => {
  const filtersMarkup = getFiltersMarkup(range);
  const filmsWatched = getViewedMoviesCount(films);
  const durationMarkup = getDurationMarkup(films);

  const sortedGenresCount = getSortedGenresCount(films);
  const topGenre = films.length > 0 ? sortedGenresCount[0].genre : ``;


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
          <p class="statistic__item-text">${topGenre}</p>
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

    if (this._films.length > 0) {
      this._renderChart(this._films);
    }
  }

  setFilterClickHander(handler) {
    this.getElement().querySelector(`.statistic__filters`)
      .addEventListener(`input`, handler);

    this._filterClickHandler = handler;
  }

  _renderChart(films) {
    const statisticCtx = document.querySelector(`.statistic__chart`);

    const sortedGenresCount = getSortedGenresCount(films);
    const genres = sortedGenresCount.map((it) => it.genre);
    const counts = sortedGenresCount.map((it) => it.count);

    statisticCtx.height = BAR_HEIGHT * sortedGenresCount.length;

    return new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: genres,
        datasets: [{
          data: counts,
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
            this._isToday(film.watchingDate);
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

  _isToday(date) {
    return moment().isSame(moment(date), `day`);
  }

  _isDateInRange(date, range) {
    return moment(date).isAfter(moment().subtract(1, `${range}s`));
  }
}

export {Range};
