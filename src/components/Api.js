export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _makeRequest(promise) {
    return promise.then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((obj) => {
      return obj;
    })
  }

  getInitialCards() {
    const promise = fetch(this._url + '/cards', {
      method: 'GET',
      headers: this._headers
    })
  
    return this._makeRequest(promise);
  }

  getUserInfo() {
    const promise = fetch(this._url + '/users/me', {
      method: 'GET',
      headers: this._headers
    })

    return this._makeRequest(promise);
  }
  
  setUserInfo(userData) {
    const promise = fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    });

    return this._makeRequest(promise);
  }

  addCard(data) {
    const promise = fetch(this._url + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })

    return this._makeRequest(promise);
  }

  deleteCard(id) {
    const promise = fetch(this._url + `/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })

    return this._makeRequest(promise);
  }

  likeElement(id) {
    const promise = fetch(this._url + `/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })

    return this._makeRequest(promise);
  }

  dislikeElement(id) {
    const promise = fetch(this._url + `/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })

    return this._makeRequest(promise);
  }

  setUserAvatar(data) {
    const promise = fetch(this._url + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    });

    return this._makeRequest(promise);
  }

}