export const RenderPlace = {
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`,
};


export const createElement = (markup) => {
  const container = document.createElement(`div`);
  container.innerHTML = markup;
  return container.firstChild;
};


export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};


export const render = (parent, component, place = RenderPlace.BEFORE_END) =>
  parent.insertAdjacentElement(place, component.getElement());


export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  if (parentElement && newElement && oldElement) {
    parentElement.replaceChild(newElement, oldElement);
  }
};
