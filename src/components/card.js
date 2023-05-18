import {
  myId,
  buttonSelectors,
  noCardsElement,
  popupAddCard,
  cardsContainer,
  cardSelectors,
  cardTemplate,
  formAddCard,
  formInputPlaceName,
  formInputImageLink,
} from './constants.js';

import {
  getCardsData,
  postCardData,
  deleteCardData,
  putLikeData,
  deleteLikeData
} from './api.js';

import {
  closePopup,
  renderLoading,
} from './utils.js';

import {
  createPopupShowImage,
} from './modal.js';

// Переключение состояния кнопки лайка
  const toggleLikeState = (button) => {
    button.classList.toggle(buttonSelectors.buttonLikeActiveClass);
  }

// Отрисовка счетчика лайков
  const renderLikesCounter = (cardElement, likesNumber) => {
    const likesCounter = cardElement.querySelector(cardSelectors.likesCounterSelector);
    likesCounter.textContent = likesNumber;
  }

// Добавление/удаление лайка
  const changeLikeStatus = (evt) => {
    const targetCard = evt.target.closest(cardSelectors.cardSelector);

    if(evt.target.name === 'hasMyLike') {
      evt.target.removeAttribute('name');
      deleteLikeData(targetCard.id)
        .then((data) => {
          return data;
        })

        .then((card) => {
          const likesNumberData = String(card.likes.length);
          renderLikesCounter(targetCard, likesNumberData);
        })

        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    } else {
      evt.target.setAttribute('name', 'hasMyLike');
      putLikeData(targetCard.id)
        .then((data) => {
          return data;
        })

        .then((card) => {
          const likesNumberData = String(card.likes.length);
          renderLikesCounter(targetCard, likesNumberData);
        })

        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    };
    toggleLikeState(evt.target);
  }

// Добавление блока "Нет добавленных карточек" (если список карточек пуст)
  const renderNoCards = () => {
    noCardsElement.classList.remove(cardSelectors.noCardsHiddenClass);
  }

// Удаление карточки
  const deleteCard = (evt) => {
    const targetCard = evt.target.closest(cardSelectors.cardSelector);

    deleteCardData(targetCard.id)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });

    targetCard.remove();
    if (!cardsContainer.hasChildNodes()) renderNoCards();
  }

// Создание разметки карточки
  const createCardMarkup = (cardData) => {
    const cardMarkup = cardTemplate.querySelector(cardSelectors.cardSelector).cloneNode(true);
    const cardPlaceName = cardMarkup.querySelector(cardSelectors.cardNameSelector);
    const cardPlaceImage = cardMarkup.querySelector(cardSelectors.cardImageSelector);
    const cardButtonLike = cardMarkup.querySelector(buttonSelectors.buttonLikeSelector);
    const cardButtonDelete = cardMarkup.querySelector(buttonSelectors.buttonDeleteSelector);

    cardPlaceImage.src = cardData.link;
    cardPlaceImage.alt = cardData.name;
    cardPlaceName.textContent = cardData.name;

    cardButtonLike.addEventListener('click', changeLikeStatus);
    cardButtonDelete.addEventListener('click', deleteCard);
    cardPlaceImage.addEventListener('click', createPopupShowImage);

    return cardMarkup;
  }

// Добавление карточки на страницу
  const addCard = (cardMarkup) => {
    cardsContainer.prepend(cardMarkup);
  }

// Обработчик "отправки" формы добавления карточки
  const addFormSubmitHandler = (evt) => {
    evt.preventDefault();
    renderLoading(true, formAddCard, 'Создать');

    const cardData = {name: formInputPlaceName.value, link: formInputImageLink.value};
    const cardElement = createCardMarkup(cardData);
    postCardData(formInputPlaceName.value, formInputImageLink.value)
      .then((data) => {
        return data;
      })

      .then((card) => cardElement.setAttribute('id', `${card._id}`))

      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })

      .finally((fin) => {
        renderLoading(false, formAddCard, 'Создать');
      });

    addCard(cardElement);
    closePopup(popupAddCard);
  }

// Добавление на страницу карточек с сервера
  const renderUploadedCards = () => {
    getCardsData()
    .then((data) => {
      return data;
    })

    .then((cards) => {
      cards.forEach(card => {
        const cardData = {name: card.name, link: card.link};
        const cardElement = createCardMarkup(cardData);
        cardElement.setAttribute('id', `${card._id}`);

        const buttonDelete = cardElement.querySelector(buttonSelectors.buttonDeleteSelector);
        if(card.owner._id !== myId) buttonDelete.remove();

        const hasMyLike = card.likes.some((like) => {
          return like._id === myId;
        });

        if(hasMyLike) {
          const buttonLike = cardElement.querySelector(buttonSelectors.buttonLikeSelector);
          buttonLike.setAttribute('name', 'hasMyLike');
          toggleLikeState(buttonLike);
        };

        const likesNumberData = String(card.likes.length);
        renderLikesCounter(cardElement, likesNumberData);

        addCard(cardElement);
      })
    })

    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  }


export {
  addCard,
  addFormSubmitHandler,
  renderUploadedCards,
}
