//Валидация форм

//Класс валидатора
export default class FormValidator {
  constructor (config, form) { 
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
  }

// Добавление класса с ошибкой
_showInputError (form, inputElem, errorMessage) {
  const errorElem = form.querySelector(`.${inputElem.id}-error`);

  inputElem.classList.add(this._inputErrorClass);
  errorElem.textContent = errorMessage;
  errorElem.classList.add(this._errorClass);
};

//Скрытие ошибок (удаление класса с ошибками)
_hideInputError (form, inputElem) {
  const errorElem = form.querySelector(`.${inputElem.id}-error`);
  inputElem.classList.remove(this._inputErrorClass);
  errorElem.classList.remove(this._errorClass);
  errorElem.textContent = '';
};

//Метод определения корректности введённых данных
_isValid (form, inputElem) {
  if (!inputElem.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    this._showInputError(form, inputElem, inputElem.validationMessage);
  } else {
    // Если проходит, скроем
    this._hideInputError(form, inputElem);
  }
};

//Установка слушателей событий для валидации
_setEventListeners (form) {
  const inputList = Array.from(form.querySelectorAll(this._inputSelector));
  const buttonElem = form.querySelector(this._submitButtonSelector);
  this._toggleButtonState(inputList, buttonElem);

  inputList.forEach((inputElem) => {
    inputElem.addEventListener('input', () => {
      this._isValid(form, inputElem);
      this._toggleButtonState(inputList, buttonElem);
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
_toggleButtonState (inputList, buttonElem, ) {
  if (this._hasInvalidInput(inputList)) {
    buttonElem.classList.add(this._inactiveButtonClass);
    buttonElem.setAttribute('disabled', '');
  } else {
    buttonElem.classList.remove(this._inactiveButtonClass);
    buttonElem.removeAttribute('disabled', '');
  }
};

//Метод включения валидации
enableValidation () {
  this._setEventListeners(this._form);
};

}