// Конфиг для формирования запросов
export const config = {
  baseUrl: "http://mesto.domain.students.nomoredomainswork.ru",
  headers: {
    authorization: "53e7280d-81b7-4e82-b5c1-fc2456f5c412",
    "Content-Type": "application/json",
  },
};

// Значения кнопок сабмит
export const submitValues = {
  save: 'Сохранить',
  create: 'Создать',
  yes: 'Да',
  saving: 'Сохранение...',
  deleting: 'Удаление...',
};

// Страница
export const page = document.querySelector('.page');

export const pageSelectors = {
  nonScrollClass: 'page_non-scroll',
}

// Секция profile
export const profileSelectors = {
  nameSelector: '.profile__user-name',
  aboutSelector: '.profile__user-about',
  avatarSelector: '.profile__avatar-image',
}

// Секция cards
export const gallerySelectors = {
  cardsContainer: '.cards__list',
  noCardsHiddenClass: 'no-cards_hidden',
}

// Карточка
export const cardSelectors = {
  cardSelector: '.card',
  imageClass: 'card__place-image',
  imageSelector: '.card__place-image',
  nameSelector: '.card__place-name',
  likesCounterSelector: '.card__likes-counter',
  buttonDeleteSelector: '.button-delete',
  buttonLikeSelector: '.button-like',
  buttonLikeActiveClass: 'button-like_active',
}

// Кнопки
export const buttons = {
  editProfile: page.querySelector('.button-edit'),
  changeAvatar: page.querySelector('.profile__avatar-button'),
  addCard: page.querySelector('.button-add'),
}

// Модальные окна
export const popupSelectors = {
  popupOpenedClass: 'popup_opened',
  imageSelector: '.popup__image',
  captionSelector: '.popup__image-caption',
  buttonCloseClass: 'button-close',
  popupEditProfile: '.popup_type_edit-profile',
  popupChangeAvatar: '.popup_type_change-avatar',
  popupAddCard: '.popup_type_add-card',
  popupConfirmDeletion: '.popup_type_confirm-deletion',
  popupShowImage: '.popup_type_show-image',
}

// Формы
export const forms = {
  editProfile: page.querySelector('.form_type_edit-profile'),
  changeAvatar: page.querySelector('.form_type_change-avatar'),
  addCard: page.querySelector('.form_type_add-card'),
  confirmDeletion: page.querySelector('.form_type_confirm-deletion'),
}

export const formSelectors = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.button-save',
  inactiveButtonClass: 'button-save_disabled',
  inputErrorClass: 'form__input_type_error',
  errorActiveClass: 'form__input-error_visible',
  confirmButtonSelector: '.button_type_confirm-deletion',
}

// Шаблоны
export const templateSelectors = {
  defaultCardSelector: '.default-card-template',
}
