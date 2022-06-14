//Подключим стили
import '../styles/index.css';

//Подключим переменные
import {
  galleryItems,
  popupEditProfile,
  popupUpdateAvatar,
  popupAddItem,
  btnEditProfile,
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
  formImgNew,
  btnImgNewSubmit,
  itemLinkInput,
  itemTitleInput,
  validParams,
} from './utils.js';

import {
  getInitialCards,
  getUser
} from './api.js';

//Подключим работу с модальными окнами
import { 
  openPopup, 
  closePopup } from './modal.js';


//Подключим работу с карточками
import {
  createCard,
  renderCard
} from './card.js';

//Подлючим валидацию форм
import {
  enableValidation,
} from './validate.js';


//Редактирование профиля
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  nameUser.textContent = nameInput.value;
  jobUser.textContent = jobInput.value;
  
  closePopup(popupEditProfile);
}

 formEditProfile.addEventListener('submit', handleProfileFormSubmit);

//Получение данных для профиля с сервера
// getUser()
//   .then((result) => {
//     nameUser.textContent = result.name;
//     jobUser.textContent = result.about;
//     urlAvatarUser.src = result.avatar;
//     })
//   .catch((err) => {
//     console.log(err);
//   });

//Обновление аватара
function handleUpdateAvatar (evt) {
  evt.preventDefault();
  
  urlAvatarUser.src = urlAvatarInput.value;
  closePopup(popupUpdateAvatar);
};

formUpdateAvatar.addEventListener('submit', handleUpdateAvatar);

//Выведем карточки по умолчанию
getInitialCards()
  .then((result) => {
    result.forEach(function(elem) {
      const card = createCard(elem.link, elem.name);
      renderCard(card, galleryItems);
    })
  })
  .catch((err) => {
    console.log(err);
  });

//Дадим пользователю добавить карточку
formImgNew.addEventListener('submit', function(evt) {
  evt.preventDefault();

  const card = createCard(itemLinkInput.value, itemTitleInput.value);
  renderCard(card, galleryItems);

  btnImgNewSubmit.classList.add(validParams.inactiveButtonClass);
  btnImgNewSubmit.setAttribute('disabled', '');
  formImgNew.reset();
  
  closePopup(popupAddItem);
});

//Открытие окна редактирования профиля
btnEditProfile.addEventListener('click', function () {
  nameInput.value = nameUser.textContent.trim();
  jobInput.value = jobUser.textContent.trim();
  openPopup(popupEditProfile);
});

//Открытие окна обновления аватара
btnUpdateAvatar.addEventListener('click', function () {
  urlAvatarInput.value = urlAvatarUser.src.trim();
  openPopup(popupUpdateAvatar);
});

//Открытие окна добавления карточки
btnAddItem.addEventListener('click', function () {
  openPopup(popupAddItem);
});

enableValidation(validParams);
getUser();