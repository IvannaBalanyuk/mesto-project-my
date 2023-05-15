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
 } from '../components/constants.js';

import { hideInputError, setInactiveClass, enableValidation } from '../components/validate.js';

import {
  addCard,
  addFormSubmitHandler,
} from '../components/card.js';

import { openPopup } from '../components/utils.js';

import { editFormSubmitHandler } from '../components/profile.js';

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

  const buttonElement = formAddCard.querySelector(formSelectors.submitButtonSelector);
  setInactiveClass(buttonElement, formSelectors);
});

// Слушатель событий для формы добавления карточки
formAddCard.addEventListener('submit', addFormSubmitHandler);

// Слушатель событий для кнопки открытия окна редактирования профиля
buttonEdit.addEventListener('click', popup => {
  openPopup(popupEditProfile);
  formInputUserName.value = profileUserName.textContent;
  formInputUserAbout.value = profileUserAbout.textContent;
});

// Слушатель событий для формы редактирования профиля
formEditProfile.addEventListener('submit', editFormSubmitHandler);
