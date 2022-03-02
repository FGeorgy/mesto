import { Card } from './card.js';
import {
  initialCards,
  buttonOpenPopupEdProfile,
  buttonOpenPopupAddElement,
  closeButtons,
  popupAddElement,
  popupEditProfile,
  inputName,
  inputAbout,
  inputPlase,
  inputUrl,
  profileName,
  profileAbout,
  elemOptions,
  popupAddElementForm
} from './constants.js';
import { Validation } from './validation.js';

initialCards.forEach((item) => {
  const card = new Card(item);
  const cardElement = card.renderCard();
});

const enableValidation = (data) => {
  const forms = Array.from(document.querySelectorAll(data.form));
  forms.forEach((form) => {
    const validation = new Validation(form, data);
    const formValidation = validation.setEventListeners();
  })
}

enableValidation(elemOptions);

export const closePopupOverlay = (evt) => {
  if (!evt.target.closest('.popup__form')) {
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
  };
};

export const closePopupEscape = (evt) => {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
  };
};

export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closePopupOverlay);
  document.addEventListener('keydown', closePopupEscape);
};

export const closePopup = (popup) => {
  popup.removeEventListener('click', closePopupOverlay);
  document.removeEventListener('keydown', closePopupEscape);
  popup.classList.remove('popup_opened');
};

buttonOpenPopupEdProfile.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openPopup(popupEditProfile);
});

buttonOpenPopupAddElement.addEventListener('click', () => {
  openPopup(popupAddElement);
});

closeButtons.forEach(function(item) {
  item.addEventListener('click', function (evt) {
    closePopup(item.closest('.popup'));
  });
});

popupEditProfile.addEventListener('submit', function (evt) {
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(popupEditProfile);
  evt.preventDefault();
});

const addNewElement = () => {
  const card = new Card({
    name: inputPlase.value, 
    link: inputUrl.value 
  });

  const cardElement = card.renderCard();
};

popupAddElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  addNewElement();
  popupAddElement.querySelector('form').reset();
  closePopup(popupAddElement);
});