import { openPopup } from "./modal";

import {
  itemTemplate,
  imgPopupOpen,
  imgBigSize,
  imgPopupCaption
 } from "./utils";


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
  createCard,
  renderCard
};