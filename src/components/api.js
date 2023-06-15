export default class Api {
  constructor({baseUrl, headers}){
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResult(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
    .then((res) => {
      return this._checkResult(res);
    });
  }

  getCardsData() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
    .then((res) => {
      return this._checkResult(res);
    });
  }

  patchUserData({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      })
    })
    .then((res) => {
      return this._checkResult(res);
    });
  }

  patchAvatarData({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      })
    })
    .then((res) => {
      return this._checkResult(res);
    });
  }

  postCardData({ name, link }) {
    return fetch(`${ this._baseUrl }/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
    .then((res) => {
      return this._checkResult(res);
    });
  }

  deleteCardData(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      return this._checkResult(res);
    });
  }

  putLikeData(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}/`, {
      method: 'PUT',
      headers: this._headers
    })
    .then((res) => {
      return this._checkResult(res);
    });
  }

  deleteLikeData(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}/`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      return this._checkResult(res);
    });
  }
}
