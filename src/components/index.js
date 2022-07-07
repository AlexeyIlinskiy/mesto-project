//Подключим стили
import '../styles/index.css';

//Подключим переменные
import {
  galleryItems,
  imgPopupOpen,
  popupEditProfile,
  popupUpdateAvatar,
  popupAddItem,
  btnEditProfile,
  btnEditProfileSubmit,
  btnUpdateAvatar,
  btnAddItem,
  formEditProfile,
  nameInput,
  jobInput,
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
  config
} from './constants.js';

import Api from './Api.js'
import UserInfo from './UserInfo.js';
import Card from './Card.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import FormValidator from './FormValidator.js';


//Данные для api
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-11',
  headers: {
    authorization: 'f08a7d2d-99b7-4264-bc75-9c8d3d90332f',
    'Content-Type': 'application/json'
  }
});

let userId = '';

//Получим пользователя и карточки
Promise.all([api.getUser(), api.getInitialCards()])
  .then(([user, cards]) => {
    userId = user._id;
    userInfo.setUserInfo(user);
    cardsList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  })

//Получаем экземпляр класса для пользователя
const userInfo = new UserInfo({ nameUser, jobUser, urlAvatarUser });

//Получаем экземпляр класса для карточек
const cardsList = new Section ({ 
  renderer: (data) => {
    const card = new Card ({
      api,
      data, 
      userId, 
      handleCardClick: () => {
        const popupWithImage = new PopupWithImage(imgPopupOpen, data);
        popupWithImage.open();
      },
      templateSelector: '#item-template'})
      const cardElement = card.generate();
      cardsList.setItem(cardElement);}
}, galleryItems)

//Редактирование профиля
const formEditUser = new PopupWithForm(popupEditProfile, {
  handleSubmit: () => {
    btnEditProfileSubmit.textContent = "Сохранение...";
    api.editUser(nameInput.value, jobInput.value)
    .then((data) => {
    userInfo.setUserInfo(data);
    })
    .catch((err) => {
    console.log(err)})
    .finally(() => {
    btnEditProfileSubmit.textContent = "Сохранить";
    formEditUser.close();
    });
  }
});

btnEditProfile.addEventListener('click', () => {
  nameInput.value = nameUser.textContent;
  jobInput.value = jobUser.textContent;
  formEditUser.open();
});

//Редактирование аватара
const formEditAvatar = new PopupWithForm(popupUpdateAvatar, {
  handleSubmit: () => {
    btnUpdateAvatarSubmit.textContent = "Сохранение...";
    api.editAvatar(urlAvatarInput.value)
    .then((data) => {
    userInfo.setUserInfo(data);
    })
    .catch((err) => {
    console.log(err)})
    .finally(() => {
    btnUpdateAvatarSubmit.textContent = "Сохранить";
    formEditAvatar.close();
    });
  }
});

btnUpdateAvatar.addEventListener('click', () => {
  formEditAvatar.open();
});

const formNewCard = new PopupWithForm(popupAddItem, {
  handleSubmit: (data) => {
    btnImgNewSubmit.textContent = "Сохранение...";
    api.addNewCard(data)
    // .then((data) => {console.log(data)})
    .then((data) => {
    const newCard = new Card ({
      api,
      data, 
      userId, 
      handleCardClick: () => {
        const popupWithImage = new PopupWithImage(imgPopupOpen, data);
        popupWithImage.open();
      },
      templateSelector: '#item-template'})
      const newCardElement = newCard.generate(data);
      cardsList.setItem(newCardElement);
}, galleryItems)
    .catch((err) => {
    console.log(err)})
    .finally(() => {
    btnImgNewSubmit.textContent = "Сохранить";
    formNewCard.close();
    });
  }
})

btnAddItem.addEventListener('click', () => {
  formNewCard.open();
});

// функция валидации данных
function startValidation() {
  const forms = Array.from(document.querySelectorAll('.form')); // массив форм
  forms.forEach((form) => {
      const validator = new FormValidator(config, form);
      validator.enableValidation();
  });
}

startValidation();
