const elemOptions = {
  form: '.popup__form',
  input: '.popup__input',
  saveButton: '.popup__save-button',
  saveButtonInactive: 'popup__save-button_inactive',
  inputError: 'popup__input_type_error',
  inputErrorText: 'popup__input-error_active'
};

enableValidation(elemOptions);

//Функция определения элемента из массива форм
function enableValidation(elemOptions) {
  const forms = Array.from(document.querySelectorAll(elemOptions.form));
  forms.forEach((formElement) => {
    setEventListeners(formElement, elemOptions);
  });
};

//Функция запуска валидации в инпутах определенного элемента
function setEventListeners(formElement, elemOptions) {
  const inputs = Array.from(formElement.querySelectorAll(elemOptions.input));
  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, elemOptions);
      disableButton(formElement, inputs, elemOptions);
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

//Функция блокирования кнопки "Сохранить" при проверки валидности
function disableButton(formElement, inputs, elemOptions) {
  disableSaveButton (formElement, elemOptions);
  if (hasInvalidInput(inputs)) {
    disableSaveButton (formElement, elemOptions);
  } else {
    activateSaveButton (formElement, elemOptions);
  };
};

function hasInvalidInput(inputs) {
  return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//Дизактивация кнопки Сохранить
function disableSaveButton (formElement, elemOptions) {
  const saveButton = formElement.querySelector(elemOptions.saveButton);
  saveButton.classList.add(elemOptions.saveButtonInactive);
  saveButton.setAttribute('disabled', true);
};

//Активация кнопки Сохранить
function activateSaveButton (formElement, elemOptions) {
  const saveButton = formElement.querySelector(elemOptions.saveButton)
  saveButton.classList.remove(elemOptions.saveButtonInactive);
  saveButton.removeAttribute('disabled');
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