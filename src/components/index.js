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