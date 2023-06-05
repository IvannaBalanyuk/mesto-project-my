import {
  makeButtonInactive,
  makeButtonActive,
  getInputList,
} from './utils.js';

export default class FormValidator {
  constructor(selectors, formElement) {
    this._selectors = selectors;
    this._form = formElement;
  }

  // Показ сообщения об ошибке ввода
  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._selectors.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._selectors.errorActiveClass);
  }

  // Скрытие сообщения об ошибке ввода
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._selectors.inputErrorClass);
    errorElement.classList.remove(this._selectors.errorActiveClass);
    errorElement.textContent = '';
  }

  // Проверка валидности поля ввода
  _checkInputValidity(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Проверки формы на наличие невалидных полей
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Переключение состояния кнопки отправки формы
  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      makeButtonInactive(this._form);
    } else {
      makeButtonActive(this._form);
    };
  }

  // Включение валидации всех форм
  enableValidation() {
    this._inputList = getInputList(this._form);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList);
      });
    });
  }

  // Сброс сообщений об ошибке ввода при открытии окна
  resetFormErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
