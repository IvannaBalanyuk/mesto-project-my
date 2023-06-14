export default class Section {
  constructor(containerSelector, noItemsHiddenClass, renderer) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
    this._noItemsHiddenClass = noItemsHiddenClass;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(items) {
    items.reverse().forEach((item) => {
      const element = this._renderer(item);
    });
  }

  renderNoItems() {
    if (!this._container.hasChildNodes()) {
      this._container.classList.remove(this._noItemsHiddenClass);
    };
  }
}
