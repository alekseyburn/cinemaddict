export const render = (parent, markup, place = `beforeend`) =>
  parent.insertAdjacentHTML(place, markup);
