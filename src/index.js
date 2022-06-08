import './styles/index.css'; // импорт главного файла стилей

//Формы
const formEditProfile = document.querySelector('#popup-edit-profile'); 
const formAddItem = document.querySelector('#popup-add-item');
const imgPopupOpen = document.querySelector('#popup-img');


//Кнопки
const btnEditProfile = document.querySelector('.profile__edit-button');
const btnAddItem = document.querySelector('.profile__add-button');
const btnClosePopup = document.querySelectorAll('.popup__btn-close');


//Работаем с модальными окнами

//Открытие окна
function openPopup(popup) {
  popup.classList.add('popup_opened');

//Закрытие по кнопке клавиатуры Esc
  document.addEventListener('keydown', function(evt) {
    if (evt.key === 'Escape' && popup.classList.contains('popup_opened')) {
      popup.classList.remove('popup_opened');
    }
  });
  
//Закрытие по клику
  popup.addEventListener('click', function() {
    if (popup.classList.contains('popup_opened')) {
      popup.classList.remove('popup_opened');
    }
  });

//Закрытие по крестику
  btnClosePopup.forEach(function(btn) {
    btn.addEventListener('click', function (evt) {
      closePopup(evt.target.closest('.popup'));
    });
  });

//Останавливаем всплытие, чтобы не закрывалось модальное окно
  const popupsContainers = document.querySelectorAll('.popup__container');
  popupsContainers.forEach(function(elem) {
    elem.addEventListener('click', function(evt) {
      evt.stopPropagation();
    });
  });

}

//Функция закрытия всех popup-окон
function closePopup(popup) {
  popup.classList.remove('popup_opened');
} 

//Редактирование профиля
const formElement = document.querySelector('#form-edit-profile');
const nameInput = document.querySelector('#name-profile-input');
const jobInput = document.querySelector('#about-profile-input');
const nameUser = document.querySelector('.profile__name');
const jobUser = document.querySelector('.profile__about');

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameUser.textContent = nameInput.value;
  jobUser.textContent = jobInput.value;
  closePopup(formEditProfile);
}

formElement.addEventListener('submit', formSubmitHandler);

//Импортируем картинки, которые хранятся локально
const arkhyz = new URL ('./images/arkhyz.jpg', import.meta.url);
const chelyab = new URL ('./images/chelyabinsk-oblast.jpg', import.meta.url);
const ivanovo = new URL ('./images/ivanovo.jpg', import.meta.url);
const kamchatka = new URL ('./images/kamchatka.jpg', import.meta.url);
const kholmogory = new URL ('./images/kholmogorsky-rayon.jpg', import.meta.url);
const baikal = new URL ('./images/baikal.jpg', import.meta.url);


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

//Выведем 6 карточек по умолчанию
initialCards.forEach(function(elem) {
  const card = createCard(elem.link, elem.name);
  renderCard(card, galleryItems);
});

//Дадим пользователю добавить карточку
const formImgNew = document.querySelector('#form-new-item');
const itemLinkInput = document.querySelector('#url-item-input'); //Выберем поле ввода линка на картинку
const itemTitleInput = document.querySelector('#name-item-input'); //Выберем поле ввода названия картинки

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

//Валидация форм

// Добавляем класс с ошибкой
const showInputError = (formElem, inputElem, errorMessage) => {
  const errorElem = formElem.querySelector(`.${inputElem.id}-error`);

  inputElem.classList.add('form__input_type_error');
  errorElem.textContent = errorMessage;
  errorElem.classList.add('form__input-error_active');
};

//Удаляем класс с ошибкой
const hideInputError = (formElem, inputElem) => {
  const errorElem = formElem.querySelector(`.${inputElem.id}-error`);
  inputElem.classList.remove('form__input_type_error');
  errorElem.classList.remove('form__input-error_active');
  errorElem.textContent = '';
};

const isValid = (formElem, inputElem) => {
  if (!inputElem.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElem, inputElem, inputElem.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElem, inputElem);
  }
};

const setEventListeners = (formElem) => {
  const inputList = Array.from(formElem.querySelectorAll('.form__input'));
  const buttonElem = formElem.querySelector('.form__button');
  

  inputList.forEach((inputElem) => {
    inputElem.addEventListener('input', () => {
      isValid(formElem, inputElem);
      toggleButtonState(inputList, buttonElem);
    });
  });
}; 

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));

  formList.forEach((formElem) => {
    formElem.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElem);
  });
};

// Вызовем функцию
enableValidation(); 

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElem) => {
    return !inputElem.validity.valid;
  })
}; 

const toggleButtonState = (inputList, buttonElem) => {
  if (hasInvalidInput(inputList)) {
    buttonElem.classList.add('form__button_disabled');
  } else {
    buttonElem.classList.remove('form__button_disabled');
  }
}; 