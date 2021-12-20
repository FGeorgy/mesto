let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let inputName = document.querySelector('.popup__input-name');
let inputAbout = document.querySelector('.popup__input-about');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let saveButton = document.querySelector('.popup__save-button');

inputName.value = profileName.textContent;
inputAbout.value = profileAbout.textContent;

function close() {
  popup.classList.remove('popup_opened');
};

function openPopup() {
  popup.classList.add('popup_opened');
}

function formEdit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  close();
}

editButton.addEventListener('click', openPopup);

closeButton.addEventListener('click', close);

saveButton.addEventListener('click', formEdit);