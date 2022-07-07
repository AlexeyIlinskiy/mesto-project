export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
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