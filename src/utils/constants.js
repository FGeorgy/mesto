//Переменные попапа popup_edit-profile
export const buttonOpenPopupEdProfile = document.querySelector('.profile__edit-button');
export const inputName = document.querySelector('#popup__input-name');
export const inputAbout = document.querySelector('#popup__input-about');

//Переменные попапа popup_add-element
export const buttonOpenPopupAddElement = document.querySelector('.profile__add-button');

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
  input: '.popup__input',
  saveButton: '.popup__save-button',
  saveButtonInactive: 'popup__save-button_inactive',
  inputError: 'popup__input_type_error',
  inputErrorText: 'popup__input-error_active'
};

export const containerSelector = '.elements';
export const templateElement = '#template_element';
export const profileNameSelector = '.profile__name';
export const profileAboutSelector = '.profile__about';
export const popupZoomImageSelector = '#zoom-image';
export const popupEditProfileSelector = '#edit-profile';
export const popupAddElementSelector = '#add-element';
export const formEditProfileSelector = '#form-edit-profile';
export const formAddElementSelector =  '#form-add-element';