export default class Section {
  constructor(containerSelector, renderer, noItemsHiddenClass) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
    this._noItemsHiddenClass = noItemsHiddenClass;
  }

  addItem(item, position) {
    switch (position) {
      case 'append':
        this._container.append(item);
        break;
      case 'prepend':
        this._container.prepend(item);
        break;
    }
  }

  renderItems(itemsData) {
    itemsData.reverse().forEach((itemData) => {
      this._renderer(itemData);
    });
  }

  renderNoItems() {
    if (!this._container.hasChildNodes()) {
      this._container.classList.remove(this._noItemsHiddenClass);
    };
  }
}
