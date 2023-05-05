// ОБЩАЯ ФУНКЦИОНАЛЬНОСТЬ

  // Открытие модального окна
    function openPopup(popup) {
      popup.classList.add(popupSelectors.popupOpenedClass);
      page.classList.add(pageSelectors.nonScrollClass);
    }

  // Закрытие модального окна
    function closePopup(popup) {
      popup.classList.remove(popupSelectors.popupOpenedClass);
      page.classList.remove(pageSelectors.nonScrollClass);
    }

  // Слушатели событий для закрытия модальных окон
  page.addEventListener('click', (evt) => {
    if (evt.target.classList.contains(popupSelectors.popupClass) || evt.target.classList.contains(buttonSelectors.buttonCloseClass)) {
      closePopup(evt.target.closest(popupSelectors.popupSelector));
    };
  });

  page.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(page.querySelector(popupSelectors.popupOpenedSelector));
    };
  });


// ФУНКЦИОНАЛЬНОСТЬ ПРОСМОТРА КАРТИНКИ

  // Наполнение модального окна просмотра картинки
    function createPopupShowImage(placeName, imageLink) {
      openPopup(popupShowImage);
      popupImageElement.src = imageLink;
      popupImageElement.alt = placeName;
      popupCaptionElement.textContent = placeName;
    };

  // Слушатель событий для открытия окна просмотра картинки
    cardsContainer.addEventListener('click', (evt) => {
      if (evt.target.classList.contains(cardSelectors.cardImageClass)) {
        const targetCard = evt.target.closest(cardSelectors.cardSelector);
        const targetPlaceName = targetCard.querySelector(cardSelectors.cardNameSelector).textContent;
        const targetImageLink = evt.target.src;

        createPopupShowImage(targetPlaceName, targetImageLink);
      };
    });


// ФУНКЦИОНАЛЬНОСТЬ ДЛЯ КАРТОЧЕК

  // Добавление/удаление лайка
    function likeCard(evt) {
      if (evt.target.classList.contains(buttonSelectors.buttonLikeClass)) {
        evt.target.classList.toggle(buttonSelectors.buttonLikeActiveClass);
      };
    }

  // Слушатель событий для добавления/удаления лайка
    cardsContainer.addEventListener('click', likeCard);

  // Добавление блока "Нет добавленных карточек" (если список карточек пуст)
    function renderNoCards() {
      noCardsElement.classList.remove(cardSelectors.noCardsHiddenClass);
    }

  // Удаление карточки
    function deleteCard(evt) {
      if (evt.target.classList.contains(buttonSelectors.buttonDeleteClass)) {
        evt.target.closest(cardSelectors.cardSelector).remove();

        if (!cardsContainer.hasChildNodes()) {
          renderNoCards();
        };
      };
    }

  // Слушатель событий для удаления карточки
    cardsContainer.addEventListener('click', deleteCard);

  // Создание карточки
    function createCard(cardData) {
      const cardElement = cardTemplate.querySelector(cardSelectors.cardSelector).cloneNode(true);
      const cardPlaceName = cardElement.querySelector(cardSelectors.cardNameSelector);
      const cardPlaceImage = cardElement.querySelector(cardSelectors.cardImageSelector);

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
    initialCards.forEach(initialCardData => {
      addCard(initialCardData);
    });

  // Слушатель событий для кнопки открытия окна добавления карточки
    buttonAdd.addEventListener('click', (evt) => {
      openPopup(popupAddCard);
      const buttonElement = formAddCard.querySelector(formSelectors.submitButtonSelector);
      buttonElement.classList.add(formSelectors.inactiveButtonClass);
      formAddCard.reset();
    });

  // Обработчик "отправки" формы добавления карточки
    function addFormSubmitHandler(evt) {
      evt.preventDefault();

      if (evt.target.name === formNames.formAddCardName) {
        const newCardData = {name: formInputPlaceName.value, link: formInputImageLink.value};
        addCard(newCardData);
        closePopup(popupAddCard);
      };
    }

  // Слушатель событий для формы добавления карточки
    formAddCard.addEventListener('submit', addFormSubmitHandler);


// ФУНКЦИОНАЛЬНОСТЬ РЕДАКТИРОВАНИЯ ПРОФИЛЯ

  // Слушатель событий для кнопки открытия окна редактирования профиля
    buttonEdit.addEventListener('click', popup => {
      openPopup(popupEditProfile);
      formInputUserName.value = profileUserName.textContent;
      formInputUserAbout.value = profileUserAbout.textContent;
    });

  // Редактирование профиля
    function editProfile() {
      profileUserName.textContent = formInputUserName.value;
      profileUserAbout.textContent = formInputUserAbout.value;
    }

  // Обработчик "отправки" формы редактирования профиля
    function editFormSubmitHandler(evt) {
      evt.preventDefault();

      if (evt.target.name === formNames.formEditProfileName) {
        editProfile();
        closePopup(popupEditProfile);
      };
    }

  // Слушатель событий для формы редактирования профиля
    formEditProfile.addEventListener('submit', editFormSubmitHandler);


// ФУНКЦИОНАЛЬНОСТЬ ВАЛИДАЦИИ ФОРМ

    const showInputError = (formElement, inputElement, errorMessage) => {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(formSelectors.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(formSelectors.errorActiveClass);
    };

    const hideInputError = (formElement, inputElement) => {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(formSelectors.inputErrorClass);
      errorElement.classList.remove(formSelectors.errorActiveClass);
      errorElement.textContent = '';
    };

    const checkInputValidity = (formElement, inputElement) => {
      if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
      } else {
        hideInputError(formElement, inputElement);
      }
    };

    const hasInvalidInput = (inputList) => {
      return inputList.some(inputElement => {
        return !inputElement.validity.valid;
      });
    }

    const toggleButtonState = (inputList, buttonElement) => {
      if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(formSelectors.inactiveButtonClass);
      } else {
        buttonElement.classList.remove(formSelectors.inactiveButtonClass);
      };
    }

    const setEventListeners = (formElement) => {
      const inputList = Array.from(formElement.querySelectorAll(formSelectors.inputSelector));
      const buttonElement = formElement.querySelector(formSelectors.submitButtonSelector);

      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
          checkInputValidity(formElement, inputElement);
          toggleButtonState(inputList, buttonElement);
        });
      });
    };

    const enableValidation = () => {
      const formList = Array.from(document.querySelectorAll(formSelectors.formSelector));

      formList.forEach(formElement => {
        formElement.addEventListener('submit', evt => {
          evt.preventDefault();
        });
        setEventListeners(formElement);
      });
    };

    enableValidation();
