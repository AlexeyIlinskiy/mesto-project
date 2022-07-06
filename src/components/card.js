//Создадим и экспортируем класс Card
export default class Card {
  constructor ({ api, data, userId, handleCardClick, templateSelector }) {
    this._api = api;
    this._data = data;
    // this._name = data.name;
    // this._link = data.link;
    this._templateSelector = templateSelector;
    this._userId = userId;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._cardLikes = data.likes;

    this._handleCardClick = handleCardClick;

  }
  //Клонируем темплейт карточки
  _getElement() {
    this._card = document
      .querySelector(this._templateSelector)
      .content.querySelector('.item')
      .cloneNode(true);
  
    return this._card;
  }
  //Навесим слушатели на кнопки
  _setEventListeners() {
    //лайки
    this._element.querySelector('.item__btn-like').addEventListener ('click', () => {
    this._likeCard();
  })
    //удаление
    this._element.querySelector('.item__btn-delete').addEventListener ('click', () => {
    this._deleteCard();
    })
    //попап картинки 
    this._element.querySelector('.item__img').addEventListener ('click', () => {
    this._handleCardClick();
  })
}
  //Поработаем с лайками
  _likeCard () {
    const btnLike = this._element.querySelector('.item__btn-like');
    if (!btnLike.classList.contains('item__btn-like_active')) {
      this._api.addLikeCard(this._cardId)
      .then((data) => {
        this._likeCount.textContent = data.likes.length;
        this._btnLike.classList.add('item__btn-like_active');
        })
        .catch((err) => {
          console.log(err);
        }) 
    } else { 
      this._api.removeLikeCard(this._cardId)
      .then((data) => {
        this._likeCount.textContent = data.likes.length;
        this._btnLike.classList.remove('item__btn-like_active');
        })
        .catch((err) => {
        console.log(err);
        })
    }  
  };
  //Метод удаления карточки
  _deleteCard() {
    this._api.deleteCard(this._cardId)
    .then(() => {
      this._element.remove();
    })
  }
  //Публичный метод генерации карточки
  generate() {
    this._element = this._getElement();
    this._setEventListeners();

    this._image = this._element.querySelector('.item__img'); //Картинка
    this._title = this._element.querySelector('.item__title'); //Заголовок
  
    this._btnLike = this._element.querySelector('.item__btn-like'); //Кнопка лайка
    this._likeCount = this._element.querySelector('.item__like-count'); //Кол-во лайков
  
    this._deleteBtn = this._element.querySelector('.item__btn-delete'); // Корзина

    this._image.src = this._link;
    this._title.textContent = this._name;
    this._image.alt = this._name;

    this._likeCount.textContent = this._cardLikes.length;

  //Проверяем лайки и отмечаем свои лайки активными(и после перезагрузки страницы)!!!!
    if (this._cardLikes.some((like) => like._id === this._userId)) {
      this._btnLike.classList.add('item__btn-like_active')
    }

  //Добавляем кнопку удалить на карточку
  if (this._ownerId === this._userId ) {
    this._deleteBtn.style.display = 'block';
  }
  
    
    return this._element;
  }
}

/*

//Открытие картинки в полный размер
  itemElementImg.addEventListener('click',  function () {
    imgBigSize.src = link;
    imgBigSize.alt = name;
    imgPopupCaption.textContent = name;
    openPopup(imgPopupOpen);  
  });

  return itemElement;
};

*/