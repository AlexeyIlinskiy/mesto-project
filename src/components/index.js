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
  validParams,
} from './constants.js';

//Подключим валидацию форм
import { enableValidation } from './FormValidator.js';

import Api from './Api.js'
import UserInfo from './UserInfo.js';
import Card from './Card.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';


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

const formEditUser = new PopupWithForm(popupEditProfile, {
  handleSubmit: (data) => {
    btnEditProfileSubmit.textContent = "Сохранение...";
    api.editUser(data)
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

const formEditAvatar = new PopupWithForm(popupUpdateAvatar, {
  handleSubmit: (data) => {
    btnUpdateAvatarSubmit.textContent = "Сохранение...";
    api.editAvatar(data)
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
<<<<<<< Updated upstream
    .then((data) => {
    const newCard = new Card ({ 
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
          }
    }, galleryItems)
    const newCardElement = newCard.generate(data);
    cardsList.setItem(newCardElement);
    })
=======
    .then((data) => {console.log(data)})
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
>>>>>>> Stashed changes
    .catch((err) => {
    console.log(err)})
    .finally(() => {
    btnImgNewSubmit.textContent = "Сохранить";
    formNewCard.close();
    });
  }
<<<<<<< Updated upstream
});

btnAddItem.addEventListener('click', () => {
  formNewCard.open();
});

/*
//Редактирование профиля
 function handleProfileFormSubmit (evt) {
  renderLoading(true, btnEditProfileSubmit, 'Сохранение...');
  evt.preventDefault();
  
  editUser(nameInput.value, jobInput.value)
    .then(() => {
      nameUser.textContent = nameInput.value;
      jobUser.textContent = jobInput.value; 
      closePopup(popupEditProfile); 
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, btnEditProfileSubmit, 'Сохранить');
  })
};

formEditProfile.addEventListener('submit', handleProfileFormSubmit);

//Обновление аватара
function handleUpdateAvatar (evt) {
  renderLoading(true, btnUpdateAvatarSubmit, 'Сохранение...');
  evt.preventDefault();
  
  editAvatar(urlAvatarInput.value)
    .then(() => {
      urlAvatarUser.src = urlAvatarInput.value;
      closePopup(popupUpdateAvatar); 
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, btnUpdateAvatarSubmit, 'Сохранить');
    })
};

formUpdateAvatar.addEventListener('submit', handleUpdateAvatar);

//Дадим пользователю добавить карточку
formImgNew.addEventListener('submit', function(evt) {
  renderLoading(true, btnImgNewSubmit, 'Сохранение...');  
  evt.preventDefault();
  
  addNewCard (itemTitleInput.value, itemLinkInput.value)
    .then ((card) => {
      galleryItems.prepend(createCard(itemLinkInput.value, itemTitleInput.value, card._id, card.owner._id, card.likes));
      btnImgNewSubmit.classList.add(validParams.inactiveButtonClass);
      btnImgNewSubmit.setAttribute('disabled', '');
      formImgNew.reset();

      closePopup(popupAddItem);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, btnImgNewSubmit, 'Создать');
    })  
});

//Открытие попапов
//1. редактирования профиля
btnEditProfile.addEventListener('click', function () {
  nameInput.value = nameUser.textContent.trim();
  jobInput.value = jobUser.textContent.trim();
  openPopup(popupEditProfile);
});

//2. обновления аватара
btnUpdateAvatar.addEventListener('click', function () {
  urlAvatarInput.value = urlAvatarUser.src.trim();
  openPopup(popupUpdateAvatar);
});

//3. добавления карточки
btnAddItem.addEventListener('click', function () {
  openPopup(popupAddItem);
});


//Изменение надписи на кнопке в момент загрузки
function renderLoading(isLoading, button, defaultText) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = defaultText;
  }
};

enableValidation(validParams);
*/
=======
})

btnAddItem.addEventListener('click', () => {
  formNewCard.open();
});
>>>>>>> Stashed changes
