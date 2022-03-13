import { Card } from './Card.js';
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
  popupEditProfileForm,
  popupAddElementForm,
  templateElement,
  elements
} from './constants.js';
import { FormValidation } from './FormValidation.js';

const createCard = (data, template) => {
  const card = new Card(data, template);
  return card.generateCard();
}

initialCards.forEach((item) => {
  const cardElement = createCard(item, templateElement);
  elements.append(cardElement);
});
 
const formEditProfileValidation = new FormValidation(popupEditProfileForm, elemOptions);
formEditProfileValidation.enableValidation();

const formAddElementValidation = new FormValidation(popupAddElementForm, elemOptions);
formAddElementValidation.enableValidation();

const closePopupOverlay = (evt) => {
  if (!evt.target.closest('.popup__form')) {
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
  };
};

const closePopupEscape = (evt) => {
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

const closePopup = (popup) => {
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
  formAddElementValidation.disableButton();
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
  const cardElement = createCard({
      name: inputPlase.value, 
      link: inputUrl.value
    }, templateElement);

  elements.prepend(cardElement);
};

popupAddElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  addNewElement();
  popupAddElementForm.reset();
  closePopup(popupAddElement);
});