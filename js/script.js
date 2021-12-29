let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let inputName = popup.querySelector('input[name="popup__input-name"]');
let inputAbout = popup.querySelector('input[name="popup__input-about"]');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let saveButton = popup.querySelector('.popup__save-button');

function closePopup() {
  popup.classList.remove('popup_opened');
};

function openPopup() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  popup.classList.add('popup_opened');
}

function editForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);

closeButton.addEventListener('click', closePopup);

saveButton.addEventListener('click', editForm);

popup.addEventListener('submit', editForm);