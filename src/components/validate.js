//Валидация форм
// Создадим объект с классами и селекторами, как объект настроек
// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const validParams = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};


// Добавляем класс с ошибкой
function showInputError (formElem, inputElem, errorMessage, validParams) {
  const errorElem = formElem.querySelector(`.${inputElem.id}-error`);

  inputElem.classList.add(validParams.inputErrorClass);
  errorElem.textContent = errorMessage;
  errorElem.classList.add(validParams.errorClass);
};

//Удаляем класс с ошибкой
function hideInputError (formElem, inputElem, validParams) {
  const errorElem = formElem.querySelector(`.${inputElem.id}-error`);
  inputElem.classList.remove(validParams.inputErrorClass);
  errorElem.classList.remove(validParams.errorClass);
  errorElem.textContent = '';
};

function isValid (formElem, inputElem) {
  if (!inputElem.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElem, inputElem, inputElem.validationMessage, validParams);
  } else {
    // Если проходит, скроем
    hideInputError(formElem, inputElem, validParams);
  }
};

function setEventListeners (formElem, validParams) {
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

function enableValidation (validParams) {
  const formList = Array.from(document.querySelectorAll(validParams.formSelector));

  formList.forEach((formElem) => {
    formElem.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElem, validParams);
  });
};

// Вызовем функцию
enableValidation(validParams); 

function hasInvalidInput (inputList) {
  return inputList.some((inputElem) => {
    return !inputElem.validity.valid;
  })
}; 

function toggleButtonState (inputList, buttonElem, validParams) {
  if (hasInvalidInput(inputList)) {
    buttonElem.classList.add(validParams.inactiveButtonClass);
  } else {
    buttonElem.classList.remove(validParams.inactiveButtonClass);
  }
}; 

export {
  validParams,
  showInputError,
  hideInputError,
  isValid,
  setEventListeners,
  enableValidation,
  hasInvalidInput,
  toggleButtonState
};