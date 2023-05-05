const initialCards = [
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

const page = document.querySelector('.page');
const pageSelectors = {
  nonScrollClass: 'page_non-scroll',
}

const profileUserName = page.querySelector('.profile__user-name');
const profileUserAbout = page.querySelector('.profile__user-about');

const buttonEdit = page.querySelector('.button-edit');
const buttonAdd = page.querySelector('.button-add');
const buttonSelectors = {
  buttonCloseClass: 'button-close',
  buttonDeleteClass: 'button-delete',
  buttonLikeClass: 'button-like',
  buttonLikeActiveClass: 'button-like_active',
}

const popupEditProfile = page.querySelector('.popup_type_edit-profile');
const popupAddCard = page.querySelector('.popup_type_add-card');
const popupShowImage = page.querySelector('.popup_type_show-image');
const popupImageElement = page.querySelector('.popup__image');
const popupCaptionElement = page.querySelector('.popup__image-caption');
const popupSelectors = {
  popupClass: 'popup',
  popupSelector: '.popup',
  popupOpenedClass: 'popup_opened',
  popupOpenedSelector: '.popup_opened',
}

const cardsContainer = page.querySelector('.cards__list');
const noCardsElement = page.querySelector('.no-cards');
const cardTemplate = page.querySelector('#card-template').content;
const cardSelectors = {
  cardSelector: '.card',
  cardImageClass: 'card__place-image',
  cardImageSelector: '.card__place-image',
  cardNameSelector: '.card__place-name',
  noCardsHiddenClass: 'no-cards_hidden',
}

const formEditProfile = document.forms.editProfile;
const formAddCard = document.forms.addCard;
const formInputUserName = formEditProfile.elements.userName;
const formInputUserAbout = formEditProfile.elements.userAbout;
const formInputPlaceName = formAddCard.elements.placeName;
const formInputImageLink = formAddCard.elements.imageLink;
const formNames = {
  formAddCardName: 'addCard',
  formEditProfileName: 'editProfile',
}
const formSelectors = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.button-save',
  inactiveButtonClass: 'button-save_disabled',
  inputErrorClass: 'form__input_type_error',
  errorActiveClass: 'form__input-error_visible',
}
