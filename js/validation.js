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

//Функция блокирования кнопки "Сохранить" при проверки валидности
function disableButton(inputs, saveButton) {
  disableSaveButton (saveButton);
  if (hasInvalidInput(inputs)) {
    disableSaveButton (saveButton);
  } else {
    activateSaveButton (saveButton);
  };
};

//Дизактивация кнопки Сохранить
function disableSaveButton (saveButton) {
  saveButton.classList.add(`${saveButton.name}_inactive`);
  saveButton.setAttribute('disabled', true);
};

//Активация кнопки Сохранить
function activateSaveButton (saveButton) {
  saveButton.classList.remove(`${saveButton.name}_inactive`);
  saveButton.removeAttribute('disabled');
}

//Функция запуска валидации в инпутах определенного элемента
function setEventListeners(formElement, inputs, saveButton) {
  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      disableButton(inputs, saveButton);
    });
  });
};

//Функция определения элемента из массива форм
function enableValidation(forms) {
  forms.forEach((formElement) => {
    const inputs = Array.from(formElement.querySelectorAll('.popup__input'));
    const saveButton = formElement.querySelector('.popup__save-button');
    setEventListeners(formElement, inputs, saveButton);
  });
};
enableValidation(popupForms);

//Решил сделать так:
// Функция принимает массив форм
// и первым делом расскладывает его на составляющие
// При использовании валидатора, в дальнейшем, нужно будет только поменять селекторы в стартовой функции