// ОБЪЯВЛЕНИЕ ГЛОБАЛЬНЫХ ПЕРЕМЕННЫХ

  const page = document.querySelector('.page');

  // Константы редактирования профиля
    const userName = page.querySelector('.profile__user-name');
    const userAbout = page.querySelector('.profile__user-about');
    const editButton = page.querySelector('.button-edit');
    const popupEditProfile = page.querySelector('.popup_type_edit-profile');
    const editProfileForm = page.querySelector('.form_type_edit-profile');
    const userNameInput = editProfileForm.querySelector('.input-text_type_user-name');
    const userAboutInput = editProfileForm.querySelector('.input-text_type_user-about');

  // Константы добавления карточек
    const cardsContainer = page.querySelector('.cards__list');
    const cardTemplate = document.querySelector('#card-template').content;
    const addButton = page.querySelector('.button-add');
    const popupAddCard = page.querySelector('.popup_type_add-card');
    const addCardForm = page.querySelector('.form_type_add-card');
    const placeNameInput = addCardForm.querySelector('.input-text_type_place-name');
    const imageLinkInput = addCardForm.querySelector('.input-text_type_image-link');

  // Константы просмотра картинки
    const cardsImages = page.querySelectorAll('.card__place-image');
    const popupShowImage = page.querySelector('.popup_type_show-image');
    const popupImage = page.querySelector('.popup__image');
    const popupImageCaption = page.querySelector('.popup__image-caption');

  // Массив кнопок закрытия модальных окон
    const closeButtons = page.querySelectorAll('.button-close');


// ОБЩАЯ ФУНКЦИОНАЛЬНОСТЬ

  // Открытие модального окна
    function openPopup(popup) {
      popup.classList.add('popup_opened');
      page.classList.add('page_non-scroll');
    };

  // Закрытие модального окна
    function closePopup(popup) {
      popup.classList.remove('popup_opened');
      page.classList.remove('page_non-scroll');
    };

  // Слушатель событий для кнопок закрытия модальных окон
    closeButtons.forEach(button => button.addEventListener('click', (evt) => {
      const targetButton = evt.target;
      const targetPopup = targetButton.closest('.popup');
      closePopup(targetPopup);
    }));


// ФУНКЦИОНАЛЬНОСТЬ ПРОСМОТРА КАРТИНКИ

  // Наполнение модального окна просмотра картинки
    function createPopupShowImage(placeName, placeImageLink) {
      openPopup(popupShowImage);
      popupImage.src = placeImageLink;
      popupImage.alt = placeName;
      popupImageCaption.textContent = placeName;
    };


// ФУНКЦИОНАЛЬНОСТЬ ДЛЯ КАРТОЧЕК

  // Добавление/удаление лайка
    function likeCard(evt) {
      evt.target.classList.toggle('button-like_active');
    };

  // Добавление блока "Нет добавленных карточек" (если список карточек пуст)
    function renderNoCards() {
      const noCardsElement = page.querySelector('.no-cards');
      noCardsElement.classList.remove('no-cards_hidden');
    };

  // Удаление карточки
    function deleteCard(evt) {
      const targetCard = evt.target.closest('.card');
      targetCard.remove();

      const cards = page.querySelectorAll('.card');
      console.log(cards.length);
      if (!cards.length) {
        renderNoCards();
      };
    };

  // Создание карточки
    function createCard(placeName, placeImageLink) {
      const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
      const cardPlaceName = cardElement.querySelector('.card__place-name');
      const cardPlaceImage = cardElement.querySelector('.card__place-image');

      cardPlaceImage.src = placeImageLink;
      cardPlaceImage.alt = placeName;
      cardPlaceName.textContent = placeName;

      // слушатель событий на кнопку лайка
      cardElement.querySelector('.button-like').addEventListener('click', likeCard);

      // слушатель событий на кнопку удаления карточки
      cardElement.querySelector('.button-delete').addEventListener('click', deleteCard);

      // слушатель событий на картинку
      cardPlaceImage.addEventListener('click', () => createPopupShowImage(placeName, placeImageLink));

      return cardElement;
    };

  // Добавление карточки в контейнер с карточками
    function addCard(placeName, placeImageLink) {
      const cardElement = createCard(placeName, placeImageLink);
      cardsContainer.prepend(cardElement);
    }

  // Добавление карточек "из коробки" (при загрузке страницы)
    initialCards.forEach(card => {
      const name = card.name;
      const link = card.link;

      addCard(name, link);
    });

  // Слушатель событий для кнопки открытия окна добавления карточки
    addButton.addEventListener('click', () => {
      openPopup(popupAddCard);

      placeNameInput.value = '';
      imageLinkInput.value = '';
    });

  // Обработчик "отправки" формы добавления карточки
    function addFormSubmitHandler(evt) {
      evt.preventDefault();
      const targetForm = evt.target; // сохранение в константу цели события submit

      if (targetForm.classList.contains('form_type_add-card')
      && (placeNameInput.value)
      && (imageLinkInput.value)) {
        addCard(placeNameInput.value, imageLinkInput.value);
        closePopup(popupAddCard);
      } else {
        console.log('false');
        return false;
      };
    };

  // Слушатель событий для формы добавления карточки
    addCardForm.addEventListener('submit', addFormSubmitHandler);


// ФУНКЦИОНАЛЬНОСТЬ РЕДАКТИРОВАНИЯ ПРОФИЛЯ

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
    };

  // Обработчик "отправки" формы редактирования профиля
    function editFormSubmitHandler(evt) {
      evt.preventDefault();
      const targetForm = evt.target; // сохранение в константу цели события submit

      if (targetForm.classList.contains('form_type_edit-profile')
      && (userNameInput.value)
      && (userAboutInput.value)) {
        editProfile();
        closePopup(popupEditProfile);
      } else {
        console.log('false');
        return false;
      };
    };

  // Слушатель событий для формы редактирования профиля
    editProfileForm.addEventListener('submit', editFormSubmitHandler);
