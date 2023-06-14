export default class FormValidator {
  constructor(formSelectors, formElement) {
    this._formSelectors = formSelectors;
    this._form = formElement;
    this._submitButton = this._form.querySelector(this._formSelectors.submitButtonSelector);
  }

  _getInputList() {
    return Array.from(this._form.querySelectorAll(this._formSelectors.inputSelector));
  }

  // Показ сообщения об ошибке ввода
  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._formSelectors.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._formSelectors.errorActiveClass);
  }

  // Скрытие сообщения об ошибке ввода
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._formSelectors.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._formSelectors.errorActiveClass);
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
      this._submitButton.classList.add(this._formSelectors.inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    } else {
      this._submitButton.classList.remove(this._formSelectors.inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    };
  }

  // Включение валидации всех форм
  enableValidation() {
    this._inputList = this._getInputList();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList);
      });
    });
  }

  // Сброс сообщений об ошибке ввода при открытии окна
  resetValidation() {
    this._toggleButtonState(this._inputList);

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
