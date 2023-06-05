import {
  popupSelectors,
} from './constants.js';

import Popup from './Popup.js';


export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
    super(popupSelector);
    this._caption = this._popup.querySelector(popupSelectors.captionSelector);
    this._image = this._popup.querySelector(popupSelectors.imageSelector);
	}

  open(name, link) {
    super.open();
    this._caption.textContent = name;
    this._image.src = link;
    this._image.alt = name;
  }
}
