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
  handleProfileFormSubmit
);
const popupChangeAvatar = new PopupWithForm(
  popupSelectors.popupChangeAvatar,
  popupSelectors,
  pageSelectors,
  formSelectors,
  handleAvatarFormSubmit
);
const popupAddCard = new PopupWithForm(
  popupSelectors.popupAddCard,
  popupSelectors,
  pageSelectors,
  formSelectors,
  handleCardFormSubmit
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
  handleConfirmFormSubmit
);

const userInfo = new UserInfo(profileSelectors);

// Обработчик открытия модального окна
const handlePopupOpening = (popup, formValidator) => {
  if (popup === popupEditProfile) {
    popup.setInputValues(userInfo.getUserInfo());
  };

  formValidator.resetValidation();
  popup.open();
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
function handleProfileFormSubmit (inputValues) {
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
function handleAvatarFormSubmit(avatar) {
  renderLoading(
    true,
    forms.changeAvatar,
    submitValues.saving,
    submitValues.save
  );

  api.patchAvatarData(avatar)
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

// Функция-коллбэк для создания экземпляра класса Card и получения готовой карточки
const renderCard = (cardData) => {
  const card = new Card(
    cardData,
    userInfo.id,
    templateSelectors.defaultCardSelector,
    cardSelectors,
    handleImageClick,
    handleLikeClick,
    handleDeleteClick,
  );
  const сardElement = card.create();
  gallery.addItem(сardElement);
};

const gallery = new Section(
  gallerySelectors.cardsContainer,
  gallerySelectors.noCardsHiddenClass,
  renderCard);

// Обработчик события submit формы добавления карточки
function handleCardFormSubmit(inputValues) {
  renderLoading(
    true,
    forms.addCard,
    submitValues.saving,
    submitValues.create
  );

  api.postCardData(inputValues)
    .then((data) => {
      renderCard(data);
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

// Обработчик события click для кнопки лайка
function handleLikeClick(card) {
  if (card.hasLikeFromUser()) {
    api.deleteLikeData(card.id)
    .then((cardData) => {
      card.likes = cardData.likes;
      card.renderLikesData();
    })
    .catch((err) => {
    console.log(`Ошибка: ${err}`);
    });
  } else {
    api.putLikeData(card.id)
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
  renderLoading(
    true,
    forms.confirmDeletion,
    submitValues.deleting,
    submitValues.yes
  );

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
      renderLoading(
        false,
        forms.confirmDeletion,
        submitValues.deleting,
        submitValues.yes
      );
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

getData();
