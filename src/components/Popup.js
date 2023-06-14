export default class Popup {
  constructor(popupSelector, popupSelectors, pageSelectors)  {
    this._popup = document.querySelector(popupSelector);
    this._popupSelectors = popupSelectors;
    this._pageSelectors = pageSelectors;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickClose = this._handleClickClose.bind(this);
    this._page = document.querySelector('.page');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  _handleClickClose(evt) {
    if (evt.target === this._popup ||
      evt.target.classList.contains(this._popupSelectors.buttonCloseClass)) {
        this.close();
    };
  }

  open() {
    this._popup.classList.add(this._popupSelectors.popupOpenedClass);
    this._page.classList.add(this._pageSelectors.nonScrollClass);
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this._handleClickClose);
  }

  close() {
    this._popup.classList.remove(this._popupSelectors.popupOpenedClass);
    this._page.classList.remove(this._pageSelectors.nonScrollClass);
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._handleClickClose);
  }
}
