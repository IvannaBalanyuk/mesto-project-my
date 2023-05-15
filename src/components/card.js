import {
  buttonSelectors,
  noCardsElement,
  popupAddCard,
  cardsContainer,
  cardSelectors,
  cardTemplate,
  formNames,
  formInputPlaceName,
  formInputImageLink,
 } from './constants.js';

import { closePopup } from './utils.js';


// Функция для добавления/удаления лайка
  function likeCard(evt) {
    if (evt.target.classList.contains(buttonSelectors.buttonLikeClass)) {
      evt.target.classList.toggle(buttonSelectors.buttonLikeActiveClass);
    };
  }

// Функция для добавления блока "Нет добавленных карточек" (если список карточек пуст)
  function renderNoCards() {
    noCardsElement.classList.remove(cardSelectors.noCardsHiddenClass);
  }

// Функция для удаления карточки
  function deleteCard(evt) {
    if (evt.target.classList.contains(buttonSelectors.buttonDeleteClass)) {
      evt.target.closest(cardSelectors.cardSelector).remove();

      if (!cardsContainer.hasChildNodes()) {
        renderNoCards();
      };
    };
  }

// Функция для создания карточки
  function createCard(cardData) {
    const cardElement = cardTemplate.querySelector(cardSelectors.cardSelector).cloneNode(true);
    const cardPlaceName = cardElement.querySelector(cardSelectors.cardNameSelector);
    const cardPlaceImage = cardElement.querySelector(cardSelectors.cardImageSelector);

    cardPlaceImage.src = cardData.link;
    cardPlaceImage.alt = cardData.name;
    cardPlaceName.textContent = cardData.name;

    return cardElement;
  }

// Функция для добавления карточки в контейнер с карточками
  function addCard(cardData) {
    const cardElement = createCard(cardData);
    cardsContainer.prepend(cardElement);
  }

// Функция-обработчик "отправки" формы добавления карточки
  function addFormSubmitHandler(evt) {
    evt.preventDefault();

    if (evt.target.name === formNames.formAddCardName) {
      const newCardData = {name: formInputPlaceName.value, link: formInputImageLink.value};
      addCard(newCardData);
      closePopup(popupAddCard);
    };
  }

  export {
    addCard,
    likeCard,
    deleteCard,
    addFormSubmitHandler,
  };
