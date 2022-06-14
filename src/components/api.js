import {
  nameUser,
  jobUser,
  urlAvatarUser,
  formEditProfile,
  nameInput,
  jobInput,
  popupEditProfile
} from './utils.js';

import {
  closePopup
} from './modal.js';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-11/',
  headers: {
    authorization: 'f08a7d2d-99b7-4264-bc75-9c8d3d90332f',
    'Content-Type': 'application/json'
  }
}

//Функция получения карточек с сервера, которые загрузятся по умолчанию
function getInitialCards() {
  return fetch (`${config.baseUrl}/cards`, {headers: config.headers})
    .then (res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};

//Функция получения информации о пользователе с сервера
function getUser() {
  return fetch (`${config.baseUrl}/users/me`, {headers: config.headers})
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
  return fetch ('https://nomoreparties.co/v1/plus-cohort-11/users/me', {
      method: 'PATCH', 
      headers: {
        authorization: 'f08a7d2d-99b7-4264-bc75-9c8d3d90332f',
        'Content-Type': 'application/json'
      },
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
}


export {
  getInitialCards,
  getUser,
  editUser
};