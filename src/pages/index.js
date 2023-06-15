import './index.css';

import {
  config,
  pageSelectors,
  submitValues,
  profileSelectors,
  gallerySelectors,
  buttons,
  popupSelectors,
  forms,
  formSelectors,
  templateSelectors,
  cardSelectors,
} from '../utils/constants.js';

import { renderLoading } from '../utils/utils.js';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';


// ВАЛИДАЦИЯ ФОРМ

// Создание экземпляров классов
const formProfileValidator = new FormValidator(formSelectors, forms.editProfile);
const formAvatarValidator = new FormValidator(formSelectors, forms.changeAvatar);
const formCardValidator = new FormValidator(formSelectors, forms.addCard);

// Включение валидации форм
formProfileValidator.enableValidation();
formAvatarValidator.enableValidation();
formCardValidator.enableValidation();


// ФУНКЦИОНАЛЬНОСТЬ МОДАЛЬНЫХ ОКОН

// Создание экземпляров классов
const popupEditProfile = new PopupWithForm(
  popupSelectors.popupEditProfile,
  popupSelectors,
  pageSelectors,
  formSelectors,
  handleFormProfileSubmit
);
const popupChangeAvatar = new PopupWithForm(
  popupSelectors.popupChangeAvatar,
  popupSelectors,
  pageSelectors,
  formSelectors,
  handleFormAvatarSubmit
);
const popupAddCard = new PopupWithForm(
  popupSelectors.popupAddCard,
  popupSelectors,
  pageSelectors,
  formSelectors,
  handleFormCardSubmit
);
const popupShowImage = new PopupWithImage(
  popupSelectors.popupShowImage,
  popupSelectors,
  pageSelectors
);
const popupConfirmDeletion = new PopupWithConfirm(
  popupSelectors.popupConfirmDeletion,
  popupSelectors,
  pageSelectors,
  formSelectors,
  handleFormConfirmSubmit
);

const userInfo = new UserInfo(profileSelectors);

// Обработчик открытия модального окна
function handlePopupOpening(popupObject, formValidatorObject) {
  if (popupObject === popupEditProfile) {
    popupObject.setInputValues(userInfo.getUserInfo());
  };

  formValidatorObject.resetValidation();
  popupObject.open();
}

// Слушатели события click для кнопок открытия модальных окон
buttons.addCard.addEventListener('click', () => {
  handlePopupOpening(popupAddCard, formCardValidator);
});
buttons.editProfile.addEventListener('click', () => {
  handlePopupOpening(popupEditProfile, formProfileValidator);
});
buttons.changeAvatar.addEventListener('click', () => {
  handlePopupOpening(popupChangeAvatar, formAvatarValidator);
});


// ФУНКЦИОНАЛЬНОСТЬ ПРОФИЛЯ

// Создание экземпляров классов
const api = new Api(config);

// Обработчик события submit формы редактирования профиля
function handleFormProfileSubmit (inputValues) {
  renderLoading(
    true,
    forms.editProfile,
    submitValues.saving,
    submitValues.save
  );

  api.patchUserData(inputValues)
    .then((profileData) => {
      userInfo.setUserInfo(profileData);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(
        false,
        forms.editProfile,
        submitValues.saving,
        submitValues.save
      );
    });
}

// Обработчик события submit формы редактирования аватара
function handleFormAvatarSubmit(avatarLink) {
  renderLoading(
    true,
    forms.changeAvatar,
    submitValues.saving,
    submitValues.save
  );

  api.patchAvatarData(avatarLink)
    .then((profileData) => {
      userInfo.setAvatar(profileData);
      popupChangeAvatar.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(
        false,
        forms.changeAvatar,
        submitValues.saving,
        submitValues.save
      );
    });
}


// ФУНКЦИОНАЛЬНОСТЬ КАРТОЧЕК

// Обработчик события click для картинки (открытие попапа просмотра картинки)
function handleClickOnImage(name, link) {
  popupShowImage.open(name, link);
}

// Обработчик события click для кнопки лайка
function handleClickOnLike(cardObject) {
  const cardId = cardObject.getCardId();
  if (cardObject.hasLikeFromUser()) {
    api.deleteLikeData(cardId)
    .then((cardData) => {
      cardObject.updateLikes(cardData.likes);
      cardObject.renderLikes();
    })
    .catch((err) => {
    console.log(`Ошибка: ${err}`);
    });
  } else {
    api.putLikeData(cardId)
    .then((cardData) => {
      cardObject.updateLikes(cardData.likes);
      cardObject.renderLikes();
    })
    .catch((err) => {
    console.log(`Ошибка: ${err}`);
    });
  }
}

// Обработчик события click для кнопки удаления карточки
function handleClickOnDelete(cardObject) {
  popupConfirmDeletion.setItemForDeletion(cardObject);
  popupConfirmDeletion.open();
}

// Создание экземпляра класса Section для галлереи карточек
const gallery = new Section(
  gallerySelectors.cardsContainer,
  renderCard,
  gallerySelectors.noCardsHiddenClass);

// Функция-коллбэк для создания экземпляра класса Card и получения готовой карточки
function renderCard(cardData) {
  const card = new Card(
    cardData,
    userInfo.id,
    templateSelectors.defaultCardSelector,
    cardSelectors,
    handleClickOnImage,
    handleClickOnLike,
    handleClickOnDelete,
  )
  .create();
  gallery.addItem(card, 'prepend');
}

// Обработчик события submit формы добавления карточки
function handleFormCardSubmit(inputValues) {
  renderLoading(
    true,
    forms.addCard,
    submitValues.saving,
    submitValues.create
  );

  api.postCardData(inputValues)
    .then((cardData) => {
      renderCard(cardData);
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(
        false,
        forms.addCard,
        submitValues.saving,
        submitValues.create
      );
    });
}

// Обработчик события submit для формы удаления карточки
function handleFormConfirmSubmit(cardObject) {
  renderLoading(
    true,
    forms.confirmDeletion,
    submitValues.deleting,
    submitValues.yes
  );

  const cardId = cardObject.getCardId();

  api.deleteCardData(cardId)
    .then(() => {
      cardObject.delete();
      gallery.renderNoItems();
      popupConfirmDeletion.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(
        false,
        forms.confirmDeletion,
        submitValues.deleting,
        submitValues.yes
      );
    });
}


// ОБЩАЯ ФУНКЦИОНАЛЬНОСТЬ

// Загрузка и отрисовка исходных данных с сервера
function setInitialData() {
  Promise.all([api.getUserData(), api.getCardsData()])
  .then(([ profileData, cardsData ]) => {
    userInfo.setUserInfo(profileData);
    userInfo.setAvatar(profileData);

    gallery.renderItems(cardsData);
  })
  .catch(([ profileDataErr, cardsDataErr ]) => {
      console.log(`Ошибка: ${profileDataErr}`);
      console.log(`Ошибка: ${cardsDataErr}`);
  });
}

setInitialData();
