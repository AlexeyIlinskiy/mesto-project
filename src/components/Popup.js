export default class Popup {
  constructor(popup) {
    this._popup = popup;
    this._closePopupEsc = (evt) => this._handleEscClose(evt);
  }

   //Открытие попапа
  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners(); //убрать в index.js
    // document.addEventListener('keydown', this._closePopupEsc);
  }

   //Функция закрытия всех попапов и удаление обработчика кнопки Esc
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closePopupEsc);
  }

   //Функция закрытия попапа по Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  
   //Слушатели событий (Закроем попапы по крестику и по клику)
  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__btn-close')) {
        this.close();
      }
    });
    document.addEventListener('keydown', this._closePopupEsc);
  }
}


//setEventListeners - вызвать в index.js
