let editBtnProfile = document.querySelector('.profile__edit-button');
let closeBtnProfile = document.querySelector('.form-edit-profile__close-icon')
let formEditProfile = document.querySelector('#popup-edit-profile');

let addBtnItem = document.querySelector('.profile__add-button')
let closeBtnItem = document.querySelector('.form-new-item__close-icon')
let formAddItem = document.querySelector('#popup-add-item');

//Откроем окно редактирования профиля
editBtnProfile.onclick = function() {
  formEditProfile.classList.add('popup_opened');
}

//Закроем окно редактирования профиля кликом на крестик
closeBtnProfile.onclick = function() {
  formEditProfile.classList.remove('popup_opened');
}

//Редактирование профиля
const formElement = document.querySelector('.form-edit-profile');
const nameInput = document.querySelector('#form-edit-profile-name');
const jobInput = document.querySelector('#form-edit-profile-about');

function formSubmitHandler (evt) {
  evt.preventDefault();
  
  nameInput.value;
  jobInput.value;

}

formElement.addEventListener('submit', formSubmitHandler);

//Откроем окно добавления карточки
addBtnItem.onclick = function() {
  formAddItem.classList.add('popup_opened');
}

//Закроем окно добавления карточки кликом на крестик
closeBtnItem.onclick = function() {
  formAddItem.classList.remove('popup_opened');
}