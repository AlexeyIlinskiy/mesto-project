//Подключим стили
import '../styles/index.css';

//Подключим переменные
import {
  galleryItems,
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

import {
  getInitialCards,
  getUser,
  editUser,
  editAvatar,
  addNewCard
} from './api.js';

//Подключим работу с модальными окнами
import { openPopup, closePopup } from './modal.js';

//Подключим работу с карточками
import { createCard, renderCards } from './card.js';

//Подключим валидацию форм
import { enableValidation } from './validate.js';

export let userId = '';

//Получим пользователя и карточки
Promise.all([getUser(), getInitialCards()])
    .then(([user, card]) => {
      userId = user._id;
      nameUser.textContent = user.name;
      jobUser.textContent = user.about;
      urlAvatarUser.src = user.avatar;
      renderCards(card);
    })
    .catch((err) => {
        console.log(err);
    })

//Редактирование профиля
 function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  
  editUser(nameUser.textContent, jobUser.textContent)
    .then(() => {
      nameUser.textContent = nameInput.value;
      jobUser.textContent = jobInput.value;  
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(true, btnEditProfileSubmit, 'Сохранение...');
  })
  
  closePopup(popupEditProfile);
};

formEditProfile.addEventListener('submit', handleProfileFormSubmit);

//Открытие окна редактирования профиля
btnEditProfile.addEventListener('click', function () {
  nameInput.value = nameUser.textContent.trim();
  jobInput.value = jobUser.textContent.trim();
  renderLoading(false, btnEditProfileSubmit, 'Сохранить');
  openPopup(popupEditProfile);
});

//Открытие окна обновления аватара
btnUpdateAvatar.addEventListener('click', function () {
  urlAvatarInput.value = urlAvatarUser.src.trim();
  renderLoading(false, btnUpdateAvatarSubmit, 'Сохранить');
  openPopup(popupUpdateAvatar);
});

//Обновление аватара
function handleUpdateAvatar (evt) {
  evt.preventDefault();
  
  editAvatar(urlAvatarUser.src)
    .then(() => {
      urlAvatarUser.src = urlAvatarInput.value;  
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(true, btnUpdateAvatarSubmit, 'Сохранение...');
    })
  closePopup(popupUpdateAvatar);
};

formUpdateAvatar.addEventListener('submit', handleUpdateAvatar);

//Открытие окна добавления карточки
btnAddItem.addEventListener('click', function () {
  renderLoading(false, btnImgNewSubmit, 'Создать');
  openPopup(popupAddItem);
});

//Дадим пользователю добавить карточку
formImgNew.addEventListener('submit', function(evt) {
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
    renderLoading(true, btnImgNewSubmit, 'Сохранение...');    
    })  
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
