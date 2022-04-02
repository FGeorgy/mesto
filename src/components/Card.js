
export default class Card {
  constructor({ data, handleCardClick, handleDelete }, templateSelector, api, userId) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._likesLength = data.likes.length;
    this._likes = data.likes;

    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;

    this._templateSelector = templateSelector;

    this._api = api;

    this._userId = userId;
  }

  _getTemplate() {
    const element = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return element;
  }

  _likeElement() {
    this._likeButton.classList.add('element__like-button_active');
  }

  _dislikeElement() {
    this._likeButton.classList.remove('element__like-button_active');
  }

  _setLikeEventListener() {
    if (this._checkArrayLikes()) {
      this._api.dislikeElement(this._id)
        .then((obj) => {
          this._dislikeElement;
          this._likeCount.textContent = obj.likes.length;
        })
    } else {
      this._api.likeElement(this._id)
        .then((obj) => {
          this._likeElement();
          this._likeCount.textContent = obj.likes.length;
        })
    }
  }

  _checkArrayLikes() {
    return this._likes.some((obj) => obj._id === this._userId);
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
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
      this._setLikeEventListener();
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDelete();
    });

    this._image.addEventListener('click', () => {
      this._handleCardClick({
        name: this._name,
        src: this._link
      })
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._title = this._element.querySelector('.element__title');
    this._image = this._element.querySelector('.element__image');
    this._likeCount = this._element.querySelector('.element__like-count');

    this._setEventListeners();

    this._title.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = `Место. ${this._name}`;
    this._likeCount.textContent = this._likesLength;

    if (this._checkArrayLikes()) {
      this._likeElement();
    } else {
      this._dislikeElement();
    }

    if (this._userId === this._ownerId) {
      this._deleteButton.classList.add('element__delete-button_visible');
    }

    return this._element;
  }
}