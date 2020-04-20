const getMainNavMarkup = (filters) => {
  const filtersMarkup = filters.map((filter, index) => {
    const {
      name,
      title,
      count,
    } = filter;

    const countMarkup = `<span class="main-navigation__item-count">${count}</span>`;
    const activeClass = index === 0 ? `main-navigation__item--active` : ``;

    return (
      `<a
        href="#${name}"
        class="main-navigation__item ${activeClass}"
      >
        ${title}
        ${count ? countMarkup : ``}
      </a>`
    );
  }).join(``);


  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default getMainNavMarkup;
