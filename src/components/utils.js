//Здесь разместим объявление переменных

//Формы
const formEditProfile = document.querySelector('#popup-edit-profile'); 
const formAddItem = document.querySelector('#popup-add-item');

//Кнопки
const btnEditProfile = document.querySelector('.profile__edit-button');
const btnAddItem = document.querySelector('.profile__add-button');

//Редактирование профиля
const formElement = document.querySelector('#form-edit-profile');
const nameInput = document.querySelector('#name-profile-input');
const jobInput = document.querySelector('#about-profile-input');
const nameUser = document.querySelector('.profile__name');
const jobUser = document.querySelector('.profile__about');

//Добавление карточки пользователем
const formImgNew = document.querySelector('#form-new-item');
const itemLinkInput = document.querySelector('#url-item-input'); //Выберем поле ввода линка на картинку
const itemTitleInput = document.querySelector('#name-item-input'); //Выберем поле ввода названия картинки


export {
  formEditProfile,
  formAddItem,
  btnEditProfile,
  btnAddItem,
  formElement,
  nameInput,
  jobInput,
  nameUser,
  jobUser,
  formImgNew,
  itemLinkInput,
  itemTitleInput
};