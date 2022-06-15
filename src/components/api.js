import {
  nameUser,
  jobUser,
  urlAvatarUser
} from './utils.js';

import {
  initialCards
} from './card.js';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-11/',
  headers: {
    authorization: 'f08a7d2d-99b7-4264-bc75-9c8d3d90332f',
    'Content-Type': 'application/json'
  }
}

//Функция получения карточек с сервера
function getInitialCards() {
  return fetch (
    `${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then (res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      initialCards(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

//Функция получения информации о пользователе с сервера
function getUser() {
  return fetch (
    `${config.baseUrl}/users/me`, {
      headers: config.headers
    })
    .then (res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      nameUser.textContent = result.name;
      jobUser.textContent = result.about;
      urlAvatarUser.src = result.avatar;
      })
    .catch((err) => {
      console.log(err);
    });
};

//Функция редактирования профиля
function editUser(nameUser, jobUser) {
  return fetch (`${config.baseUrl}/users/me`, {
      method: 'PATCH', 
      headers: config.headers,
      body: JSON.stringify ({
        name: nameUser,
        about: jobUser
      })
    })
    .then (res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

//Функция редактирования аватара
function editAvatar(avatar) {
  return fetch (`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH', 
      headers: config.headers,
      body: JSON.stringify ({
        avatar: avatar
      })
    })
    .then (res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

//Функция добавления новой карточки
function apiAddNewCard(name, link) {
  return fetch (`${config.baseUrl}/cards`, {
      method: 'POST', 
      headers: config.headers,
      body: JSON.stringify ({
        name: name,
        link: link
      })
    })
    .then (res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

//Функция лайков у карточки:
function likeCard(idCard, likeCount) {
  return fetch (`${config.baseUrl}/cards/likes/${idCard}`, {
      method: 'PUT', 
      headers: config.headers,
    })
    .then (res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then ((res) => {
      likeCount.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
};

function dislikeCard(idCard, likeCount) {
  return fetch (`${config.baseUrl}/cards/likes/${idCard}`, {
      method: 'DELETE', 
      headers: config.headers,
    })
    .then (res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then ((res) => {
      likeCount.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
};

export {
  getInitialCards,
  getUser,
  editUser,
  editAvatar,
  apiAddNewCard,
  likeCard,
  dislikeCard
};