import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
	constructor(
    popupSelector,
    popupSelectors,
    pageSelectors
    ) {
    super(popupSelector, popupSelectors, pageSelectors);
    this._caption = this._popup.querySelector(this._popupSelectors.captionSelector);
    this._image = this._popup.querySelector(this._popupSelectors.imageSelector);
	}

  open(name, link) {
    super.open();
    this._caption.textContent = name;
    this._image.src = link;
    this._image.alt = name;
  }
}
