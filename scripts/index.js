// ОБЪЯВЛЕНИЕ ГЛОБАЛЬНЫХ ПЕРЕМЕННЫХ

  const page = document.querySelector('.page');

  // Константы редактирования профиля
    const userName = page.querySelector('.profile__user-name');
    const userAbout = page.querySelector('.profile__user-about');
    const buttonEdit = page.querySelector('.button-edit');
    const popupEditProfile = page.querySelector('.popup_type_edit-profile');
    const formEditProfile = document.forms.editProfile;
    const formInputUserName = formEditProfile.elements.userName;
    const formInputUserAbout = formEditProfile.elements.userAbout;

  // Константы добавления карточек
    const cardsContainer = page.querySelector('.cards__list');
    const cardTemplate = page.querySelector('#card-template').content;
    const buttonAdd = page.querySelector('.button-add');
    const popupAddCard = page.querySelector('.popup_type_add-card');
    const formAddCard = document.forms.addCard;
    const formInputPlaceName = formAddCard.elements.placeName;
    const formInputImageLink = formAddCard.elements.imageLink;

  // Константы просмотра картинки
    const popupShowImage = page.querySelector('.popup_type_show-image');

  // Массив для карточек "из коробки"
    const cardsInitial = [
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


// ОБЩАЯ ФУНКЦИОНАЛЬНОСТЬ

  // Открытие модального окна
    function openPopup(popup) {
      popup.classList.add('popup_opened');
      page.classList.add('page_non-scroll');
    }

  // Закрытие модального окна
    function closePopup() {
      popupEditProfile.classList.remove('popup_opened');
      popupAddCard.classList.remove('popup_opened');
      popupShowImage.classList.remove('popup_opened');
      page.classList.remove('page_non-scroll');
    }

  // Слушатели событий для закрытия модальных окон
  page.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('button-close')) {
      closePopup(evt.target.closest('.popup'));
    };
  });

  page.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(page.querySelector('.popup_opened'));
    };
  });


// ФУНКЦИОНАЛЬНОСТЬ ПРОСМОТРА КАРТИНКИ

  // Наполнение модального окна просмотра картинки
    function openPopupShowImage(evt) {
      if (evt.target.classList.contains('card__place-image')) {
        openPopup(popupShowImage);
        const targetImage = evt.target.getAttribute('src');
        const targetCaption = evt.target.nextElementSibling.textContent;

        const popupImage = page.querySelector('.popup__image');
        const popupCaption = page.querySelector('.popup__image-caption');

        popupImage.setAttribute('src', targetImage);
        popupCaption.textContent = targetCaption;
      };
    }

  // Слушатель событий для открытия окна просмотра картинки
    cardsContainer.addEventListener('click', openPopupShowImage);


// ФУНКЦИОНАЛЬНОСТЬ ДЛЯ КАРТОЧЕК

  // Добавление/удаление лайка
    function likeCard(evt) {
      if (evt.target.classList.contains('button-like')) {
        evt.target.classList.toggle('button-like_active');
      };
    }

  // Слушатель событий для добавления/удаления лайка
    cardsContainer.addEventListener('click', likeCard);

  // Добавление блока "Нет добавленных карточек" (если список карточек пуст)
    function renderNoCards() {
      const noCardsElement = page.querySelector('.no-cards');
      noCardsElement.classList.remove('no-cards_hidden');
    }

  // Удаление карточки
    function deleteCard(evt) {
      if (evt.target.classList.contains('button-delete')) {
        evt.target.closest('.card').remove();

        const cards = page.querySelectorAll('.card');
        if (!cards.length) {
          renderNoCards();
        };
      };
    }

  // Слушатель событий для удаления карточки
    cardsContainer.addEventListener('click', deleteCard);

  // Создание карточки
    function createCard(placeName, placeImageLink) {
      const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
      const cardPlaceName = cardElement.querySelector('.card__place-name');
      const cardPlaceImage = cardElement.querySelector('.card__place-image');

      cardPlaceImage.setAttribute('src', placeImageLink);
      cardPlaceImage.setAttribute('alt', placeName);
      cardPlaceName.textContent = placeName;

      return cardElement;
    }

  // Добавление карточки в контейнер с карточками
    function addCard(placeName, placeImageLink) {
      const cardElement = createCard(placeName, placeImageLink);
      cardsContainer.prepend(cardElement);
    }

  // Добавление карточек "из коробки" (при загрузке страницы)
    cardsInitial.forEach(card => {
      addCard(card.name, card.link);
    });

  // Слушатель событий для кнопки открытия окна добавления карточки
    buttonAdd.addEventListener('click', () => {
      openPopup(popupAddCard);
      formAddCard.reset();
    });

  // Обработчик "отправки" формы добавления карточки
    function addFormSubmitHandler(evt) {
      evt.preventDefault();

      if (evt.target.name === 'formAddCard'
      && (formInputPlaceName.value)
      && (formInputImageLink.value)) {
        addCard(formInputPlaceName.value, formInputImageLink.value);
        closePopup();
      } else {
        return false;
      };
    }

  // Слушатель событий для формы добавления карточки
    formAddCard.addEventListener('submit', addFormSubmitHandler);


// ФУНКЦИОНАЛЬНОСТЬ РЕДАКТИРОВАНИЯ ПРОФИЛЯ

  // Слушатель событий для кнопки открытия окна редактирования профиля
    buttonEdit.addEventListener('click', popup => {
      openPopup(popupEditProfile);
      formInputUserName.value = userName.textContent;
      formInputUserAbout.value = userAbout.textContent;
    });

  // Редактирование профиля
    function editProfile() {
      userName.textContent = formInputUserName.value;
      userAbout.textContent = formInputUserAbout.value;
    }

  // Обработчик "отправки" формы редактирования профиля
    function editFormSubmitHandler(evt) {
      evt.preventDefault();

      if (evt.target.name === 'formEditProfile'
      && (formInputUserName.value)
      && (formInputUserAbout.value)) {
        editProfile();
        closePopup();
      } else {
        console.log('false');
        return false;
      };
    }

  // Слушатель событий для формы редактирования профиля
    formEditProfile.addEventListener('submit', editFormSubmitHandler);
