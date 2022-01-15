//Функция добавления класса "Ошибка"
function showError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  errorElement.classList.add('popup__input-error_active');
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
};

//Функция удаления класса "Ошибка"

//В тренажере происходит обращение к селекторам напрямую.
//Зачем делать сложные конфигурации, если селектор с ошибкой один
//для всех инпутов, и один для всех span с сообщением об ошибки?
function hideError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  errorElement.classList.remove('popup__input-error_active');
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
};

//Функция проверки на валидность
function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement);
  };
};


function hasInvalidInput(inputs) {
  return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//Функция блокирования кнопки "Сохранить"
function disableButton(inputs, saveButton) {
  if (hasInvalidInput(inputs)) {
    saveButton.classList.add('popup__save-button_inactive');
    saveButton.setAttribute('disabled', true);
  } else {
    saveButton.classList.remove('popup__save-button_inactive');
    saveButton.removeAttribute('disabled');
  };
};

function saveButtonDesabled (popup) {
  const saveButtonPopup = popup.querySelector('.popup__save-button');
  saveButtonPopup.classList.add('popup__save-button_inactive');
  saveButtonPopup.setAttribute('disabled', true);
};

//Функция запуска валидации в инпутах определенного элемента
function setEventListeners(formElement) {
  const inputs = Array.from(formElement.querySelectorAll('.popup__input'));
  const saveButton = formElement.querySelector('.popup__save-button');
  disableButton(inputs, saveButton);
  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      disableButton(inputs, saveButton);
    });
  });
};

//Функция определения элемента из массива форм
function enableValidation() {
  const popupForms = Array.from(document.querySelectorAll('.popup__form'));
  popupForms.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};
enableValidation();