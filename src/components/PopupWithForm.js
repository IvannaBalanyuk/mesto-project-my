import {
  formSelectors,
} from './constants.js';

import Popup from './Popup.js';


export default class PopupWithForm extends Popup {
	constructor(selector, formSubmitHandler) {
    super(selector);
    this._formElement = this._popup.querySelector(formSelectors.formSelector);
    this._inputList = this._formElement.querySelectorAll(formSelectors.inputSelector);
		this.formSubmitHandler = formSubmitHandler;
	}

  getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return Object.values(this._inputValues);
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log(this.getInputValues());
      this.formSubmitHandler(this.getInputValues());
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}