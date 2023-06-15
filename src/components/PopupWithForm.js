import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
	constructor(
    popupSelector,
    popupSelectors,
    pageSelectors,
    formSelectors,
    formSubmitHandler
    ) {
    super(popupSelector, popupSelectors, pageSelectors);
		this.formSubmitHandler = formSubmitHandler;
    this._formElement = this._popup.querySelector(formSelectors.formSelector);
    this._inputList = this._formElement.querySelectorAll(formSelectors.inputSelector);
    this._handleClickSubmit = this._handleClickSubmit.bind(this);
	}

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    console.log(this._inputValues);
    return this._inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  _handleClickSubmit(evt) {
    evt.preventDefault();
    this.formSubmitHandler(this._getInputValues());
  }

  open() {
    super.open();
    this._formElement.addEventListener('submit', this._handleClickSubmit);
  }

  close() {
    super.close();
    this._formElement.reset();
    this._formElement.removeEventListener('submit', this._handleClickSubmit);
  }
}
