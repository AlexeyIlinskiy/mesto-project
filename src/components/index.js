//Подключим стили
import '../styles/index.css';
 
//Подключим переменные
import {
  galleryItems,
  imgPopupOpen,
  popupEditProfile,
  popupUpdateAvatar,
  popupAddItem,
  formEditProfile,
  formUpdateAvatar,
  formImgNew,
  btnEditProfile,
  btnUpdateAvatar,
  btnAddItem,
  nameInput,
  jobInput,
  nameUser,
  jobUser,
  urlAvatarInput,
  urlAvatarUser,
  itemLinkInput,
  itemTitleInput,
  config
} from '../utils/constants.js';
 
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

//Запустим валидацию форм
const editUserValidate = new FormValidator (config, formEditProfile);
const editAvatarValidate = new FormValidator(config, formUpdateAvatar);
const addNewCardValidate = new FormValidator(config, formImgNew);

editUserValidate.enableValidation();
editAvatarValidate.enableValidation();
addNewCardValidate.enableValidation();

 
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
        popupWithImage.setEventListeners();
      },
      templateSelector: '#item-template'})
      const cardElement = card.generate();
      cardsList.setItem(cardElement);
  }
}, galleryItems)
 
//Редактирование профиля
const formEditUser = new PopupWithForm(popupEditProfile, {
  handleSubmit: () => {
    formEditUser.renderLoading(true);
    api.editUser(nameInput.value, jobInput.value)
    .then((data) => {
    userInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.log(err)})
    .finally(() => {
      formEditUser.renderLoading(false);
      formEditUser.close();
    });
  }
});
formEditUser.setEventListeners(); 

btnEditProfile.addEventListener('click', () => {
  const {about, name} = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
  editUserValidate.resetValidation();
  formEditUser.open();
});
 
//Редактирование аватара
const formEditAvatar = new PopupWithForm(popupUpdateAvatar, {
  handleSubmit: () => {
    formEditAvatar.renderLoading(true);
    api.editAvatar(urlAvatarInput.value)
    .then((data) => {
    userInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.log(err)})
    .finally(() => {
      formEditAvatar.renderLoading(false);
      formEditAvatar.close();
    });
  }
});
formEditAvatar.setEventListeners();

btnUpdateAvatar.addEventListener('click', () => {
  editAvatarValidate.resetValidation();
  formEditAvatar.open();
});
 
//Добавление новой карточки
const formNewCard = new PopupWithForm(popupAddItem, {
  handleSubmit: () => {
    formNewCard.renderLoading(true);
    api.addNewCard(itemTitleInput.value, itemLinkInput.value)
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
      formNewCard.renderLoading(false);
      formNewCard.close();
    });
  }
})
formNewCard.setEventListeners();


btnAddItem.addEventListener('click', () => {
  addNewCardValidate.resetValidation();
  formNewCard.open();
});