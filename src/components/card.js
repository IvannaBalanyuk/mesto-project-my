export default class Card {
  _name;
  _userId;

  constructor(
    data,
    userId,
    templateSelector,
    cardSelectors,
    clickHandlerForImage,
    clickHandlerForLike,
    clickHandlerForDelete
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._cardSelectors = cardSelectors;
    this._clickHandlerForImage = clickHandlerForImage;
    this._clickHandlerForLike = clickHandlerForLike;
    this._clickHandlerForDelete = clickHandlerForDelete;
  }

  // Получение разметки карточки
  _getElement() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector(this._cardSelectors.cardSelector)
      .cloneNode(true);
  }

  // Навешивание слушателей
  _setEventListeners() {
    this._imageElement.addEventListener('click', () => {
      this._clickHandlerForImage(this._name, this._link);
    });
    this._likeButtonElement.addEventListener('click', () => {
      this._clickHandlerForLike(this);
    });
    this._deleteButtonElement.addEventListener('click', () => {
      this._clickHandlerForDelete(this);
    });
  }

  // Чтение из класса id карточки
  getCardId() {
    return this._cardId;
  }

  // Обновление информации о лайках (после постановки/снятия лайка пользователя)
  updateLikes(likesData) {
    this._likes = likesData;
  }

  // Проверка наличия лайка пользователя
  hasLikeFromUser() {
    return this._likes.some((like) => like._id === this._userId);
  }

  // Отрисовка счетчика лайков карточки
  renderLikes() {
    if (this.hasLikeFromUser()) {
      this._likeButtonElement.classList.add(this._cardSelectors.buttonLikeActiveClass);
      this._likesCounter.textContent = this._likes.length;
    } else {
      this._likeButtonElement.classList.remove(this._cardSelectors.buttonLikeActiveClass);
      this._likesCounter.textContent = this._likes.length;
    }
  }

  // Создание карточки
  create() {
    this._cardElement = this._getElement();
    this._nameElement = this._cardElement.querySelector(this._cardSelectors.nameSelector);
    this._imageElement = this._cardElement.querySelector(this._cardSelectors.imageSelector);
    this._likeButtonElement = this._cardElement.querySelector(this._cardSelectors.buttonLikeSelector);
    this._deleteButtonElement = this._cardElement.querySelector(this._cardSelectors.buttonDeleteSelector);
    this._likesCounter = this._cardElement.querySelector(this._cardSelectors.likesCounterSelector);

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._nameElement.textContent = this._name;

    if (this._ownerId !== this._userId) this._deleteButtonElement.remove();
    this.renderLikes();
    this._setEventListeners();

    return this._cardElement;
  }

  // Удаление карточки
  delete() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
