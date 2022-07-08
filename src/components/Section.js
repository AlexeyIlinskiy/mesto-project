export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;
  }
   renderItems(data) {
    data.reverse().forEach((item) => {
      this._renderer(item);
    });
  }
   setItem(element) {
    this._container.prepend(element);
  }
 } 