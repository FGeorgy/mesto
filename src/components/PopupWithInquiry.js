import Popup from './Popup.js';

export default class PopupWithInquiry extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupForm = this._popup.querySelector('.popup__form');
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    })
  }
}