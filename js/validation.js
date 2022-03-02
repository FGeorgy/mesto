export class Validation {
  constructor(form, data) {
    this._form = form;
    this._inputSelector = data.input;
    this._saveButtonSelector = data.saveButton;
    this._saveButtonInactiveSelector = data.saveButtonInactive;
    this._inputErrorSelector = data.inputError;
    this._inputErrorTextSelector = data.inputErrorText;
  }

  _hasInvalidInput() {
    console.log(this._inputs);
    return this._inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _hideError() {
    this._errorElement = this._form.querySelector(`.${this._input.name}-error`);
    this._errorElement.classList.remove(this._inputErrorTextSelector);
    this._input.classList.remove(this._inputErrorSelector);
    this._errorElement.textContent = '';
  }

  _showError() {
    this._errorElement = this._form.querySelector(`.${this._input.name}-error`);
    this._errorElement.classList.add(this._inputErrorTextSelector);
    this._input.classList.add(this._inputErrorSelector);
    this._errorElement.textContent = this._input.validationMessage;
  }

  _activateSaveButton() {
    this._saveButton.classList.remove(this._saveButtonInactiveSelector);
    this._saveButton.removeAttribute('disabled');
  }

  _disableSaveButton() {
    this._saveButton.classList.add(this._saveButtonInactiveSelector);
    this._saveButton.setAttribute('disabled', true);
  }

  disableButton() {
    this._saveButton = this._form.querySelector(this._saveButtonSelector);
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

  setEventListeners() {
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._input = input;
        this._chekInputValidity();
        this.disableButton();
      })
    }) 
  }
}