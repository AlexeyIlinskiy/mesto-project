//Здесь разместим объявление переменных
 
//Соберём все попапы
export const popups = document.querySelectorAll('.popup');
 
//Всё для работы с карточками
 
//Переменные для работы c карточками
export const itemTemplate = document.querySelector('#item-template').content;
export const galleryItems = document.querySelector('.gallery__items'); //Выберем контейнер с размещениями всех карточек
 
//Переменные для работы с большой картинкой
export const imgPopupOpen = document.querySelector('#popup-img');
export const imgBigSize = document.querySelector('.img-popup__img');
export const imgPopupCaption = document.querySelector('.img-popup__caption');
 
//Попапы
export const popupEditProfile = document.querySelector('#popup-edit-profile');
export const popupAddItem = document.querySelector('#popup-add-item');
export const popupUpdateAvatar = document.querySelector('#popup-update-avatar');
 
//Кнопки
export const btnEditProfile = document.querySelector('.profile__edit-button');
export const btnAddItem = document.querySelector('.profile__add-button');
export const btnUpdateAvatar = document.querySelector('.profile__avatar-update-button');
 
//Редактирование профиля
export const formEditProfile = document.querySelector('#form-edit-profile');
export const nameInput = document.querySelector('#name-profile-input');
export const jobInput = document.querySelector('#about-profile-input');
export const nameUser = document.querySelector('.profile__name');
export const jobUser = document.querySelector('.profile__about');
export const btnEditProfileSubmit = formEditProfile.querySelector('#form-edit-profile-btn-submit');
 
 
//Обновление аватара
export const formUpdateAvatar = document.querySelector('#form-update-avatar');
export const urlAvatarInput = document.querySelector('#url-avatar-input');
export const urlAvatarUser = document.querySelector('.profile__avatar');
export const btnUpdateAvatarSubmit = formUpdateAvatar.querySelector('#form-update-avatar-btn-submit');
 
//Добавление карточки пользователем
export const formImgNew = document.querySelector('#form-new-item');
export const itemLinkInput = document.querySelector('#url-item-input'); //Выберем поле ввода линка на картинку
export const itemTitleInput = document.querySelector('#name-item-input'); //Выберем поле ввода названия картинки
export const btnImgNewSubmit = formImgNew.querySelector('.form__button');
 
//Объект настроек c классами и селекторами для валидации
export const config = {
 form: '.form',
 inputSelector: '.form__input',
 submitButtonSelector: '.form__button',
 inactiveButtonClass: 'form__button_disabled',
 inputErrorClass: 'form__input_type_error',
 errorClass: 'form__input-error_active'
};