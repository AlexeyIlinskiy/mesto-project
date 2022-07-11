import Popup from './Popup.js';
 
export default class PopupWithForm extends Popup {
 constructor (popup, {handleSubmit}) {
   super(popup);
   this._form = this._popup.querySelector('.form');
   this._inputs = this._form.querySelectorAll('.form__input');
   this._submitButton = this._form.querySelector('.form__button');
   this._handleSubmit = handleSubmit;
 
 }
 
 _getInputValues() {
   this._data = {};
   this._inputs.forEach(input => {
   this._data[input.name] = input.value;
   })
  
   return this._data;
 }

 renderLoading(isLoading) {
  if (isLoading) {
    this._submitButton.textContent = 'Сохранение...';
  } else {
    this._submitButton.textContent = 'Сохранить';
  }
}
 
 setEventListeners() {
   super.setEventListeners();
   this._form.addEventListener('submit', (evt) => {
     evt.preventDefault();
     this._handleSubmit(this._getInputValues());
   })
 }

 //Выбираем все инпуты и добавляем в объект значения из разметки(профиля)
 setInputValues(getData) {
  this._inputs.forEach((input) => {
      input.value = getData[input.name];
  })
}
 
 close() {
   this._form.reset();
   super.close();
 }
}