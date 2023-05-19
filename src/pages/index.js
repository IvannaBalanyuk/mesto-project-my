import './index.css';

import {
  submitValues,
  buttonAdd,
  buttonChange,
  buttonEdit,
  buttonSelectors,
  popupEditProfile,
  popupChangeAvatar,
  popupAddCard,
  popupDeleteCard,
  cardsContainer,
  cardSelectors,
  formEditProfile,
  formChangeAvatar,
  formAddCard,
  formDeleteCard,
  formInputPlaceName,
  formInputImageLink,
  formInputUserName,
  formInputUserAbout,
  formInputAvatarLink,
  formSelectors,
} from '../components/constants.js';

import { renderLoading, openPopup, closePopup } from '../components/utils.js';

import { enableValidation } from '../components/validate.js';

import {
  getProfileData,
  getCardsData,
  patchProfileData,
  patchAvatarData,
  postCardData,
  deleteCardData,
  putLikeData,
  deleteLikeData,
} from '../components/api.js';

import { renderProfile, renderAvatar } from '../components/profile.js';

import {
  createCard,
  renderNoCards,
  checkLikeStatus,
  toggleLikeStatus,
  renderLikesCounter,
} from '../components/card.js';

import {
  createPopupEditProfile,
  createPopupChangeAvatar,
  createPopupAddCard,
} from '../components/modal.js';


// Подключение валидации форм
enableValidation(formSelectors);


// ЗАГРУЗКА ДАННЫХ С СЕРВЕРА

// Загрузка данных о пользователе
const renderUploadedProfile = () => {
  getProfileData()
    .then((profileData) => {
      renderProfile(profileData.name, profileData.about);
      renderAvatar(profileData.avatar);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

// Загрузка данных о карточках
const renderUploadedCards = () => {
  getCardsData()
  .then((cardsData) => {
    cardsData.forEach((cardData) => {
      addCard(createCard(cardData.link, cardData.name, cardData._id, cardData.likes, cardData.owner._id));
    })
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });
}

const promises = [renderUploadedProfile, renderUploadedCards];

Promise.all(promises)
  .then(() => {
    renderUploadedProfile();
    renderUploadedCards();
  });


// РЕДАКТИРОВАНИЕ ПРОФИЛЯ

// Слушатель событий на кнопку редактирования профиля
buttonEdit.addEventListener('click', createPopupEditProfile);

// Обработчик события submit формы редактирования профиля
const editFormSubmitHandler = (evt) => {
  evt.preventDefault();
  renderLoading(true, formEditProfile, submitValues.saving, submitValues.save);

  patchProfileData(formInputUserName.value, formInputUserAbout.value)
    .then((profileData) => {
      renderProfile(profileData.name, profileData.about);
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, formEditProfile, submitValues.saving, submitValues.save);
    });
}

// Слушатель событий на форму редактирования профиля
formEditProfile.addEventListener('submit', editFormSubmitHandler);


// ОБНОВЛЕНИЕ АВАТАРА

// Слушатель событий на кнопку редактирования аватара
buttonChange.addEventListener('click', createPopupChangeAvatar);

// Обработчик события submit формы редактирования аватара
const changeFormSubmitHandler = (evt) => {
  evt.preventDefault();
  renderLoading(true, formChangeAvatar, submitValues.saving, submitValues.save);

  patchAvatarData(formInputAvatarLink.value)
    .then((profileData) => {
      renderAvatar(profileData.avatar);
      closePopup(popupChangeAvatar);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, formChangeAvatar, submitValues.saving, submitValues.save);
    });
}

// Слушатель событий на форму редактирования аватара
formChangeAvatar.addEventListener('submit', changeFormSubmitHandler);


// ДОБАВЛЕНИЕ КАРТОЧКИ

// Слушатель событий на кнопку добавления карточки
buttonAdd.addEventListener('click', createPopupAddCard);

// Добавление карточки в разметку
const addCard = (cardElement) => {
  cardsContainer.prepend(cardElement);
}

// Обработчик события submit формы добавления карточки
const addFormSubmitHandler = (evt) => {
  evt.preventDefault();
  renderLoading(true, formAddCard, submitValues.saving, submitValues.create);

  postCardData(formInputPlaceName.value, formInputImageLink.value)
    .then((cardData) => {
      addCard(createCard(cardData.link, cardData.name, cardData._id, cardData.likes, cardData.owner._id));
      closePopup(popupAddCard);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, formAddCard, submitValues.saving, submitValues.create);
    });
}

// Слушатель событий на форму добавления карточки
formAddCard.addEventListener('submit', addFormSubmitHandler);


// УДАЛЕНИЕ КАРТОЧКИ

// Обработчик события click на кнопке удаления карточки
const deleteCard = (evt) => {
  if(evt.target.classList.contains(buttonSelectors.buttonDeleteClass)) {
    openPopup(popupDeleteCard);
    window.targetCard = evt.target.closest(cardSelectors.cardSelector);
  };
}

// Слушатель событий на кнопку удаления карточки (делегирование)
cardsContainer.addEventListener('click', deleteCard);

// Обработчик события submit формы удаления карточки
const deleteFormSubmitHandler = (evt) => {
  evt.preventDefault();
  renderLoading(true, formDeleteCard, submitValues.deleting, submitValues.yes);

  deleteCardData(window.targetCard.id)
    .then(() => {
      window.targetCard.remove();
      if (!cardsContainer.hasChildNodes()) renderNoCards();
      closePopup(popupDeleteCard);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, formDeleteCard, submitValues.deleting, submitValues.yes);
    });
}

// Слушатель событий на форму удаления карточки
formDeleteCard.addEventListener('submit', deleteFormSubmitHandler);


// ДОБАВЛЕНИЕ/УДАЛЕНИЕ ЛАЙКА

// Обработчик события на кнопке лайка
const handleLikeCard = (evt) => {
  if(evt.target.classList.contains(buttonSelectors.buttonLikeClass)) {
    const targetCard = evt.target.closest(cardSelectors.cardSelector);
    if(!checkLikeStatus(evt.target)) {
      putLikeData(targetCard.id)
        .then((cardData) => {
          toggleLikeStatus(evt.target);
          renderLikesCounter(targetCard, cardData.likes);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    } else {
      deleteLikeData(targetCard.id)
        .then((cardData) => {
          toggleLikeStatus(evt.target);
          renderLikesCounter(targetCard, cardData.likes);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    };
  }
}

// Слушатель событий на кнопку лайка (делегирование)
cardsContainer.addEventListener('click', handleLikeCard);
