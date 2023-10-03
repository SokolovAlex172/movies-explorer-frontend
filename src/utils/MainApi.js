import {BASE_URL} from "./constants";

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
    _checkStatus(res) {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      }).then((res) => this._checkStatus(res));
      }

    getInitialMovies() {
      return fetch(`${this._baseUrl}/movies`, {
        headers: this._headers
      }).then((res) => this._checkStatus(res));
    }

    saveMovie(movie) {
      return fetch(`${this._baseUrl}/movies`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: `https://api.nomoreparties.co${movie.image.url}`,
          trailerLink: movie.trailerLink,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
          thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
          movieId: movie.id,
        })
      }).then((res) => this._checkStatus(res));
    }

    deleteMovie(movieId) {
      return fetch(`${this._baseUrl}/cards/${movieId}`, {
        method: 'DELETE',
        headers: this._headers,
      }).then((res) => this._checkStatus(res));
    }

    setUserInfo(data) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(data),
      }).then((res) => this._checkStatus(res));
    }
}

const token = localStorage.getItem('jwt');

export const mainApi = new MainApi({
  baseUrl: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});