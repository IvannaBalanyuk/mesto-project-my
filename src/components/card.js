import {
  myId,
  buttonSelectors,
  cardTemplate,
  noCards,
  cardSelectors,
} from './constants.js';

import { createPopupShowImage } from './modal.js';


// Создание карточки

const createCard = (link, name, cardId, likes, ownerId) => {
  const cardElement = cardTemplate.querySelector(cardSelectors.cardSelector).cloneNode(true);
  const placeNameElement = cardElement.querySelector(cardSelectors.cardNameSelector);
  const placeImageElement = cardElement.querySelector(cardSelectors.cardImageSelector);
  const buttonLikeElement = cardElement.querySelector(buttonSelectors.buttonLikeSelector);
  const buttonDeleteElement = cardElement.querySelector(buttonSelectors.buttonDeleteSelector);

  placeImageElement.src = link;
  placeImageElement.alt = name;
  placeNameElement.textContent = name;
  cardElement.setAttribute('data-id', `${cardId}`);
  if(checkLikesData(likes)) toggleLikeStatus(buttonLikeElement);
  if(ownerId !== myId) buttonDeleteElement.remove();

  placeImageElement.addEventListener('click', createPopupShowImage);
  renderLikesCounter(cardElement, likes);
  return cardElement;
}

// Добавление блока "Нет добавленных карточек"
const renderNoCards = () => {
  noCards.classList.remove(cardSelectors.noCardsHiddenClass);
}

// Проверка статуса лайка
const checkLikeStatus = (buttonElement) => {
  return buttonElement.classList.contains(buttonSelectors.buttonLikeActiveClass);
}

// Переключение состояния кнопки лайка
const toggleLikeStatus = (buttonElement) => {
  buttonElement.classList.toggle(buttonSelectors.buttonLikeActiveClass);
}

// Отрисовка счетчика лайков
const renderLikesCounter = (cardElement, likes) => {
  const likesCounterElement = cardElement.querySelector(cardSelectors.likesCounterSelector);
  likesCounterElement.textContent = likes.length;
}

// Проверка наличия моих лайков
const checkLikesData = (likes) => {
  return likes.some((like) => {
    return like._id === myId;
  });
}


export {
  createCard,
  renderNoCards,
  checkLikeStatus,
  toggleLikeStatus,
  renderLikesCounter,
}
