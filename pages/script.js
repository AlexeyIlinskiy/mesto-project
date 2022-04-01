//let editBtnProfile = document.querySelector('#profile__edit-button'); //Кнопка открытия окна редактирования профиля
//let clsBtnProfile = document.querySelector('#form-edit-profile__close-icon'); //Кнопка закрытия окна редактирования профиля
//let addBtnItem = document.querySelector('#profile__add-button'); //Кнопка открытия добавления карточки
//let clsBtnItem = document.querySelector('#form-new-item__close-icon'); //Кнопка закрытия добавления карточки

//Откроем окно редактирования профиля
document.getElementById('profile__edit-button').onclick = function() {
  document.getElementById('popup-edit-profile').classList.add('popup_opened');
}

//Закроем окно редактирования профиля кликом на крестик
document.getElementById('form-edit-profile__close-icon').onclick = function() {
  document.getElementById('popup-edit-profile').classList.remove('popup_opened');
}


//Откроем окно добавления карточки
document.getElementById('profile__add-button').onclick = function() {
  document.getElementById('popup-add-item').classList.add('popup_opened');
}

//Закроем окно добавления карточки кликом на крестик
document.getElementById('form-new-item__close-icon').onclick = function() {
  document.getElementById('popup-add-item').classList.remove('popup_opened');
}