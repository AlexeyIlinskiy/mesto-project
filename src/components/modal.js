import { popups } from './utils.js';

//Работаем с модальными окнами

//Открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

//Функция закрытия всех попапов и удаление обработчика кнопки Esc
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};

//Функция закрытия попапа по Esc

function closePopupEsc (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

//Закроем попапы по крестику и по клику
popups.forEach (function(popup) {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__btn-close')) {
      closePopup(popup);
    };
  })
});

export {
  openPopup,
  closePopup
};
