export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const page = document.querySelector('.page');
export const pageSelectors = {
  nonScrollClass: 'page_non-scroll',
}

export const profileUserName = page.querySelector('.profile__user-name');
export const profileUserAbout = page.querySelector('.profile__user-about');

export const buttonEdit = page.querySelector('.button-edit');
export const buttonAdd = page.querySelector('.button-add');
export const buttonSelectors = {
  buttonCloseClass: 'button-close',
  buttonDeleteClass: 'button-delete',
  buttonLikeClass: 'button-like',
  buttonLikeActiveClass: 'button-like_active',
}

export const popupEditProfile = page.querySelector('.popup_type_edit-profile');
export const popupAddCard = page.querySelector('.popup_type_add-card');
export const popupShowImage = page.querySelector('.popup_type_show-image');
export const popupImageElement = page.querySelector('.popup__image');
export const popupCaptionElement = page.querySelector('.popup__image-caption');
export const popupSelectors = {
  popupClass: 'popup',
  popupSelector: '.popup',
  popupOpenedClass: 'popup_opened',
  popupOpenedSelector: '.popup_opened',
}

export const cardsContainer = page.querySelector('.cards__list');
export const noCardsElement = page.querySelector('.no-cards');
export const cardTemplate = page.querySelector('#card-template').content;
export const cardSelectors = {
  cardSelector: '.card',
  cardImageClass: 'card__place-image',
  cardImageSelector: '.card__place-image',
  cardNameSelector: '.card__place-name',
  noCardsHiddenClass: 'no-cards_hidden',
}

export const formEditProfile = document.forms.editProfile;
export const formAddCard = document.forms.addCard;
export const formInputUserName = formEditProfile.elements.userName;
export const formInputUserAbout = formEditProfile.elements.userAbout;
export const formInputPlaceName = formAddCard.elements.placeName;
export const formInputImageLink = formAddCard.elements.imageLink;
export const formNames = {
  formAddCardName: 'addCard',
  formEditProfileName: 'editProfile',
}
export const formSelectors = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.button-save',
  inactiveButtonClass: 'button-save_disabled',
  inputErrorClass: 'form__input_type_error',
  errorActiveClass: 'form__input-error_visible',
}
