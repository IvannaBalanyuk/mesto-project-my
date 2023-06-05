import {
  page,
  buttonSelectors,
  cardSelectors,
} from './constants.js';

export default class Card {
  constructor(data, userId, templateSelector, imageClickHandler, likeClickHandler, deleteClickHandler) {
    this.userId = userId;
    this._id = data._id;
    this.likes = data.likes;
    this._link = data.link;
    this._name = data.name;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._imageClickHandler =  imageClickHandler;
    this._likeClickHandler = likeClickHandler;
    this._deleteClickHandler = deleteClickHandler;
  }

  // Получение разметки карточки
  _getElement() {
    this._cardElement = page
      .querySelector(this._templateSelector)
      .content
      .querySelector(cardSelectors.cardSelector)
      .cloneNode(true);
    return this._cardElement;
  }

  // Навешивание слушателей
  _setEventListeners() {
    this._imageElement.addEventListener('click', () => {
      this._imageClickHandler(this._name, this._link);
    });
    this._likeButtonElement.addEventListener('click', () => {
      this._likeClickHandler(this);
    });
    this._deleteButtonElement.addEventListener('click', () => {
      this._deleteClickHandler(this);
    });
  }

  // Проверка наличия лайка пользователя
  checkLikesData() {
    return this.likes.some((like) => like._id === this.userId);
  }

  // Отрисовка счетчика лайков
  renderLikesData() {
    if (this.checkLikesData()) {
      this._likeButtonElement.classList.add(buttonSelectors.buttonLikeActiveClass);
      this._likesCounter.textContent = this.likes.length;
    } else {
      this._likeButtonElement.classList.remove(buttonSelectors.buttonLikeActiveClass);
      this._likesCounter.textContent = this.likes.length;
    }
  }

  // Создание карточки
  create() {
    this._cardElement = this._getElement();
    this._nameElement = this._cardElement.querySelector(cardSelectors.nameSelector);
    this._imageElement = this._cardElement.querySelector(cardSelectors.imageSelector);
    this._likeButtonElement = this._cardElement.querySelector(buttonSelectors.buttonLikeSelector);
    this._deleteButtonElement = this._cardElement.querySelector(buttonSelectors.buttonDeleteSelector);
    this._likesCounter = this._cardElement.querySelector(cardSelectors.likesCounterSelector);

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._nameElement.textContent = this._name;

    if (this._ownerId !== this.userId) this._deleteButtonElement.remove();
    this.renderLikesData();
    this._setEventListeners();

    return this._cardElement;
  }

  // Удаление карточки
  delete() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
