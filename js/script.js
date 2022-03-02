import { closeButtons } from "./constants.js";
//Функция создания карточки и всех слушателей событий в ней
function createCard(elem) {
  const element = elementTemplate.cloneNode(true);
  const image = element.querySelector('.element__image');
  const deleteButton = element.querySelector('.element__delete-button');
  const title = element.querySelector('.element__title');
  const likeButton = element.querySelector('.element__like-button');

  image.src = elem.link;
  image.alt = ('Место. ' + elem.name);
  title.textContent = elem.name;

  likeButton.addEventListener('click', likeElement);
  deleteButton.addEventListener('click', deleteCard);
  image.addEventListener('click', () => zoomElement(elem));

  return element;
};

//Функция лайка
function likeElement(evt) {
  evt.target.classList.toggle('element__like-button_active');
};

//Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest('.element').remove();
};

//Функция увеличения изображения
function zoomElement(elem) {
  zoomImg.src = elem.link;
  zoomImg.alt = ('Место. ' + elem.name);
  imgCaption.textContent = elem.name;
  openPopup(popupZoomImg);
};

//Функция добавления карточки на страницу
function renderCard(elem) {
  elements.prepend(createCard(elem));
};

//Добавление 6-ти начальных карточек на страницу из массива initialCards
// initialCards.forEach(function(elem) {
//   renderCard(elem);
// });

//Функция добавления новой карточки от юзера
const addNewElement = () => {
  renderCard({
    name: inputPlase.value, 
    link: inputUrl.value 
  });
};

//Функция закрытия попапа кликом на оверлей
function closePopupOverlay(evt) {
  if (!evt.target.closest('.popup__form')) {
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
  };
};

//Функция закрытия попапа нажатием на Эскейп
function closePopupEscape (evt) {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
  };
};

//Функция открытия попапов
export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closePopupOverlay);
  document.addEventListener('keydown', closePopupEscape);
};

//Функция закрытия попапов
function closePopup(popup) {
  popup.removeEventListener('click', closePopupOverlay);
  document.removeEventListener('keydown', closePopupEscape);
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
  disableButtonPopupAddElement(popupAddElement, elemOptions);
});

//Проверка на валидность при открытии popup_add-element
function disableButtonPopupAddElement (formElement, elemOptions) {
  const inputs = Array.from(formElement.querySelectorAll(elemOptions.input));
  disableButton(formElement, inputs, elemOptions);
};

//Закрытие попапов
closeButtons.forEach(function(item) {
  item.addEventListener('click', function (evt) {
    closePopup(item.closest('.popup'));
  });
});

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