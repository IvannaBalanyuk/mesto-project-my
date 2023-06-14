import { formSelectors } from './constants.js';

// Отрисовка сообщения о процессе загрузки
export const renderLoading = (isLoading, formElement, loadingValue, baseValue) => {
  const buttonElement = formElement.querySelector(formSelectors.submitButtonSelector);
  if(isLoading) {
    buttonElement.value = loadingValue;
  } else {
    buttonElement.value = baseValue;
  }
}
