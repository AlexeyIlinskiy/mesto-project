//Функция получения карточек с сервера, которые загрузятся по умолчанию

function getInitialCards() {
  return fetch ('https://nomoreparties.co/v1/plus-cohort-11/cards', {
    method: 'GET',
    headers: {
      authorization: 'f08a7d2d-99b7-4264-bc75-9c8d3d90332f',
     'Content-Type': 'application/json'
    }
  })
    .then (res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};



export {
  getInitialCards
};