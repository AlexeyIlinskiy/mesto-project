import {nameInput, jobInput, urlAvatarInput, itemTitleInput, itemLinkInput} from './constants.js'

export default class Api {
  constructor( { baseUrl, headers } ) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

//Метод получения карточек с сервера
  getInitialCards() {
  return fetch (
    `${this._baseUrl}/cards`, {
    headers: this._headers
  })
    .then (this._checkResponse)
};

//Метод получения информации о пользователе с сервера
  getUser() {
  return fetch (
    `${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then (this._checkResponse)
};

//Метод редактирования профиля
  editUser() {
  return fetch (`${this._baseUrl}/users/me`, {
      method: 'PATCH', 
      headers: this._headers,
      body: JSON.stringify ({
        name: nameInput.value,
        about: jobInput.value
      })
    })
    .then (this._checkResponse)
};

//Метод редактирования аватара
  editAvatar() {
  return fetch (`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH', 
      headers: this._headers,
      body: JSON.stringify ({
        avatar: urlAvatarInput.value,
      })
    })
    .then (this._checkResponse)
};

//Функция добавления новой карточки
  addNewCard() {
  return fetch (`${this._baseUrl}/cards`, {
      method: 'POST', 
      headers: this._headers,
      body: JSON.stringify ({
        name: itemTitleInput.value,
        link: itemLinkInput.value
      })
    })
    .then (this._checkResponse)
};

//Функция лайков у карточки:
addLikeCard(cardId) { 
  return fetch (`${this._baseUrl}/cards/likes/${cardId}`, { 
      method: 'PUT',  
      headers: this._headers, 
    }) 
    .then (this._checkResponse)
};

removeLikeCard(cardId) {
  return fetch (`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE', 
      headers: this._headers,
    })
    .then (this._checkResponse)
};

deleteCard(cardId) {
  return fetch (`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE', 
      headers: this._headers,
    })
    .then (this._checkResponse)
  };
}

