import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
	constructor(
    popupSelector,
    popupSelectors,
    pageSelectors,
    formSelectors,
    actionConfirmHandler
    ) {
    super(popupSelector, popupSelectors, pageSelectors);
		this._actionConfirmHandler = actionConfirmHandler;
		this._confirmButton = document.querySelector(formSelectors.confirmButtonSelector);
    this._handleClickConfirm = this._handleClickConfirm.bind(this);

	}

  getId(element) {
    this.element = element;
    this._id = element.id;
  }

  _handleClickConfirm(evt) {
    evt.preventDefault();
    this._actionConfirmHandler(this._id);
  }

  open() {
    super.open();
    this._confirmButton.addEventListener('click', this._handleClickConfirm);
  }

  close() {
    super.close();
    this._confirmButton.removeEventListener('click', this._handleClickConfirm);
  }
}
