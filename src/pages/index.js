import './index.css';

import {
  config,
  submitValues,
  profileSelectors,
  gallerySelectors,
  buttons,
  popupSelectors,
  forms,
  formInputs,
  formSelectors,
  templateSelectors,
} from '../components/constants.js';

import {
  renderLoading,
  makeButtonInactive,
  makeButtonActive,
} from '../components/utils.js';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';


// СОЗДАНИЕ ЭКЗЕМПЛЯРОВ КЛАССОВ

const api = new Api(config);

const formProfileValidator = new FormValidator(formSelectors, forms.editProfile);
const formAvatarValidator = new FormValidator(formSelectors, forms.changeAvatar);
const formCardValidator = new FormValidator(formSelectors, forms.addCard);

const popupEditProfile = new PopupWithForm(popupSelectors.popupEditProfile, handleProfileFormSubmit);
const popupChangeAvatar = new PopupWithForm(popupSelectors.popupChangeAvatar, handleAvatarFormSubmit);
const popupAddCard = new PopupWithForm(popupSelectors.popupAddCard, handleCardFormSubmit);
const popupShowImage = new PopupWithImage(popupSelectors.popupShowImage);
const popupConfirmDeletion = new PopupWithConfirm(popupSelectors.popupConfirmDeletion, handleConfirmFormSubmit);

const userInfo = new UserInfo(profileSelectors);


// ВАЛИДАЦИЯ ФОРМ

// Включение валидации форм
formProfileValidator.enableValidation();
formAvatarValidator.enableValidation();
formCardValidator.enableValidation();


// ФУНКЦИОНАЛЬНОСТЬ МОДАЛЬНЫХ ОКОН

// Добавление слушателей событий модальным окнам
popupEditProfile.setEventListeners();
popupChangeAvatar.setEventListeners();
popupAddCard.setEventListeners();
popupShowImage.setEventListeners();
popupConfirmDeletion.setEventListeners();

// Обработчик открытия модального окна
const handlePopupOpening = (popup, form, formValidator) => {
  popup.open();
  formValidator.resetFormErrors();
  if(popup === popupEditProfile) {
    const { name, about } = userInfo.getUserInfo();
    formInputs.inputUserName.value = name;
    formInputs.inputUserAbout.value = about;
    makeButtonActive(form);
  } else {
    form.reset();
    makeButtonInactive(form);
  }
}

// Слушатели события click для кнопок открытия модальных окон
buttons.addCard.addEventListener('click', () => {
  handlePopupOpening(popupAddCard, forms.addCard, formCardValidator);
});
buttons.editProfile.addEventListener('click', () => {
  handlePopupOpening(popupEditProfile, forms.editProfile, formProfileValidator);
});
buttons.changeAvatar.addEventListener('click', () => {
  handlePopupOpening(popupChangeAvatar, forms.changeAvatar, formAvatarValidator);
});


// ФУНКЦИОНАЛЬНОСТЬ ПРОФИЛЯ

// Обработчик события submit формы редактирования профиля
function handleProfileFormSubmit (inputValues) {
  renderLoading(true, forms.editProfile, submitValues.saving, submitValues.save);

  api.patchUserData(inputValues)
    .then((profileData) => {
      userInfo.setUserInfo(profileData);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, forms.editProfile, submitValues.saving, submitValues.save);
    });
}

// Обработчик события submit формы редактирования аватара
function handleAvatarFormSubmit(avatar) {
  renderLoading(true, forms.changeAvatar, submitValues.saving, submitValues.save);

  api.patchAvatarData(avatar)
    .then((profileData) => {
      userInfo.setAvatar(profileData);
      popupChangeAvatar.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, forms.changeAvatar, submitValues.saving, submitValues.save);
    });
}


// ФУНКЦИОНАЛЬНОСТЬ КАРТОЧЕК

// Функция-коллбэк для создания экземпляра класса Card и получения готовой карточки
const renderCard = (cardData) => {
  const card = new Card(
    cardData, userInfo.id, templateSelectors.defaultCardSelector,
    handleImageClick,
    handleLikeClick,
    handleDeleteClick,
  );
  const сardElement = card.create();
  return сardElement;
};

const gallery = new Section(gallerySelectors.cardsContainer, gallerySelectors.noCardsHiddenClass, renderCard);

// Обработчик события submit формы добавления карточки
function handleCardFormSubmit(inputValues) {
  renderLoading(true, forms.addCard, submitValues.saving, submitValues.create);

  api.postCardData(inputValues)
    .then((data) => {
      const cardData = data;
      const card = renderCard(cardData);
      gallery.addItem(card);
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, forms.addCard, submitValues.saving, submitValues.create);
    });
}

// Обработчик события click для кнопки лайка
function handleLikeClick(card) {
  if (card.checkLikesData()) {
    api.deleteLikeData(card._id)
    .then((cardData) => {
      card.likes = cardData.likes;
      card.renderLikesData();
    })
    .catch((err) => {
    console.log(`Ошибка: ${err}`);
    });
  } else {
    api.putLikeData(card._id)
    .then((cardData) => {
      card.likes = cardData.likes;
      card.renderLikesData();
    })
    .catch((err) => {
    console.log(`Ошибка: ${err}`);
    });
  }
}

// Обработчик события click для кнопки удаления карточки
const handleDeleteClick = (card) => {
  popupConfirmDeletion.open();
  popupConfirmDeletion.getId(card);
};

// Обработчик события submit для формы удаления карточки
function handleConfirmFormSubmit(cardId) {
  renderLoading(true, forms.confirmDeletion, submitValues.deleting, submitValues.yes);

  api.deleteCardData(cardId)
    .then(() => {
      popupConfirmDeletion.element.delete();
      gallery.renderNoItems();
      popupConfirmDeletion.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, forms.confirmDeletion, submitValues.deleting, submitValues.yes);
    });
}

// Обработчик события click для картинки (открытие попапа просмотра картинки)
const handleImageClick = (name, link) => {
  popupShowImage.open(name, link);
}


// ОБЩАЯ ФУНКЦИОНАЛЬНОСТЬ

// Загрузка и отрисовка исходных данных с сервера
const getData = () => {
  const data = Promise.all([api.getUserData(), api.getCardsData()])
  .then((data) => {
    const profileData = data[0];
    const cardsData = data[1];

    userInfo.setUserInfo(profileData);
    userInfo.setAvatar(profileData);

    gallery.renderItems(cardsData);
  })
  .catch((err) => {
      const profileDataErr = err[0];
      const cardsDataErr = err[1];
      console.log(`Ошибка: ${profileDataErr}`);
      console.log(`Ошибка: ${cardsDataErr}`);
  });
}

getData();
