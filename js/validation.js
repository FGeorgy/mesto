enableValidation(popupForms);

//Функция определения элемента из массива форм
function enableValidation(forms) {
  forms.forEach((formElement) => {
    const elemOptions = {
      inputs: Array.from(formElement.querySelectorAll('.popup__input')),
      saveButton: formElement.querySelector('.popup__save-button'),
      saveButtonInactive: 'popup__save-button_inactive',
      inputError: 'popup__input_type_error',
      inputErrorText: 'popup__input-error_active'
    };
    setEventListeners(formElement, elemOptions);
    disableButton(elemOptions);
  });
};

//Функция запуска валидации в инпутах определенного элемента
function setEventListeners(formElement, elemOptions) {
  elemOptions.inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, elemOptions);
      disableButton(elemOptions);
    });
  });
};

//Функция проверки на валидность
function checkInputValidity(formElement, inputElement, elemOptions) {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, elemOptions);
  } else {
    hideError(formElement, inputElement, elemOptions);
  };
};


function hasInvalidInput(elemOptions) {
  return elemOptions.inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//Функция блокирования кнопки "Сохранить" при проверки валидности
function disableButton(elemOptions) {
  disableSaveButton (elemOptions);
  if (hasInvalidInput(elemOptions)) {
    disableSaveButton (elemOptions);
  } else {
    activateSaveButton (elemOptions);
  };
};

//Дизактивация кнопки Сохранить
function disableSaveButton (elemOptions) {
  elemOptions.saveButton.classList.add(elemOptions.saveButtonInactive);
  elemOptions.saveButton.setAttribute('disabled', true);
};

//Активация кнопки Сохранить
function activateSaveButton (elemOptions) {
  elemOptions.saveButton.classList.remove(elemOptions.saveButtonInactive);
  elemOptions.saveButton.removeAttribute('disabled');
}

//Функция добавления класса "Ошибка"
function showError(formElement, inputElement, errorMessage, elemOptions) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  errorElement.classList.add(elemOptions.inputErrorText);
  inputElement.classList.add(elemOptions.inputError);
  errorElement.textContent = errorMessage;
};

//Функция удаления класса "Ошибка"
function hideError(formElement, inputElement, elemOptions) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  errorElement.classList.remove(elemOptions.inputErrorText);
  inputElement.classList.remove(elemOptions.inputError);
  errorElement.textContent = '';
};