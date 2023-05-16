// Функция для показа сообщения об ошибке ввода
  const showInputError = (formElement, inputElement, errorMessage, formObject) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(formObject.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formObject.errorActiveClass);
  }

// Функция для скрытия сообщения об ошибке ввода
  const hideInputError = (formElement, inputElement, formObject) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(formObject.inputErrorClass);
    errorElement.classList.remove(formObject.errorActiveClass);
    errorElement.textContent = '';
  }

// Функция для проверки валидности поля ввода
  const checkInputValidity = (formElement, inputElement, formObject) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, formObject);
    } else {
      hideInputError(formElement, inputElement, formObject);
    }
  }

// Функция для проверки формы на наличие невалидного поля
  const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

// Функция перевода кнопки сабмит в неактивное состояние
  const makeButtonInactive = (buttonElement, formObject) => {
    buttonElement.classList.add(formObject.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }

// Функция перевода кнопки сабмит в активное состояние
  const makeButtonActive = (buttonElement, formObject) => {
    buttonElement.classList.remove(formObject.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }

// Функция для переключения состояния кнопки отправки формы (при наличии в форме хотя бы одного невалидного поля - кнопка не активна)
  const toggleButtonState = (inputList, buttonElement, formObject) => {
    if (hasInvalidInput(inputList)) {
      makeButtonInactive(buttonElement, formObject);
    } else {
      makeButtonActive(buttonElement, formObject);
    };
  }

// Функция для добавления слушателя событий для полей ввода
  const setEventListeners = (formElement, formObject) => {
    const inputList = Array.from(formElement.querySelectorAll(formObject.inputSelector));
    const buttonElement = formElement.querySelector(formObject.submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, formObject);
        toggleButtonState(inputList, buttonElement, formObject);
      });
    });
  }

// Функция для включения валидации всех форм страницы
  const enableValidation = (formObject) => {
    const formList = Array.from(document.querySelectorAll(formObject.formSelector));

    formList.forEach(formElement => {
      formElement.addEventListener('submit', evt => {
        evt.preventDefault();
      });
      setEventListeners(formElement, formObject);
    });
  }

  export { hideInputError, makeButtonInactive, makeButtonActive, enableValidation };
