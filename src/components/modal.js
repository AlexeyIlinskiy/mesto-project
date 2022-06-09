const btnClosePopup = document.querySelectorAll('.popup__btn-close');

//Работаем с модальными окнами

//Открытие окна
function openPopup(popup) {
  popup.classList.add('popup_opened');

//Закрытие по кнопке клавиатуры Esc
  document.addEventListener('keydown', function(evt) {
    if (evt.key === 'Escape') {
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

export {
  btnClosePopup,
  openPopup,
  closePopup,};
