//DOM elements
const formElement = document.querySelector('.popup__form'); 
const inputElement = formElement.querySelector('.popup__input');

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass); 
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass); 
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass); 
  errorElement.classList.remove(settings.errorClass); 
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const checkInputValidity = (formElement, inputElement, settings) => {
  if (inputElement.value === '') {
    showInputError(formElement, inputElement, "Заполните это поле", settings);
    return;
  }

  if (inputElement.type === 'text') {
    const validationProfile = /^[A-Za-zА-Яа-яЁё\s-]+$/;
    if (!validationProfile.test(inputElement.value)) {
      showInputError(formElement, inputElement, "Разрешены только буквы, дефисы и пробелы", settings);
      return;
    }
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  const hasInvalidInput = inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });

  if (hasInvalidInput) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass);
    });
  });
};

export const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
      setEventListeners(formElement, settings);
      formElement.addEventListener('submit', (event) => {
          event.preventDefault();
      });
  });
};

export const clearValidation = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, settings);
    inputElement.value = ''; 
  });

  toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass);
};
