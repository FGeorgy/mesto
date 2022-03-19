export default class Popup {
  constructor(popupSelector){
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');

    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.matches(this._popupSelector)) {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
    document.addEventListener('click', this._handleOverlayClose.bind(this));
  }
}