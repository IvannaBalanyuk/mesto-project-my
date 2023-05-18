// Конфиг для формирования запросов
  const config = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-24",
    headers: {
        authorization: "53e7280d-81b7-4e82-b5c1-fc2456f5c412",
        "Content-Type": "application/json",
    },
  };

// Проверка результата выполнения запроса
  const checkResult = (res) => {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

// Загрузка информации о пользователе с сервера
  const getProfileData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'GET',
      headers: config.headers,
    })
    .then((res) => {
      return checkResult(res);
    });
  }

// Отправка на сервер измененной информации о пользователе
  const patchProfileData = (userName, userAbout) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: userName,
        about: userAbout
      })
    })
    .then((res) => {
      return checkResult(res);
    });
  }

// Отправка на сервер обновленного аватара
  const patchAvatarData = (avatarLink) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatarLink,
      })
    })
    .then((res) => {
      return checkResult(res);
    });
  }

// Загрузка карточек с сервера
  const getCardsData = () => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'GET',
      headers: config.headers,
    })
    .then((res) => {
      return checkResult(res);
    });
  }

// Отправка на сервер информации о новой карточке
  const postCardData = (cardName, cardLink) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
    .then((res) => {
      return checkResult(res);
    });
  }

// Отправка на сервер информации об удалении карточки
  const deleteCardData = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then((res) => {
      return checkResult(res);
    });
  }

// Отправка на сервер информации о лайке
  const putLikeData = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}/`, {
      method: 'PUT',
      headers: config.headers
    })
    .then((res) => {
      return checkResult(res);
    });
  }

// Удаление с сервера информации о лайке
  const deleteLikeData = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}/`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then((res) => {
      return checkResult(res);
    });
  }


export {
  getProfileData,
  getCardsData,
  patchProfileData,
  patchAvatarData,
  postCardData,
  deleteCardData,
  putLikeData,
  deleteLikeData,
}
