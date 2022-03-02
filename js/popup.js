

class Popup {
  constructor(data) {
    this._popup = data.id;
  }
  
  _openPopup() {
    this._popup.classList.add('popup_opened');
  }
}

export class PopupEditProfile extends Popup {
  constructor(data) {
    super._popup;
  }

  openPopapEditProfile() {
    super._openPopup();
  }
}

export class PopupAddElement extends Popup {
  constructor(data) {
    super._popup;
  }

  openPopupAddElement() {
    super._openPopup();
  }
}