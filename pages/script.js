let editBtnProfile = document.querySelector('#profile__edit-button'); //Кнопка открытия окна редактирования профиля
let clsBtnProfile = document.querySelector('#form-edit-profile__close-icon'); //Кнопка закрытия окна редактирования профиля
let addBtnItem = document.querySelector('#profile__add-button'); //Кнопка открытия добавления карточки
let clsBtnItem = document.querySelector('#form-new-item__close-icon'); //Кнопка закрытия добавления карточки

//Откроем окно редактирования профиля
editBtnProfile.addEventListener( "click" , () => 
  document.getElementById('popup-edit-profile').classList.add('popup_opened'));


//Закроем окно редактирования профиля кликом на крестик
clsBtnProfile.addEventListener( "click" , () => 
  document.getElementById('popup-edit-profile').classList.remove('popup_opened'));


//Откроем окно добавления карточки
addBtnItem.addEventListener( "click" , () => 
  document.getElementById('popup-add-item').classList.add('popup_opened'));


//Закроем окно добавления карточки кликом на крестик
clsBtnItem.addEventListener( "click" , () => 
  document.getElementById('popup-add-item').classList.remove('popup_opened'));