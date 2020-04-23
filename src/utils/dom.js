export const render = (parent, element, plasce = `beforeend`) =>
  parent.insertAdjacentElement(plasce, element);

export const createElement = (markup) => {
  const container = document.createElement(`div`);
  container.innerHTML = markup;
  return container.firstChild;
};
