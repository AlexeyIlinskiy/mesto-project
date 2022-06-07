const btnEditProfile = document.querySelector('.profile__edit-button');
const formEditProfile = document.querySelector('#popup-edit-profile');

const btnAddItem = document.querySelector('.profile__add-button')
const formAddItem = document.querySelector('#popup-add-item');

//Функция открытия всех popup-окон
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//Функция закрытия всех popup-окон
function closePopup(popup) {
  popup.classList.remove('popup_opened');
} 

//Редактирование профиля
const formElement = document.querySelector('.form-edit-profile');
const nameInput = document.querySelector('#form-edit-profile-name');
const jobInput = document.querySelector('#form-edit-profile-about');
const nameUser = document.querySelector('.profile__name');
const jobUser = document.querySelector('.profile__about');

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameUser.textContent = nameInput.value;
  jobUser.textContent = jobInput.value;
  closePopup(formEditProfile);
}

formElement.addEventListener('submit', formSubmitHandler);
//Импортируем картинки для webpack
const arkhyz = new URL ('../src/images/arkhyz.jpg', import.meta.url);
const chelyab = new URL ('../src/images/chelyabinsk-oblast.jpg', import.meta.url);
const ivanovo = new URL ('../src/images/ivanovo.jpg', import.meta.url);
const kamchatka = new URL ('../src/images/kamchatka.jpg', import.meta.url);
const kholmogory = new URL ('../src/images/kholmogorsky-rayon.jpg', import.meta.url);
const baikal = new URL ('../src/images/baikal.jpg', import.meta.url);


//Массив для добавления карточек
const initialCards = [
  {
    name: 'Архыз',
    link: arkhyz
  },
  {
    name: 'Челябинская область',
    link: chelyab
  },
  {
    name: 'Иваново',
    link: ivanovo
  },
  {
    name: 'Камчатка',
    link: kamchatka
  },
  {
    name: 'Холмогорский район',
    link: kholmogory
  },
  {
    name: 'Байкал',
    link: baikal
  }
];

//Переменные для работы c карточками
const galleryItems = document.querySelector('.gallery__items'); //Выберем контейнер с размещениями всех карточек
const itemTemplate = document.querySelector('#item-template').content; //Выберем содержимое шаблона добавления картинки для клонирования

//Переменные для работы с большой картинкой
 const imgPopupOpen = document.querySelector('#popup-img');
 const imgBigSize = document.querySelector('.img-popup__img');
 const imgPopupCaption = document.querySelector('.img-popup__caption');

//Создадим шаблон карточки
function createCard (link, name) {  
  const itemElement = itemTemplate.cloneNode(true);
  const itemElementImg = itemElement.querySelector('.item__img'); //Выберем все картинки карточек
  const itemElementName = itemElement.querySelector('.item__title'); //Выберем названия карточек

  itemElementImg.src = link;
  itemElementName.textContent = name;
  itemElementImg.alt = name;
  
  const btnLike = itemElement.querySelector('.item__btn-like');
  btnLike.addEventListener('click', function (e) {
    e.target.classList.toggle('item__btn-like_active');
  });
 
  const btnDelete = itemElement.querySelector('.item__btn-delete');
  btnDelete.addEventListener('click', function (e) {
    e.target.closest('.item').remove(itemElement);
  });

//Открытие картинки в полный размер
  const imgFullSize = itemElement.querySelector('.item__img');
  imgFullSize.addEventListener('click',  function (e) {
    imgBigSize.src = link;
    imgBigSize.alt = name;
    imgPopupCaption.textContent = name;
    openPopup(imgPopupOpen);  
  });

  return itemElement;
}
//Функция, которая будет рендерить вставлять карточки в указанный нами контейнер
function renderCard(card, container) {
  container.prepend(card);
}

//Выведем 6 карточек по умолчанию
initialCards.forEach(function(element) {
  const card = createCard(element.link, element.name);
  renderCard(card, galleryItems);
});

//Дадим пользователю добавить карточку
const itemLinkInput = document.querySelector('#form-new-item-image'); //Выберем поле ввода линка на картинку
const itemTitleInput = document.querySelector('#form-new-item-name'); //Выберем поле ввода названия картинки
const formImgNew = document.querySelector('.form-new-item');

formImgNew.addEventListener('submit', function(evt) {
  evt.preventDefault();

  const card = createCard(itemLinkInput.value, itemTitleInput.value);
  renderCard(card, galleryItems);
  closePopup(formAddItem);
});

//Открытие окна редактирования профиля
btnEditProfile.addEventListener('click', function () {
  nameInput.value = nameUser.textContent.trim();
  jobInput.value = jobUser.textContent.trim();
  openPopup(formEditProfile)
});

//Открытие окна добавления карточки
btnAddItem.addEventListener('click', function () {
  itemLinkInput.value = '';
  itemTitleInput.value = '';
  openPopup(formAddItem)
});

//Закрытие всех попапов через крестик
const btnClosePopup = document.querySelectorAll('.popup__btn-close');

btnClosePopup.forEach(function(btn) {
  btn.addEventListener('click', function (e) {
    closePopup(e.target.closest('.popup'));
  })
})

// //Обработчик события клика по кнопке Esc
// const popupContainer = document.querySelector('.popup__container');


// function keyHandler(evt) {
//   if (evt.key === 'Escape') {
//     closePopup(evt.target.closest('.popup'));
//   }
// }
// formEditProfile.addEventListener('keydown', keyHandler);


// //formEditProfile.addEventListener('keydown', (evt) => console.log(evt.key));

// //Выберем все элементы у которых есть класс popup
// //Если элемент имеет класс popup_opened, то при клике на Escape надо удалять класс
