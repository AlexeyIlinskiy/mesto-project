//Валидация форм
//Подключим параметры для валидации
import { validParams } from "./constants";


export default class FormValidator {
  constructor (data, formElement) { 
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formElement = formElement;
  }

// Добавляем класс с ошибкой
_showInputError (formElem, inputElem, errorMessage, validParams) {
  const errorElem = formElem.querySelector(`.${inputElem.id}-error`);

  inputElem.classList.add(validParams.inputErrorClass);
  errorElem.textContent = errorMessage;
  errorElem.classList.add(validParams.errorClass);
};

//Удаляем класс с ошибкой
_hideInputError (formElem, inputElem, validParams) {
  const errorElem = formElem.querySelector(`.${inputElem.id}-error`);
  inputElem.classList.remove(validParams.inputErrorClass);
  errorElem.classList.remove(validParams.errorClass);
  errorElem.textContent = '';
};

_isValid (formElem, inputElem) {
  if (!inputElem.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElem, inputElem, inputElem.validationMessage, validParams);
  } else {
    // Если проходит, скроем
    hideInputError(formElem, inputElem, validParams);
  }
};

_setEventListeners (formElem, validParams) {
  const inputList = Array.from(formElem.querySelectorAll(validParams.inputSelector));
  const buttonElem = formElem.querySelector(validParams.submitButtonSelector);
  toggleButtonState(inputList, buttonElem, validParams);

  inputList.forEach((inputElem) => {
    inputElem.addEventListener('input', () => {
      isValid(formElem, inputElem);
      toggleButtonState(inputList, buttonElem, validParams);
    });
  });
}; 

enableValidation (validParams) {
  const formList = Array.from(document.querySelectorAll(validParams.formSelector));

  formList.forEach((formElem) => {
    formElem.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElem, validParams);
  });
};

_hasInvalidInput (inputList) {
  return inputList.some((inputElem) => {
    return !inputElem.validity.valid;
  })
}; 

_toggleButtonState (inputList, buttonElem, validParams) {
  if (hasInvalidInput(inputList)) {
    buttonElem.classList.add(validParams.inactiveButtonClass);
    buttonElem.setAttribute('disabled', '');
  } else {
    buttonElem.classList.remove(validParams.inactiveButtonClass);
    buttonElem.removeAttribute('disabled', '');
  }
};
}