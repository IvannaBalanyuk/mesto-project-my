import {
  formSelectors,
 } from '../components/constants.js';


// Функция для показа сообщения об ошибке ввода
  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(formSelectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formSelectors.errorActiveClass);
  }

// Функция для скрытия сообщения об ошибке ввода
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(formSelectors.inputErrorClass);
    errorElement.classList.remove(formSelectors.errorActiveClass);
    errorElement.textContent = '';
  }

// Функция для проверки валидности поля ввода
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  }

// Функция для проверки формы на наличие невалидного поля
  const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

// Функция для переключения состояния кнопки отправки формы (при наличии в форме хотя бы одного невалидного поля - кнопка не активна)
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(formSelectors.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(formSelectors.inactiveButtonClass);
    };
  }

// Функция для добавления слушателя событий для полей ввода
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(formSelectors.inputSelector));
    const buttonElement = formElement.querySelector(formSelectors.submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  }

// Функция для включения валидации всех форм страницы
  const enableValidation = (object) => {
    const formList = Array.from(document.querySelectorAll(object.formSelector));

    formList.forEach(formElement => {
      formElement.addEventListener('submit', evt => {
        evt.preventDefault();
      });
      setEventListeners(formElement);
    });
  }

  export { enableValidation };
