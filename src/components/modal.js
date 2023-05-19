import {
  profileUserName,
  profileUserAbout,
  popupEditProfile,
  popupChangeAvatar,
  popupAddCard,
  popupShowImage,
  popupImage,
  popupCaption,
  cardSelectors,
  formEditProfile,
  formChangeAvatar,
  formAddCard,
  formInputUserName,
  formInputUserAbout,
} from './constants.js';

import {
  openPopup,
  resetFormErrors,
  makeButtonActive,
  makeButtonInactive,
} from './utils.js';


// Создание модального окна редактирования профиля
  const createPopupEditProfile = () => {
    openPopup(popupEditProfile);
    formInputUserName.value = profileUserName.textContent;
    formInputUserAbout.value = profileUserAbout.textContent;
    resetFormErrors(formEditProfile);
    makeButtonActive(formEditProfile);
  }

// Создание модального окна обновления аватара
  const createPopupChangeAvatar = () => {
    openPopup(popupChangeAvatar);
    formChangeAvatar.reset();
    resetFormErrors(formChangeAvatar);
    makeButtonInactive(formChangeAvatar);
  }

// Создание модального окна добавления карточки
  const createPopupAddCard = () => {
    openPopup(popupAddCard);
    formAddCard.reset();
    resetFormErrors(formAddCard);
    makeButtonInactive(formAddCard);
  }

// Создание модального окна просмотра картинки
  const createPopupShowImage = (evt) => {
    openPopup(popupShowImage);
    const targetCard = evt.target.closest(cardSelectors.cardSelector);
    const targetPlaceName = targetCard.querySelector(cardSelectors.cardNameSelector).textContent;
    const targetImageLink = evt.target.src;
    popupImage.src = targetImageLink;
    popupImage.alt = targetPlaceName;
    popupCaption.textContent = targetPlaceName;
  }


export {
  createPopupEditProfile,
  createPopupChangeAvatar,
  createPopupAddCard,
  createPopupShowImage,
}
