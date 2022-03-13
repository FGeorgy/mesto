import { popupZoomImg, zoomImg, zoomImgCaption } from "./constants.js";
import { openPopup } from "./index.js";

export default class Card {
  constructor(data, template) {
    this._name = data.name;
    this._link = data.link;

    this._selector = template;
  }

  _getTemplate() {
    const element = document
      .querySelector(this._selector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return element;
  }

  _likeElement() {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _zoomImage() {
    zoomImg.src = this._link;
    zoomImg.alt = `Место. ${this._name}`;
    zoomImgCaption.textContent = this._name;
    openPopup(popupZoomImg);
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.element__like-button');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    
    this._likeButton.addEventListener('click', () => {
      this._likeElement();
    });

    this._deleteButton.addEventListener('click', () => {
      this._deleteCard();
    });

    this._image.addEventListener('click', () => {
      this._zoomImage();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._title = this._element.querySelector('.element__title');
    this._image = this._element.querySelector('.element__image');
    this._setEventListeners();


    this._title.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = `Место. ${this._name}`;

    return this._element;
  }
}