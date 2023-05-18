import {
  formSelectors,
} from './constants.js';

import {
  makeButtonInactive,
  makeButtonActive,
  getInputList,
} from './utils.js';


// Показ сообщения об ошибке ввода
  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(formSelectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formSelectors.errorActiveClass);
  }

// Скрытие сообщения об ошибке ввода
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(formSelectors.inputErrorClass);
    errorElement.classList.remove(formSelectors.errorActiveClass);
    errorElement.textContent = '';
  }

// Проверка валидности поля ввода
  const checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  }

// Проверки формы на наличие невалидных полей
  const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

// Переключение состояния кнопки отправки формы
  const toggleButtonState = (inputList, formElement) => {
    if (hasInvalidInput(inputList)) {
      makeButtonInactive(formElement);
    } else {
      makeButtonActive(formElement);
    };
  }

// Добавление слушателя событий всем полям ввода
  const setEventListeners = (formElement) => {
    const inputList = getInputList(formElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, formElement);
      });
    });
  }

// Включение валидации всех форм
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(formSelectors.formSelector));

    formList.forEach(formElement => {
      formElement.addEventListener('submit', evt => {
        evt.preventDefault();
      });
      setEventListeners(formElement);
    });
  }


export {
  hideInputError,
  enableValidation,
}
