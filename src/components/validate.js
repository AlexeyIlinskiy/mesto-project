//Валидация форм

// Добавляем класс с ошибкой
function showInputError (formElem, inputElem, errorMessage) {
  const errorElem = formElem.querySelector(`.${inputElem.id}-error`);

  inputElem.classList.add('form__input_type_error');
  errorElem.textContent = errorMessage;
  errorElem.classList.add('form__input-error_active');
};

//Удаляем класс с ошибкой
function hideInputError (formElem, inputElem) {
  const errorElem = formElem.querySelector(`.${inputElem.id}-error`);
  inputElem.classList.remove('form__input_type_error');
  errorElem.classList.remove('form__input-error_active');
  errorElem.textContent = '';
};

function isValid (formElem, inputElem) {
  if (!inputElem.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElem, inputElem, inputElem.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElem, inputElem);
  }
};

function setEventListeners (formElem) {
  const inputList = Array.from(formElem.querySelectorAll('.form__input'));
  const buttonElem = formElem.querySelector('.form__button');
  toggleButtonState(inputList, buttonElem);

  inputList.forEach((inputElem) => {
    inputElem.addEventListener('input', () => {
      isValid(formElem, inputElem);
      toggleButtonState(inputList, buttonElem);
    });
  });
}; 

function enableValidation () {
  const formList = Array.from(document.querySelectorAll('.form'));

  formList.forEach((formElem) => {
    formElem.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElem);
  });
};

// Вызовем функцию
enableValidation(); 

function hasInvalidInput (inputList) {
  return inputList.some((inputElem) => {
    return !inputElem.validity.valid;
  })
}; 

function toggleButtonState (inputList, buttonElem) {
  if (hasInvalidInput(inputList)) {
    buttonElem.classList.add('form__button_disabled');
  } else {
    buttonElem.classList.remove('form__button_disabled');
  }
}; 

export {
  showInputError,
  hideInputError,
  isValid,
  setEventListeners,
  enableValidation,
  hasInvalidInput,
  toggleButtonState
};