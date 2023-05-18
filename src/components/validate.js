import {
  formSelectors,
} from './constants.js';

import {
  makeButtonInactive,
  makeButtonActive,
  getInputList,
} from './utils.js';


// Показ сообщения об ошибке ввода
  const showInputError = (formElement, inputElement, errorMessage, selectorsObj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(selectorsObj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectorsObj.errorActiveClass);
  }

// Скрытие сообщения об ошибке ввода
  const hideInputError = (formElement, inputElement, selectorsObj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(selectorsObj.inputErrorClass);
    errorElement.classList.remove(selectorsObj.errorActiveClass);
    errorElement.textContent = '';
  }

// Проверка валидности поля ввода
  const checkInputValidity = (formElement, inputElement, selectorsObj) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, selectorsObj);
    } else {
      hideInputError(formElement, inputElement, selectorsObj);
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
  const setEventListeners = (formElement, selectorsObj) => {
    const inputList = getInputList(formElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, selectorsObj);
        toggleButtonState(inputList, formElement);
      });
    });
  }

// Включение валидации всех форм
  const enableValidation = (selectorsObj) => {
    const formList = Array.from(document.querySelectorAll(selectorsObj.formSelector));

    formList.forEach(formElement => {
      formElement.addEventListener('submit', evt => {
        evt.preventDefault();
      });
      setEventListeners(formElement, selectorsObj);
    });
  }


export {
  hideInputError,
  enableValidation,
}
