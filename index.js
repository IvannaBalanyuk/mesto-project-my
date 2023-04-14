const page = document.querySelector('.page');

// Константы редактирования профиля
const userName = page.querySelector('.profile__user-name');
const userAbout = page.querySelector('.profile__user-about');
const editButton = page.querySelector('.button-edit');
const popupEditProfile = page.querySelector('.popup_type_edit-profile');
const editProfileForm = page.querySelector('.form_type_edit-profile');
const userNameInput = editProfileForm.querySelector('.input__text_type_user-name');
const userAboutInput = editProfileForm.querySelector('.input__text_type_user-about');

// Константы добавления карточек мест
const cards = page.querySelector('.cards__list');
const placeName = page.querySelector('.input__text_type_place-name');
const imageLink = page.querySelector('.input__text_type_image-link');
const addButton = page.querySelector('.button-add');
const popupAddCard = page.querySelector('.popup_type_add-card');
const addCardForm = page.querySelector('.form_type_add-card');
const placeNameInput = addCardForm.querySelector('.input__text_type_place-name');
const imageLinkInput = addCardForm.querySelector('.input__text_type_image-link');

// Массив кнопок закрытия модальных окон
const closeButtons = page.querySelectorAll('.button-close');

// Массив для карточек "из коробки"
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

// Добавление карточек "из коробки" (при загрузке страницы)
initialCards.forEach(card => {
  const name = card.name;
  const link = card.link;

  addCard(name, link);
});

// Добавление карточек
function addCard(placeName, placeImageLink) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardPlaceName = cardElement.querySelector('.card__place-name');
  const cardPlaceImage = cardElement.querySelector('.card__place-image');

  cardPlaceImage.setAttribute('src', placeImageLink);
  cardPlaceName.textContent = placeName;

  // слушатель событий на кнопку лайка
  cardElement.querySelector('.button-like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('button-like_active');
  });

  cards.prepend (cardElement);
};

// Слушатель событий для кнопки открытия окна добавления карточки
addButton.addEventListener('click', () => {
  openPopup(popupAddCard);

  placeNameInput.value = '';
  imageLinkInput.value = '';
});

// Открытие модального окна
function openPopup(popup) {
  popup.classList.add('popup_opened');
  page.classList.add('page_non-scroll');
};

// Закрытие модального окна
function closePopup() {
  popupEditProfile.classList.remove('popup_opened');
  popupAddCard.classList.remove('popup_opened');
  page.classList.remove('page_non-scroll');
};

// Слушатель событий для кнопок закрытия модальных окон
closeButtons.forEach(button => button.addEventListener('click', closePopup));

// Слушатель событий для кнопки открытия окна редактирования профиля
editButton.addEventListener('click', popup => {
  openPopup(popupEditProfile);
  userNameInput.value = userName.textContent;
  userAboutInput.value = userAbout.textContent;
});

// Редактирование профиля
function editProfile() {
  userName.textContent = userNameInput.value;
  userAbout.textContent = userAboutInput.value;
}

// Обработчик "отправки" формы
// (общий для редактирования профиля и для добавления карточки)
function formSubmitHandler (evt) {
  evt.preventDefault();
  const eventTarget = evt.target; // сохранение в константу цели события submit

  if (eventTarget.classList.contains('form_type_edit-profile')
  && (userNameInput.value)
  && (userAboutInput.value)) {
    editProfile();
    closePopup();
  }
  else if (eventTarget.classList.contains('form_type_add-card')
  && (placeNameInput.value)
  && (imageLinkInput.value)) {
    addCard(placeNameInput.value, imageLinkInput.value);
    closePopup();
  }
  else {
    console.log('false');
    return false;
  };
};

// Слушатель событий для формы редактирования профиля
editProfileForm.addEventListener('submit', formSubmitHandler);

// Слушатель событий для формы добавления карточки
addCardForm.addEventListener('submit', formSubmitHandler);

// Вывод блока "Нет добавленных карточек" (вызвать в случае, если список cards пуст)
function renderNoCards() {
  const noCardsElement = page.querySelector('.no-cards');
  noCardsElement.classList.remove('no-cards_hidden');
}

