class Api {
  constructor( { baseUrl, headers } ) {
    this._basUrl = baseUrl;
    this._headers = headers;
  }

//Метод получения карточек с сервера
  getInitialCards() {
  return fetch (
    `${this.baseUrl}/cards`, {
    headers: this.headers
  })
    .then (checkResponse)
};

//Метод получения информации о пользователе с сервера
  getUser() {
  return fetch (
    `${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.headers
    })
    .then (checkResponse)
};

//Метод редактирования профиля
  editUser(nameUser, jobUser) {
  return fetch (`${this.baseUrl}/users/me`, {
      method: 'PATCH', 
      headers: this.headers,
      body: JSON.stringify ({
        name: nameUser,
        about: jobUser
      })
    })
    .then (checkResponse)
};

//Метод редактирования аватара
  editAvatar(avatar) {
  return fetch (`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH', 
      headers: this.headers,
      body: JSON.stringify ({
        avatar: avatar
      })
    })
    .then (checkResponse)
};

//Функция добавления новой карточки
  addNewCard(name, link) {
  return fetch (`${this.baseUrl}/cards`, {
      method: 'POST', 
      headers: this.headers,
      body: JSON.stringify ({
        name: name,
        link: link
      })
    })
    .then (checkResponse)
};

//Функция лайков у карточки:
addLikeCard(idCard) { 
  return fetch (`${this.baseUrl}/cards/likes/${idCard}`, { 
      method: 'PUT',  
      headers: this.headers, 
    }) 
    .then (checkResponse)
};

removeLikeCard(idCard) {
  return fetch (`${this.baseUrl}/cards/likes/${idCard}`, {
      method: 'DELETE', 
      headers: this.headers,
    })
    .then (checkResponse)
};

deleteCard(idCard) {
  return fetch (`${this.baseUrl}/cards/${idCard}`, {
      method: 'DELETE', 
      headers: this.headers,
    })
    .then (checkResponse)
  };

_checkResponse (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

}













