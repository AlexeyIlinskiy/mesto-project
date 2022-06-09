import { openPopup } from "./modal";

//Импортируем картинки, которые хранятся локально
const arkhyz = new URL ('../images/arkhyz.jpg', import.meta.url);
const chelyab = new URL ('../images/chelyabinsk-oblast.jpg', import.meta.url);
const ivanovo = new URL ('../images/ivanovo.jpg', import.meta.url);
const kamchatka = new URL ('../images/kamchatka.jpg', import.meta.url);
const kholmogory = new URL ('../images/kholmogorsky-rayon.jpg', import.meta.url);
const baikal = new URL ('../images/baikal.jpg', import.meta.url);


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

//Создадим карточку
function createCard (link, name) {  
  const itemElement = itemTemplate.cloneNode(true);
  const itemElementImg = itemElement.querySelector('.item__img'); //Выберем все картинки карточек
  const itemElementName = itemElement.querySelector('.item__title'); //Выберем названия карточек

  itemElementImg.src = link;
  itemElementName.textContent = name;
  itemElementImg.alt = name;
  
  const btnLike = itemElement.querySelector('.item__btn-like');
  btnLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('item__btn-like_active');
  });
 
  const btnDelete = itemElement.querySelector('.item__btn-delete');
  btnDelete.addEventListener('click', function (evt) {
    evt.target.closest('.item').remove(itemElement);
  });

//Открытие картинки в полный размер
itemElementImg.addEventListener('click',  function () {
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

export {
  initialCards,
  galleryItems,
  itemTemplate,
  imgPopupOpen,
  imgBigSize,
  imgPopupCaption,
  createCard,
  renderCard
};