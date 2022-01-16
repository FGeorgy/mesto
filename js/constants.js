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

//Массив форм
const popupForms = Array.from(document.querySelectorAll('.popup__form'));

//Массивы карточек
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