import { openPopup } from "./modal.js";

import {
  itemTemplate,
  imgPopupOpen,
  imgBigSize,
  imgPopupCaption,
  galleryItems
 } from "./utils.js";

 import {
   dislikeCard,
   likeCard
 } from './api.js';

//Создадим карточку
function createCard (link, name, cardId, likes, ownerId) {  
  const itemElement = itemTemplate.cloneNode(true);
  const itemElementImg = itemElement.querySelector('.item__img'); //Выберем все картинки карточек
  const itemElementName = itemElement.querySelector('.item__title'); //Выберем названия карточек

  itemElementImg.src = link;
  itemElementName.textContent = name;
  itemElementImg.alt = name;
  itemElementImg.id = cardId;

  const likeCount = itemElement.querySelector('.item__like-count');

  const btnLike = itemElement.querySelector('.item__btn-like');

  btnLike.addEventListener('click', function (evt) {
    if (!evt.target.classList.contains('item__btn-like_active')) {
      evt.target.classList.add('item__btn-like_active');
      likeCard(cardId, likeCount);
    } else {
      evt.target.classList.remove('item__btn-like_active');
      dislikeCard(cardId,likeCount);
    }
    
  });
 
  likeCount.textContent = likes;
  
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

//Функция, которая вставлять карточки в указанный нами контейнер
function renderCard(card, container) {
  container.prepend(card);
};

//Функция, которая собирает данные карточки
function initialCards(data) {
  data.forEach(function(elem) {
    const card = createCard(elem.link, elem.name, elem._id, elem.likes.length, elem.owner._id);
    renderCard(card, galleryItems);
  });
};


export {
  createCard,
  renderCard,
  initialCards
};