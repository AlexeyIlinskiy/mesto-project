//Валидация форм
 
//Класс валидатора
export default class FormValidator {
  constructor (config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector; //Кнопка сабмита
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;

    this._buttonElem = form.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(form.querySelectorAll(this._inputSelector));
  }
  
  // Добавление класса с ошибкой
  _showInputError (inputElem, errorMessage) {
    const errorElem = this._form.querySelector(`.${inputElem.id}-error`);
  
    inputElem.classList.add(this._inputErrorClass);
    errorElem.textContent = errorMessage;
    errorElem.classList.add(this._errorClass);
  };
  
  //Скрытие ошибок (удаление класса с ошибками)
  _hideInputError (inputElem) {
    const errorElem = this._form.querySelector(`.${inputElem.id}-error`);
    inputElem.classList.remove(this._inputErrorClass);
    errorElem.classList.remove(this._errorClass);
    errorElem.textContent = '';
  };
  
  //Метод определения корректности введённых данных
  _isValid (inputElem) {
    if (!inputElem.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    this._showInputError(inputElem, inputElem.validationMessage);
    } else {
    // Если проходит, скроем
    this._hideInputError(inputElem);
    }
  };
  
  //Установка слушателей событий для валидации
  _setEventListeners (form) {
    this._toggleButtonState();
    this._inputList.forEach((inputElem) => {
    inputElem.addEventListener('input', () => {
      this._isValid(inputElem);
      this._toggleButtonState();
      });
    });
  };
  
  //Метод проверяющий на валидность поля
  _hasInvalidInput (inputList) {
    return inputList.some((inputElem) => {
      return !inputElem.validity.valid;
    })
  };
  
  //Работа с кнопкой
  _toggleButtonState () {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElem.classList.add(this._inactiveButtonClass);
      this._buttonElem.disabled = true;
    } else {
      this._buttonElem.classList.remove(this._inactiveButtonClass);
      this._buttonElem.disabled = false;
    }
  };

  //Метод для очистки ошибок и управления кнопкой
  resetValidation() {
    this._inputList.forEach((inputElem) => {
      this._hideInputError(inputElem);
      this._toggleButtonState();
    });
  }
  
  //Метод включения валидации
  enableValidation () {
    this._setEventListeners();
  };  
} 