import './index.css';

import {
  buttonAdd,
  buttonChange,
  buttonEdit,
  formEditProfile,
  formChangeAvatar,
  formAddCard,
  formSelectors,
} from '../components/constants.js';

import {
  enableValidation
} from '../components/validate.js';

import {
  createPopupEditProfile,
  createPopupChangeAvatar,
  createPopupAddCard,
} from '../components/modal.js';

import {
  renderUploadedCards,
  addFormSubmitHandler,
} from '../components/card.js';

import {
  renderUploadedProfile,
  editFormSubmitHandler,
  changeFormSubmitHandler,
} from '../components/profile.js';


// Заполнение секции profile данными с сервера
  renderUploadedProfile();

// Заполнение секции cards данными с сервера
  renderUploadedCards();

// Подключение валидации всех форм страницы
  enableValidation(formSelectors);

// Слушатель событий для кнопки открытия окна редактирования профиля
  buttonEdit.addEventListener('click', createPopupEditProfile);

// Слушатель событий для формы редактирования профиля
  formEditProfile.addEventListener('submit', editFormSubmitHandler);

// Слушатель событий для кнопки открытия окна обновления аватара
  buttonChange.addEventListener('click', createPopupChangeAvatar);

// Слушатель событий для формы обновления аватара
  formChangeAvatar.addEventListener('submit', changeFormSubmitHandler);

// Слушатель событий для кнопки открытия окна добавления карточки
  buttonAdd.addEventListener('click', createPopupAddCard);

// Слушатель событий для формы добавления карточки
  formAddCard.addEventListener('submit', addFormSubmitHandler);
