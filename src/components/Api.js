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
  
 //Редактирование профиля
  editUser(data) {
  return fetch (`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify ({
        name: data.name,
        about: data.about
      })
    })
    .then (this._checkResponse)
 };
  
 //Редактирование аватара
  editAvatar(data) {
  return fetch (`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify ({
        avatar: data.avatar
      })
    })
    .then (this._checkResponse)
 };
  
 //Добавление новой карточки
  addNewCard(data) {
  return fetch (`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify ({
        name: data.name,
        link: data.link
      })
    })
    .then (this._checkResponse)
 };
  
 //Добавление лайков карточки:
 addLikeCard(cardId) {
  return fetch (`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT', 
      headers: this._headers,
    })
    .then (this._checkResponse)
 };
 //Удаление лайков
 removeLikeCard(cardId) {
  return fetch (`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then (this._checkResponse)
 };
 //Удаление карточки
 deleteCard(cardId) {
  return fetch (`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then (this._checkResponse)
  };
 } 