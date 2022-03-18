import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
  }

  open(values) {
    super.open();
    this._image.src = values.link;
    this._image.alt = values.name;
    this._caption.textContent = values.name;
  }
}