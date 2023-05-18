// Body
  export const page = document.querySelector('.page');
  export const pageSelectors = {
    nonScrollClass: 'page_non-scroll',
  }

// Мой Id
  export const myId = '3efa99fb862700e7ea4331b9';

// Секция profile
  export const profileUserName = page.querySelector('.profile__user-name');
  export const profileUserAbout = page.querySelector('.profile__user-about');
  export const profileAvatarImage = page.querySelector('.profile__avatar-image');

// Кнопки
  export const buttonEdit = page.querySelector('.button-edit');
  export const buttonChange = page.querySelector('.profile__avatar-button');
  export const buttonAdd = page.querySelector('.button-add');
  export const buttonSelectors = {
    buttonCloseClass: 'button-close',
    buttonDeleteClass: 'button-delete',
    buttonDeleteSelector: '.button-delete',
    buttonLikeClass: 'button-like',
    buttonLikeSelector: '.button-like',
    buttonLikeActiveClass: 'button-like_active',
    buttonSaveSelector: '.button-save',
  }

// Модальные окна
  export const popupEditProfile = page.querySelector('.popup_type_edit-profile');
  export const popupChangeAvatar = page.querySelector('.popup_type_change-avatar');
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

// Карточки
  export const cardsContainer = page.querySelector('.cards__list');
  export const noCardsElement = page.querySelector('.no-cards');
  export const cardTemplate = page.querySelector('#card-template').content;
  export const cardSelectors = {
    cardSelector: '.card',
    cardImageClass: 'card__place-image',
    cardImageSelector: '.card__place-image',
    cardNameSelector: '.card__place-name',
    likesCounterSelector: '.card__likes-counter',
    noCardsHiddenClass: 'no-cards_hidden',
  }

// Формы
  export const formEditProfile = document.forms.editProfile;
  export const formChangeAvatar = document.forms.changeAvatar;
  export const formAddCard = document.forms.addCard;
  export const formInputUserName = formEditProfile.elements.userName;
  export const formInputUserAbout = formEditProfile.elements.userAbout;
  export const formInputAvatarLink = formChangeAvatar.elements.avatarLink;
  export const formInputPlaceName = formAddCard.elements.placeName;
  export const formInputImageLink = formAddCard.elements.imageLink;
  export const formSelectors = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.button-save',
    inactiveButtonClass: 'button-save_disabled',
    inputErrorClass: 'form__input_type_error',
    errorActiveClass: 'form__input-error_visible',
  }
