import { buttonSelectors, formSelectors } from './constants.js';

// Отрисовка сообщения о процессе загрузки
export const renderLoading = (isLoading, formElement, loadingValue, baseValue) => {
  const buttonElement = formElement.querySelector(buttonSelectors.buttonSaveSelector);
  if(isLoading) {
    buttonElement.value = loadingValue;
  } else {
    buttonElement.value = baseValue;
  }
}

// Получение из DOM массива инпутов формы
export const getInputList = (formElement) => {
  return Array.from(formElement.querySelectorAll(formSelectors.inputSelector));
}

// Получение из DOM сабмита формы
export const getButtonElement = (formElement) => {
  return formElement.querySelector(formSelectors.submitButtonSelector);
}

// Перевод кнопки сабмит в неактивное состояние
export const makeButtonInactive = (formElement) => {
  const buttonElement = getButtonElement(formElement);
  buttonElement.classList.add(formSelectors.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}

// Перевод кнопки сабмит в активное состояние
export const makeButtonActive = (formElement) => {
  const buttonElement = getButtonElement(formElement);
  buttonElement.classList.remove(formSelectors.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}


