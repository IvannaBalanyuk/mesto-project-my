import {
  page,
  pageSelectors,
  buttonSelectors,
  popupSelectors,
} from './constants.js';

export default class Popup {
  constructor(popupSelector)  {
    this._popup = page.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickClose = this._handleClickClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  _handleClickClose(evt) {
    if (evt.target === this._popup ||
      evt.target.classList.contains(buttonSelectors.buttonCloseClass)) {
        this.close();
    };
  }

  setEventListeners() {
    page.addEventListener('keydown', this._handleEscClose);
    page.addEventListener('click', this._handleClickClose);
  }

  open() {
    this._popup.classList.add(popupSelectors.popupOpenedClass);
    page.classList.add(pageSelectors.nonScrollClass);
    page.addEventListener('keydown', this._handleEscClose);
    page.addEventListener('click', this._handleClickClose);
  }

  close() {
    this._popup.classList.remove(popupSelectors.popupOpenedClass);
    page.classList.remove(pageSelectors.nonScrollClass);
    page.removeEventListener('keydown', this._handleEscClose);
    page.removeEventListener('click', this._handleClickClose);
  }
}