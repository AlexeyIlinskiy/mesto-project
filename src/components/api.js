const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-11',
  headers: {
    authorization: 'f08a7d2d-99b7-4264-bc75-9c8d3d90332f',
    'Content-Type': 'application/json'
  }
};

function checkResponse (res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

//Функция получения информации о пользователе с сервера
export function getUser() {
  return fetch (
    `${config.baseUrl}/users/me`, {
      method: 'GET',
      headers: config.headers
    })
    .then (checkResponse)
};

//Функция редактирования профиля
export function editUser(nameUser, jobUser) {
  return fetch (`${config.baseUrl}/users/me`, {
      method: 'PATCH', 
      headers: config.headers,
      body: JSON.stringify ({
        name: nameUser,
        about: jobUser
      })
    })
    .then (checkResponse)
};

//Функция редактирования аватара
export function editAvatar(avatar) {
  return fetch (`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH', 
      headers: config.headers,
      body: JSON.stringify ({
        avatar: avatar
      })
    })
    .then (checkResponse)
};

//Функция получения карточек с сервера
export function getInitialCards() {
  return fetch (
    `${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then (checkResponse)
};

//Функция добавления новой карточки
export function addNewCard(name, link) {
  return fetch (`${config.baseUrl}/cards`, {
      method: 'POST', 
      headers: config.headers,
      body: JSON.stringify ({
        name: name,
        link: link
      })
    })
    .then (checkResponse)
};

//Функция лайков у карточки:
export function addLikeCard(idCard) { 
  return fetch (`${config.baseUrl}/cards/likes/${idCard}`, { 
      method: 'PUT',  
      headers: config.headers, 
    }) 
    .then (checkResponse)
};

export function removeLikeCard(idCard) {
  return fetch (`${config.baseUrl}/cards/likes/${idCard}`, {
      method: 'DELETE', 
      headers: config.headers,
    })
    .then (checkResponse)
};

export function deleteCard(idCard) {
  return fetch (`${config.baseUrl}/cards/${idCard}`, {
      method: 'DELETE', 
      headers: config.headers,
    })
    .then (checkResponse)
  };