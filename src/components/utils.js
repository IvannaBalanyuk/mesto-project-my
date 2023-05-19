import {
  page,
  pageSelectors,
  buttonSelectors,
  popupSelectors,
  formSelectors,
} from './constants.js';

 import { hideInputError } from './validate.js';


// Отрисовка сообщения о процессе загрузки
const renderLoading = (isLoading, formElement, loadingValue, baseValue) => {
  const buttonElement = formElement.querySelector(buttonSelectors.buttonSaveSelector);
  if(isLoading) {
    buttonElement.value = loadingValue;
  } else {
    buttonElement.value = baseValue;
  }
}

// Обработчик события Escape для модального окна
  const closeByEscapeHandler = (evt) => {
    if (evt.key === 'Escape') {
      closePopup(page.querySelector(popupSelectors.popupOpenedSelector));
    };
  }

// Обработчик события click для модального окна
  const closeByClickHandler = (evt) => {
    if (evt.target.classList.contains(popupSelectors.popupClass) ||
      evt.target.classList.contains(buttonSelectors.buttonCloseClass)) {
        closePopup(evt.target.closest(popupSelectors.popupSelector));
    };
  }

// Открытие модального окна
  const openPopup = (popupElement) => {
    popupElement.classList.add(popupSelectors.popupOpenedClass);
    page.classList.add(pageSelectors.nonScrollClass);
    page.addEventListener('keydown', closeByEscapeHandler);
    page.addEventListener('click', closeByClickHandler);
  }

// Закрытие модального окна
  const closePopup = (popupElement) => {
    popupElement.classList.remove(popupSelectors.popupOpenedClass);
    page.classList.remove(pageSelectors.nonScrollClass);
    page.removeEventListener('keydown', closeByEscapeHandler);
    page.removeEventListener('click', closeByClickHandler);
  }

// Получение из DOM массива инпутов формы
  const getInputList = (formElement) => {
    return Array.from(formElement.querySelectorAll(formSelectors.inputSelector));
  }

// Получение из DOM сабмита формы
  const getButtonElement = (formElement) => {
    return formElement.querySelector(formSelectors.submitButtonSelector);
  }

// Перевод кнопки сабмит в неактивное состояние
  const makeButtonInactive = (formElement) => {
    const buttonElement = getButtonElement(formElement);
    buttonElement.classList.add(formSelectors.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }

// Перевод кнопки сабмит в активное состояние
  const makeButtonActive = (formElement) => {
    const buttonElement = getButtonElement(formElement);
    buttonElement.classList.remove(formSelectors.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }

// Сброс сообщений об ошибке ввода
  const resetFormErrors = (formElement) => {
    const inputListElement = getInputList(formElement);
    inputListElement.forEach((inputElement) => {
      hideInputError(formElement, inputElement, formSelectors);
    });
  }


export {
  renderLoading,
  openPopup,
  closePopup,
  getInputList,
  makeButtonActive,
  makeButtonInactive,
  resetFormErrors,
}
