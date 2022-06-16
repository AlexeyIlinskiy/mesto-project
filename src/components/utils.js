//Здесь разместим объявление переменных

//Соберём все попапы
const popups = document.querySelectorAll('.popup');

//Всё для работы с карточками

//Переменные для работы c карточками
const itemTemplate = document.querySelector('#item-template').content;
const galleryItems = document.querySelector('.gallery__items'); //Выберем контейнер с размещениями всех карточек

//Переменные для работы с большой картинкой
 const imgPopupOpen = document.querySelector('#popup-img');
 const imgBigSize = document.querySelector('.img-popup__img');
 const imgPopupCaption = document.querySelector('.img-popup__caption');

//Попапы
const popupEditProfile = document.querySelector('#popup-edit-profile'); 
const popupAddItem = document.querySelector('#popup-add-item');
const popupUpdateAvatar = document.querySelector('#popup-update-avatar');

//Кнопки
const btnEditProfile = document.querySelector('.profile__edit-button');
const btnAddItem = document.querySelector('.profile__add-button');
const btnUpdateAvatar = document.querySelector('.profile__avatar-update-button');

//Редактирование профиля
const formEditProfile = document.querySelector('#form-edit-profile');
const nameInput = document.querySelector('#name-profile-input');
const jobInput = document.querySelector('#about-profile-input');
const nameUser = document.querySelector('.profile__name');
const jobUser = document.querySelector('.profile__about');
const btnEditProfileSubmit = formEditProfile.querySelector('#form-edit-profile-btn-submit');


//Обновление аватара
const formUpdateAvatar = document.querySelector('#form-update-avatar');
const urlAvatarInput = document.querySelector('#url-avatar-input');
const urlAvatarUser = document.querySelector('.profile__avatar');
const btnUpdateAvatarSubmit = formUpdateAvatar.querySelector('#form-update-avatar-btn-submit');

//Добавление карточки пользователем
const formImgNew = document.querySelector('#form-new-item');
const itemLinkInput = document.querySelector('#url-item-input'); //Выберем поле ввода линка на картинку
const itemTitleInput = document.querySelector('#name-item-input'); //Выберем поле ввода названия картинки
const btnImgNewSubmit = formImgNew.querySelector('.form__button');

//Объект настроек c классами и селекторами для валидации
const validParams = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

export {
  popups,
  itemTemplate,
  galleryItems,
  imgPopupOpen,
  imgBigSize,
  imgPopupCaption,
  popupEditProfile,
  popupUpdateAvatar,
  popupAddItem,
  btnEditProfile,
  btnUpdateAvatar,
  btnAddItem,
  formEditProfile,
  nameInput,
  jobInput,
  btnEditProfileSubmit,
  nameUser,
  jobUser,
  formUpdateAvatar,
  urlAvatarInput,
  urlAvatarUser,
  btnUpdateAvatarSubmit,
  formImgNew,
  btnImgNewSubmit,
  itemLinkInput,
  itemTitleInput,
  validParams
};