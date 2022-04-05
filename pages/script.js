const editBtnProfile = document.querySelector('.profile__edit-button');
const closeBtnProfile = document.querySelector('.form-edit-profile__close-icon')
const formEditProfile = document.querySelector('#popup-edit-profile');

const addBtnItem = document.querySelector('.profile__add-button')
const closeBtnItem = document.querySelector('.form-new-item__close-icon')
const formAddItem = document.querySelector('#popup-add-item');

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
let nameUser = document.querySelector('.profile__name');
let jobUser = document.querySelector('.profile__about');

function formSubmitHandler (evt) {
  evt.preventDefault();

  nameUser.textContent = nameInput.value;
  jobUser.textContent = jobInput.value;

  console.log(nameInput.value);
  formEditProfile.classList.remove('popup_opened');
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

//Массив для добавления карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Переменные для работы с добавлением карточек
const ElementFormAddItem = document.querySelector('.form-new-item'); //Выберем форму добавления карточки
const galleryItems = document.querySelector('.gallery__items'); //Выберем контейнер с размещениями всех карточек
const itemTemplate = document.querySelector('#item-template').content; //Выберем содержимое шаблона добавления картинки для клонирования
const itemLinkInput = document.querySelector('#form-new-item-image'); //Выберем поле ввода линка на картинку
const itemTitleInput = document.querySelector('#form-new-item-name'); //Выберем поле ввода названия картинки
const formViewImg = document.querySelector('.form-view-img');
const imgBigSize = document.querySelector('.img-popup');
const imgPopupCaption = document.querySelector('.img-popup__caption');

//Функция вывода 6 карточек по умолчанию
initialCards.forEach(function (element) {
  const itemElement = itemTemplate.querySelector('.item').cloneNode(true);

  itemElement.querySelector('.item__img').src = element.link;
  itemElement.querySelector('.item__title').textContent = element.name;

  itemElement.querySelector('.item__btn-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('item__btn-like_active');
  });
  
  itemElement.querySelector('.item__btn-delete').addEventListener('click', function (e) {
    e.target.closest('.item').remove(itemElement);
  });
  
  itemElement.querySelector('.item__img').addEventListener('click', function () {
    popupImg.classList.add('popup_opened', 'popup_opacity');
    imgBigSize.src = element.link;
    imgPopupCaption.textContent = element.name;
  });

  galleryItems.append(itemElement);
})

//Функция добавления карточки пользователем

function addItem(evt) {
  evt.preventDefault();

  const itemElement = itemTemplate.querySelector('.item').cloneNode(true);

  itemElement.querySelector('.item__img').src = itemLinkInput.value;
  itemElement.querySelector('.item__title').textContent = itemTitleInput.value;

  itemElement.querySelector('.item__btn-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('item__btn-like_active');
  });

  itemElement.querySelector('.item__btn-delete').addEventListener('click', function (e) {
    e.target.closest('.item').remove(itemElement);
  });

  itemElement.querySelector('.item__img').addEventListener('click', function () {
    popupImg.classList.add('popup_opened', 'popup_opacity');
    imgBigSize.src = itemLinkInput.value;
    imgPopupCaption.textContent = itemTitleInput.value;
  });

  galleryItems.prepend(itemElement);
  
  formAddItem.classList.remove('popup_opened');
}

ElementFormAddItem.addEventListener('submit', addItem);

//Работаем с попапом картинок
const popupImg = document.querySelector('#popup-img');
const closeBtnImg = document.querySelector('.img-popup__close-icon');


//Закроем окно редактирования профиля кликом на крестик
closeBtnImg.addEventListener('click', function () {
  popupImg.classList.remove('popup_opened', 'popup_opacity');
})