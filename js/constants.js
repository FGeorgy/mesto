//Переменные карточек
export const elements = document.querySelector('.elements');

//Переменные секции profile
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');

//Переменные попапа popup_edit-profile
export const buttonOpenPopupEdProfile = document.querySelector('.profile__edit-button');
export const popupEditProfile = document.querySelector('#edit-profile');
export const inputName = popupEditProfile.querySelector('input[name="popup__input-name"]');
export const inputAbout = popupEditProfile.querySelector('input[name="popup__input-about"]');

//Переменные попапа popup_add-element
export const buttonOpenPopupAddElement = document.querySelector('.profile__add-button');
export const popupAddElement = document.querySelector('#add-element');
export const popupAddElementForm = popupAddElement.querySelector('.popup__form');
export const inputPlase = popupAddElement.querySelector('input[name="popup__input-place"]');
export const inputUrl = popupAddElement.querySelector('input[name="popup__input-url"]');

//Переменные попапа popup_zoom-image
export const popupZoomImg = document.querySelector('#popup_zoom-image');
export const zoomImg = popupZoomImg.querySelector('.popup__image');
export const zoomImgCaption = popupZoomImg.querySelector('.popup__caption');

//Массив кнопок закрытия попапов
export const closeButtons = document.querySelectorAll('.popup__close-button');

//Массив форм
export const popupForms = Array.from(document.querySelectorAll('.popup__form'));


//Массивы карточек
export const initialCards = [
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

export const elemOptions = {
  form: '.popup__form',
  input: '.popup__input',
  saveButton: '.popup__save-button',
  saveButtonInactive: 'popup__save-button_inactive',
  inputError: 'popup__input_type_error',
  inputErrorText: 'popup__input-error_active'
};