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

  // Константы удаления карточек
    const noCardsElement = page.querySelector('.no-cards');

  // Константы просмотра картинки
    const popupShowImage = page.querySelector('.popup_type_show-image');
    const popupImage = page.querySelector('.popup__image');
    const popupImageCaption = page.querySelector('.popup__image-caption');


// ОБЩАЯ ФУНКЦИОНАЛЬНОСТЬ

  // Открытие модального окна
    function openPopup(popup) {
      popup.classList.add('popup_opened');
      page.classList.add('page_non-scroll');
    }

  // Закрытие модального окна
    function closePopup(popup) {
      popup.classList.remove('popup_opened');
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
    function createPopupShowImage(placeName, imageLink) {
      openPopup(popupShowImage);
      popupImage.src = imageLink;
      popupImage.alt = placeName;
      popupImageCaption.textContent = placeName;
    };

  // Слушатель событий для открытия окна просмотра картинки
    cardsContainer.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('card__place-image')) {
        const targetCard = evt.target.closest('.card');
        const targetPlaceName = targetCard.querySelector('.card__place-name').textContent;
        const targetImageLink = evt.target.src;

        createPopupShowImage(targetPlaceName, targetImageLink);
      };
    });


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
      noCardsElement.classList.remove('no-cards_hidden');
    }

  // Удаление карточки
    function deleteCard(evt) {
      if (evt.target.classList.contains('button-delete')) {
        evt.target.closest('.card').remove();

        if (!cardsContainer.hasChildNodes()) {
          renderNoCards();
        };
      };
    }

  // Слушатель событий для удаления карточки
    cardsContainer.addEventListener('click', deleteCard);

  // Создание карточки
    function createCard(cardData) {
      const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
      const cardPlaceName = cardElement.querySelector('.card__place-name');
      const cardPlaceImage = cardElement.querySelector('.card__place-image');

      cardPlaceImage.src = cardData.link;
      cardPlaceImage.alt = cardData.name;
      cardPlaceName.textContent = cardData.name;

      return cardElement;
    }

  // Добавление карточки в контейнер с карточками
    function addCard(cardData) {
      const cardElement = createCard(cardData);
      cardsContainer.prepend(cardElement);
    }

  // Добавление карточек "из коробки" (при загрузке страницы)
    cardsInitial.forEach(card => {
      addCard(card);
    });

  // Слушатель событий для кнопки открытия окна добавления карточки
    buttonAdd.addEventListener('click', () => {
      openPopup(popupAddCard);
      formAddCard.reset();
    });

  // Обработчик "отправки" формы добавления карточки
    function addFormSubmitHandler(evt) {
      evt.preventDefault();

      if (evt.target.name === 'addCard') {
        const cardObj = {name: formInputPlaceName.value, link: formInputImageLink.value};
        addCard(cardObj);
        closePopup(popupAddCard);
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

      if (evt.target.name === 'editProfile') {
        editProfile();
        closePopup(popupEditProfile);
      };
    }

  // Слушатель событий для формы редактирования профиля
    formEditProfile.addEventListener('submit', editFormSubmitHandler);
