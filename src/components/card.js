import { addLikeCard, removeLikeCard, deleteCard } from './Api.js';
import { userId } from './index.js';
import { imgPopupOpen, imgBigSize, imgPopupCaption, itemTemplate, galleryItems } from "./Constants.js";
import { openPopup } from "./modal.js";

//Создадим карточку
function createCard (link, name, cardId, ownerId, cardLikes) {  
  const itemElement = itemTemplate.cloneNode(true);
  const itemElementImg = itemElement.querySelector('.item__img'); //Картинка
  const itemElementName = itemElement.querySelector('.item__title'); //Заголовок
  const btnLike = itemElement.querySelector('.item__btn-like'); //Кнопка лайка
  const likeCount = itemElement.querySelector('.item__like-count'); //Кол-во лайков

  itemElementImg.src = link;
  itemElementName.textContent = name;
  itemElementImg.alt = name;
  likeCount.textContent = cardLikes.length;

//Проверяем лайки и отмечаем свои лайки активными
  if (cardLikes) {
    likeCard(itemElement, likeCount, cardId);
    cardLikes.forEach((card) => {
        if (cardLikes.length > 0 && card._id === userId) {
            btnLike.classList.add('item__btn-like_active');
        }
    })
  } else {
    likeCount.textContent = 0;
  };

//Простановка и удаление лайков
  function likeCard (itemElement, likeCount, cardId) {
    const btnLike = itemElement.querySelector('.item__btn-like');
    btnLike.addEventListener('click', function (evt) {
      if (!evt.target.classList.contains('item__btn-like_active')) {
        addLikeCard(cardId) 
          .then((elem) => {
            evt.target.classList.add('item__btn-like_active');
            likeCount.textContent = elem.likes.length;
          })
          .catch((err) => {
            console.log(err);
          })          
      } else { 
        removeLikeCard(cardId)
        .then((elem) => {
          evt.target.classList.remove('item__btn-like_active');
          likeCount.textContent = elem.likes.length;
        }) 
        .catch((err) => {
          console.log(err);
        })
      }  
    });
  };

//Удаление карточки
  if (ownerId === userId ) {
    const btnDelete = itemElement.querySelector('.item__btn-delete');

    btnDelete.style.display = 'block';
    btnDelete.addEventListener('click', function (evt) {

    deleteCard(cardId)
      .then (() => {
        evt.target.closest('.item').remove(itemElement);
      })
      .catch((err) => {
        console.log(err);
      })
    });
  };

//Открытие картинки в полный размер
  itemElementImg.addEventListener('click',  function () {
    imgBigSize.src = link;
    imgBigSize.alt = name;
    imgPopupCaption.textContent = name;
    openPopup(imgPopupOpen);  
  });

  return itemElement;
};

//Функция, которая собирает данные карточки
function renderCards(cards) {
  cards.forEach((card) => {
    galleryItems.prepend(createCard(card.link, card.name, card._id, card.owner._id, card.likes));
  })
};

export { createCard, renderCards };