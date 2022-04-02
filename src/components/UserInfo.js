export default class UserInfo {
  constructor(userSelectors) {
    this._profileName = document.querySelector(userSelectors.name);
    this._profileAbout = document.querySelector(userSelectors.about);
    this._profileAvatar = document.querySelector(userSelectors.avatar);
    this._userId = null;
  }

  getUserInfo() {
    this._userData ={
      name: this._profileName.textContent,
      about: this._profileAbout.textContent
    }
    return this._userData;
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileAbout.textContent = data.about;
    this._profileAvatar.src = data.avatar;
    this._userId = data._id;
  }

  getUserId() {
    return this._userId;
  }
}