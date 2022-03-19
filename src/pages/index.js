import './index.css';

import Card from '../components/Card.js';
import FormValidation from '../components/FormValidation.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PicturePopup.js';
import UserInfo from '../components/UserInfo.js';

import {
  initialCards,
  buttonOpenPopupEdProfile,
  buttonOpenPopupAddElement,
  inputName,
  inputAbout,
  elemOptions,
  templateElement,
  containerSelector,
  profileNameSelector,
  profileAboutSelector,
  popupZoomImageSelector,
  popupEditProfileSelector,
  popupAddElementSelector,
  formEditProfileSelector,
  formAddElementSelector
} from '../utils/constants.js';

const formEditProfileValidation = new FormValidation(formEditProfileSelector, elemOptions);

const formAddElementValidation = new FormValidation(formAddElementSelector, elemOptions);

const userInfo = new UserInfo({
  name: profileNameSelector,
  about: profileAboutSelector
});

const popupZoomImage = new PopupWithImage(popupZoomImageSelector);

const createCard = (data) => {
  const card = new Card({
    data: data,
    handleCardClick: () => popupZoomImage.open(data)
  }, templateElement);

  return card;
}

const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    addCard(item);
  }
}, containerSelector)

const addCard = (data) => {
  const newCard = createCard(data);
  const cardElement = newCard.generateCard();
  cardList.setItem(cardElement);
}

const popupEditProfile = new PopupWithForm(
  popupEditProfileSelector,
  (newValues) => {
    const data = {};
    data.name = newValues.name;
    data.about = newValues.about;
    userInfo.setUserInfo(data);
    popupEditProfile.close();
  });

const popupAddElement = new PopupWithForm(
  popupAddElementSelector,
  (newValues) => {
    const data = {};
    data.name = newValues.name;
    data.link = newValues.link;
    addCard(data);
    popupAddElement.close();
  });

formEditProfileValidation.enableValidation();
formAddElementValidation.enableValidation();

cardList.renderItems();

popupEditProfile.setEventListener();
popupAddElement.setEventListener();
popupZoomImage.setEventListeners();

buttonOpenPopupEdProfile.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputAbout.value = userData.about;
  popupEditProfile.open();
});

buttonOpenPopupAddElement.addEventListener('click', () => {
  popupAddElement.open();
  formAddElementValidation.disableButton();
})
