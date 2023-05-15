import './index.css';

import {
  formSelectors,
  profileUserName,
  profileUserAbout,
  initialCards,
  buttonAdd,
  buttonEdit,
  popupAddCard,
  popupEditProfile,
  formAddCard,
  formEditProfile,
  formInputUserName,
  formInputUserAbout,
  cardsContainer,
  cardSelectors,
 } from '../components/constants.js';

import { hideInputError, enableValidation } from '../components/validate.js';

import {
  addCard,
  likeCard,
  deleteCard,
  addFormSubmitHandler,
} from '../components/card.js';

import { openPopup } from '../components/utils.js';

import { editFormSubmitHandler } from '../components/profile.js';

import { createPopupShowImage } from '../components/modal.js';

// Подключение валидации всех форм страницы
enableValidation(formSelectors);

// Добавление карточек "из коробки" (при загрузке страницы)
initialCards.forEach(initialCardData => {
  addCard(initialCardData);
});

// Слушатель событий для кнопки открытия окна добавления карточки
buttonAdd.addEventListener('click', (evt) => {
  openPopup(popupAddCard);
  formAddCard.reset();
  const inputList = Array.from(formAddCard.querySelectorAll(formSelectors.inputSelector));
  inputList.forEach((inputElement) => {
      hideInputError(formAddCard, inputElement, formSelectors);
    });
});

// Слушатель событий для формы добавления карточки
formAddCard.addEventListener('submit', addFormSubmitHandler);

// Слушатель событий для добавления/удаления лайка
cardsContainer.addEventListener('click', likeCard);

// Слушатель событий для удаления карточки
cardsContainer.addEventListener('click', deleteCard);

// Слушатель событий для кнопки открытия окна редактирования профиля
buttonEdit.addEventListener('click', popup => {
  openPopup(popupEditProfile);
  formInputUserName.value = profileUserName.textContent;
  formInputUserAbout.value = profileUserAbout.textContent;
});

// Слушатель событий для формы редактирования профиля
formEditProfile.addEventListener('submit', editFormSubmitHandler);

// Слушатель событий для открытия окна просмотра картинки
cardsContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains(cardSelectors.cardImageClass)) {
    const targetCard = evt.target.closest(cardSelectors.cardSelector);
    const targetPlaceName = targetCard.querySelector(cardSelectors.cardNameSelector).textContent;
    const targetImageLink = evt.target.src;

    createPopupShowImage(targetPlaceName, targetImageLink);
  };
});