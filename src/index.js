//Подключим стили
import './styles/index.css';

//Подключим переменные
import {
  formEditProfile,
  formAddItem,
  btnEditProfile,
  btnAddItem,
  formElement,
  nameInput,
  jobInput,
  nameUser,
  jobUser,
  formImgNew,
  itemLinkInput,
  itemTitleInput
} from './components/utils.js'

//Подключим работу с модальными окнами
import { 
  openPopup, 
  closePopup } from './components/modal.js';


//Подключим работу с карточками
import {
  initialCards,
  galleryItems,
  createCard,
  renderCard
} from './components/card.js';

//Подлючим валидацию форм
import {
  validParams,
  enableValidation,
} from './components/validate.js';

//Редактирование профиля
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameUser.textContent = nameInput.value;
  jobUser.textContent = jobInput.value;
  closePopup(formEditProfile);
}

formElement.addEventListener('submit', formSubmitHandler);

//Выведем 6 карточек по умолчанию
initialCards.forEach(function(elem) {
  const card = createCard(elem.link, elem.name);
  renderCard(card, galleryItems);
});

//Дадим пользователю добавить карточку
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

enableValidation(validParams); 


