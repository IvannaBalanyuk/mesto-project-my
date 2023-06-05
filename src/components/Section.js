import { page } from './constants.js';

export default class Section {
  constructor(containerSelector, noItemsHiddenClass, renderer)  {
    this._container = page.querySelector(containerSelector);
    this._renderer = renderer;
    this._noItemsHiddenClass = noItemsHiddenClass;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(items) {
    items.reverse().forEach((item) => {
      const element = this._renderer(item);
      this.addItem(element);
    });
  }

  renderNoItems() {
    if (!this._container.hasChildNodes()) {
      this._container.classList.remove(this._noItemsHiddenClass);
    };
  }
}