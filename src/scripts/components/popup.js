import {
  page,
  popupSelectors,
  buttonSelectors,
  pageSelectors,
 } from '../components/constants.js';


// Функция-обработчик события Escape для модального окна
  function closeByEscapeHandler(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = page.querySelector(popupSelectors.popupOpenedSelector);
      closePopup(openedPopup);
    };
  }

// Функция-обработчик события Click для модального окна
  function closeByClickHandler(evt) {
    if (evt.target.classList.contains(popupSelectors.popupClass) || evt.target.classList.contains(buttonSelectors.buttonCloseClass)) {
      closePopup(evt.target.closest(popupSelectors.popupSelector));
    };
  }

// Функция для открытия модального окна
  function openPopup(popup) {
    popup.classList.add(popupSelectors.popupOpenedClass);
    page.classList.add(pageSelectors.nonScrollClass);
    page.addEventListener('keydown', closeByEscapeHandler);
    page.addEventListener('click', closeByClickHandler);
  }

// Функция для закрытия модального окна
  function closePopup(popup) {
    popup.classList.remove(popupSelectors.popupOpenedClass);
    page.classList.remove(pageSelectors.nonScrollClass);
    page.removeEventListener('keydown', closeByEscapeHandler);
    page.removeEventListener('click', closeByClickHandler);
  }

  export {
    openPopup,
    closePopup,
  };
