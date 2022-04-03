import './index.css';

import Card from '../components/Card.js';
import FormValidation from '../components/FormValidation.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithInquiry from '../components/PopupWithInquiry.js';

import {
  buttonOpenPopupEdProfile,
  buttonOpenPopupAddElement,
  buttonOpenPopupEditAvatar,
  inputName,
  inputAbout,
  elemOptions,
  templateElement,
  containerSelector,
  profileNameSelector,
  profileAboutSelector,
  profileAvatarSelector,
  popupZoomImageSelector,
  popupEditProfileSelector,
  popupAddElementSelector,
  popupConfirmDeleteSelector,
  popupEditAvatarSelector,
  formEditProfileSelector,
  formAddElementSelector,
  formEditAvatarSelector
} from '../utils/constants.js';

const formEditProfileValidation = new FormValidation(formEditProfileSelector, elemOptions);

const formAddElementValidation = new FormValidation(formAddElementSelector, elemOptions);

const formEditAvatarValidation = new FormValidation(formEditAvatarSelector, elemOptions);

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-38',
  headers: {
    authorization: '4cca0334-ff1e-4e33-84bd-7333b413ec80',
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }
})

const cardList = new Section({
  renderer: (item) => {
    addCard(item);
  }
}, containerSelector);

const userInfo = new UserInfo({
  name: profileNameSelector,
  about: profileAboutSelector,
  avatar: profileAvatarSelector
});

const popupZoomImage = new PopupWithImage(popupZoomImageSelector);

const createCard = (cardData) => {
  const card = new Card({
    data: cardData,
    handleCardClick: () => popupZoomImage.open(cardData),
    handleDelete: () => {
      popupConfirmDelete.setSubmitAction(() => {
        api.deleteCard(cardData._id)
          .then(card.deleteCard())
          .then(popupConfirmDelete.close())
          .catch((err) => console.log(err));
      });
      popupConfirmDelete.open();
    }
  },
  templateElement,
  api,
  userInfo.getUserId());

  return card;
}

const addCard = (data) => {
  const newCard = createCard(data);
  const cardElement = newCard.generateCard();
  cardList.setItem(cardElement);
}

const popupEditProfile = new PopupWithForm(
  popupEditProfileSelector,
  (newValues) => {
    popupEditProfile.renderLoading(true);
    api.setUserInfo(newValues)
      .then((userData) => {
        userInfo.setUserInfo(userData);
        popupEditProfile.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupEditProfile.renderLoading(false);
      })
  });

const popupAddElement = new PopupWithForm(
  popupAddElementSelector,
  (newValues) => {
    popupAddElement.renderLoading(true);
    api.addCard(newValues)
      .then((data) => {
        addCard(data);
        popupAddElement.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupAddElement.renderLoading(false);
      })
  });

const popupEditAvatar = new PopupWithForm(
  popupEditAvatarSelector,
  (newValues) => {
    popupEditAvatar.renderLoading(true);
    api.setUserAvatar(newValues)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupEditAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupEditAvatar.renderLoading(false);
      })
  });

const popupConfirmDelete = new PopupWithInquiry(popupConfirmDeleteSelector);

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    cardList.renderItems(initialCards);
    userInfo.setUserInfo(userData);
  })
  .catch((err) => {
    console.log(err);
  });

formEditProfileValidation.enableValidation();
formAddElementValidation.enableValidation();
formEditAvatarValidation.enableValidation();

popupEditProfile.setEventListeners();
popupAddElement.setEventListeners();
popupZoomImage.setEventListeners();
popupConfirmDelete.setEventListeners();
popupEditAvatar.setEventListeners();

buttonOpenPopupEdProfile.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputAbout.value = userData.about;
  formEditProfileValidation.checkError();
  popupEditProfile.open();
});

buttonOpenPopupAddElement.addEventListener('click', () => {
  formAddElementValidation.checkError();
  popupAddElement.open();
})

buttonOpenPopupEditAvatar.addEventListener('click', () => {
  formEditAvatarValidation.checkError();
  popupEditAvatar.open();
})
