export const render = (parent, component, place = `beforeend`) =>
  parent.insertAdjacentElement(place, component.getElement());

export const createElement = (markup) => {
  const container = document.createElement(`div`);
  container.innerHTML = markup;
  return container.firstChild;
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
