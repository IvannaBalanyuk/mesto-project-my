import { page, buttonSelectors } from './constants.js';
import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
	constructor(popupSelector, actionConfirmHandler) {
    super(popupSelector);
		this._actionConfirmHandler = actionConfirmHandler;
		this._confirmButton = page.querySelector(buttonSelectors.buttonConfirmSelector);
	}

  getId(element) {
    this.element = element;
    this._id = element._id;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._actionConfirmHandler(this._id);
    });
  }
}