//Переменные карточек
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content;

//Переменные секции profile
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

//Переменные попапа popup_edit-profile
const buttonOpenPopupEdProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('#popup_edit-profile');
const inputName = popupEditProfile.querySelector('input[name="popup__input-name"]');
const inputAbout = popupEditProfile.querySelector('input[name="popup__input-about"]');

//Переменные попапа popup_add-element
const buttonOpenPopupAddElement = document.querySelector('.profile__add-button');
const popupAddElement = document.querySelector('#popup_add-element');
const inputPlase = popupAddElement.querySelector('input[name="popup__input-place"]');
const inputUrl = popupAddElement.querySelector('input[name="popup__input-url"]');

//Переменные попапа popup_zoom-image
const popupZoomImg = document.querySelector('#popup_zoom-image');
const zoomImg = popupZoomImg.querySelector('.popup__image');
const imgCaption = popupZoomImg.querySelector('.popup__caption');

//Массив кнопок закрытия попапов
const closeButtons = document.querySelectorAll('.popup__close-button');

//Массив всех форм


//Массивы карточек
const newCards = [];
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Функция создания карточки и всех слушателей событий в ней
function createCard(elem) {
  const element = elementTemplate.cloneNode(true);

  element.querySelector('.element__image').src = elem.link;
  element.querySelector('.element__image').alt = ('Место. ' + elem.name);
  element.querySelector('.element__title').textContent = elem.name;

  element.querySelector('.element__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  const deleteButton = element.querySelector('.element__delete-button')
  deleteButton.addEventListener('click', function() {
    deleteButton.closest('.element').remove();
  });

  const image = element.querySelector('.element__image');
  image.addEventListener('click', function() {
    openPopup(popupZoomImg);
    zoomImg.src = elem.link;
    zoomImg.alt = ('Место. ' + elem.name);
    imgCaption.textContent = elem.name;
  });

  return element;
};

//Функция добавления карточки на страницу
function renderCard(elem) {
  elements.prepend(createCard(elem));
};

//Добавление 6-ти начальных карточек на страницу из массива initialCards
initialCards.forEach(function(elem) {
  renderCard(elem);
});

//Функция добавления новой карточки от юзера
function addNewElement () {
  if (!(inputPlase.value === '') && !(inputUrl.value === '')) {
    renderCard({
      name: inputPlase.value, 
      link: inputUrl.value 
    });
  };
};

//Функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', function (evt) {
    if (!evt.target.closest('.popup__form')) {
      closePopup(popup);
    };
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closePopup(popup);
    };
  });
};

//Функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

//Открытие попапа popup_edit-profile
buttonOpenPopupEdProfile.addEventListener('click', function() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openPopup(popupEditProfile);
});

//Открытие попапа popup_add-element
buttonOpenPopupAddElement.addEventListener('click', function () {
  openPopup(popupAddElement);
});

//Закрытие попапов
closeButtons.forEach(function(item) {
  item.addEventListener('click', function (evt) {
    closePopup(item.closest('.popup'));
    evt.preventDefault();
  });
})

//Сохранение профиля
popupEditProfile.addEventListener('submit', function (evt) {
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(popupEditProfile);
  evt.preventDefault();
});

popupAddElement.addEventListener('submit', function (evt) {
  addNewElement();
  popupAddElement.querySelector('form').reset();
  closePopup(popupAddElement);
  evt.preventDefault();
});

//Валидация форм

//Функция добавления класса "Ошибка"
function showError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  errorElement.classList.add('popup__input-error_active');
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
};

//Функция удаления класса "Ошибка"
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

function disableButton(inputs, saveButton) {
  if (hasInvalidInput(inputs)) {
    saveButton.classList.add('popup__save-button_inactive');
    saveButton.setAttribute('disabled', true);
  } else {
    saveButton.classList.remove('popup__save-button_inactive');
    saveButton.removeAttribute('disabled');
  };
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
    formElement.addEventListener('submit', () => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};
enableValidation();

