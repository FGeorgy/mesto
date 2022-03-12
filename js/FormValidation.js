export class FormValidation {
  constructor(form, data) {
    this._form = form;
    this._saveButton = this._form.querySelector(data.saveButton);
    this._inputList = Array.from(this._form.querySelectorAll(data.input));

    this._buttonInactiveClass = data.saveButtonInactive;
    this._inputErrorClass = data.inputError;
    this._inputErrorTextClass = data.inputErrorText;
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _hideError() {
    this._errorElement.classList.remove(this._inputErrorTextClass);
    this._input.classList.remove(this._inputErrorClass);
    this._errorElement.textContent = '';
  }

  _showError() {
    this._errorElement.classList.add(this._inputErrorTextClass);
    this._input.classList.add(this._inputErrorClass);
    this._errorElement.textContent = this._input.validationMessage;
  }

  _activateSaveButton() {
    this._saveButton.classList.remove(this._buttonInactiveClass);
    this._saveButton.removeAttribute('disabled');
  }

  _disableSaveButton() {
    this._saveButton.classList.add(this._buttonInactiveClass);
    this._saveButton.setAttribute('disabled', true);
  }

  disableButton() {
    this._disableSaveButton();
    if (this._hasInvalidInput()) {
      this._disableSaveButton();
    } else {
      this._activateSaveButton();
    }
  }

  _chekInputValidity() {
    if (!this._input.validity.valid) {
      this._showError();
    } else {
      this._hideError();
    }
  }

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._input = input;
        this._errorElement = this._form.querySelector(`.${this._input.name}-error`);
        this._chekInputValidity();
        this.disableButton();
      })
    }) 
  }

  enableValidation() {
    this._setEventListeners();
  }
}