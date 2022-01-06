const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content;
const popups = document.querySelectorAll('.popup');
const openButtons = document.querySelectorAll('.open-popup');
const closeButtons = document.querySelectorAll('.popup__close-button');
const saveButtons = document.querySelectorAll('.popup__save-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const inputName = document.querySelector('input[name="popup__input-name"]');
const inputAbout = document.querySelector('input[name="popup__input-about"]');
const inputPlase = document.querySelector('input[name="popup__input-place"]');
const inputUrl = document.querySelector('input[name="popup__input-url"]');
const popupZoomImg = document.querySelector('#popup_zoom-image');
const zoomImg = popupZoomImg.querySelector('.popup__image');
const imgCaption = popupZoomImg.querySelector('.popup__caption');

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

initialCards.forEach(function(elem) {
  const element = elementTemplate.cloneNode(true);

  element.querySelector('.element__image').src = elem.link;
  element.querySelector('.element__title').textContent = elem.name;
  
  element.querySelector('.element__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  const deleteButton = element.querySelector('.element__delete-button')
  deleteButton.addEventListener('click', function() {
    deleteButton.closest('.element').remove();
  });

  const image = element.querySelector('.element__image');
  image.addEventListener('click', function () {
    const elementActive = image.closest('.element');
    popupZoomImg.classList.add('popup_opened');
    zoomImg.src = elementActive.querySelector('.element__image').src;
    imgCaption.textContent = elementActive.querySelector('.element__title').textContent;
  });

  elements.append(element);
});

for (let index = 0; index < openButtons.length; index++) {
  const openButton = openButtons[index];
  const popup = popups[index];
  openButton.addEventListener('click', function (evt) {
    if (index === 0) {
      inputName.value = profileName.textContent;
      inputAbout.value = profileAbout.textContent;
      openPopup(popup);
      evt.preventDefault();
    } else {
      inputPlase.value = '';
      inputUrl.value = '';
      openPopup(popup);
      evt.preventDefault();
    };
  });
};

for (let index = 0; index < closeButtons.length; index++) {
  const closeButton = closeButtons[index];
  closeButton.addEventListener('click', function (evt) {
    closePopup(closeButton.closest('.popup'));
    evt.preventDefault();
  });
};

for (let index = 0; index < popups.length; index++) {
  const popup = popups[index];
  popup.addEventListener('submit', function(evt) {
    if (index === 0) {
      profileName.textContent = inputName.value;
      profileAbout.textContent = inputAbout.value;
    } else if (index === 1) {
      newElement();
    };
    closePopup(popup);
    evt.preventDefault();
  });
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

function newElement () {
  if (!(inputPlase.value === '') && !(inputUrl.value === '')) {
    const element = elementTemplate.cloneNode(true);

    element.querySelector('.element__image').src = inputUrl.value;
    element.querySelector('.element__title').textContent = inputPlase.value;

    element.querySelector('.element__like-button').addEventListener('click', function(evt) {
      evt.target.classList.toggle('element__like-button_active');
    });

    const deleteButton = element.querySelector('.element__delete-button')
    deleteButton.addEventListener('click', function() {
      deleteButton.closest('.element').remove();
    });

    const image = element.querySelector('.element__image');
    image.addEventListener('click', function() {
      const elementActive = image.closest('.element');
      popupZoomImg.classList.add('popup_opened');
      zoomImg.src = elementActive.querySelector('.element__image').src;
      imgCaption.textContent = elementActive.querySelector('.element__title').textContent;
    });

    elements.prepend(element);
  };
};