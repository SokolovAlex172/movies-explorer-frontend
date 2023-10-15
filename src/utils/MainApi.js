import {BASE_URL} from "./constants";

export function getTokenHeader() {
  const jwt = localStorage.getItem('jwt');
  const headers = {
    'Authorization': `Bearer ${jwt}`,
    'Content-Type': 'application/json'
  };
  return headers;
}

class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
    this._headers = {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    };
  }
    _checkStatus(res) {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
      const headers = getTokenHeader();
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: headers,
      }).then((res) => this._checkStatus(res));
      }

    getInitialMovies() {
      const headers = getTokenHeader();
      return fetch(`${this._baseUrl}/movies`, {
        method: 'GET',
        headers: headers,
      }).then((res) => this._checkStatus(res));
    }

    setUserInfo({ email, name }, token) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
        }),
      }).then((res) => this._checkStatus(res));
    }

    saveMovie(movie) {
      const headers = getTokenHeader();
      return fetch(`${this._baseUrl}/movies`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: movie.image,
          trailerLink: movie.trailerLink,
          thumbnail: movie.thumbnail,
          movieId: movie.id,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
        }),
      }).then((res) => this._checkStatus(res));
    }

    deleteMovie(movieId) {
      const headers = getTokenHeader();
      return fetch(`${this._baseUrl}/movies/${movieId}`, {
        method: 'DELETE',
        headers: headers,
        credentials: 'include',
      }).then((res) => this._checkStatus(res));
    }

    register({ name, email, password }) {
      return fetch(`${this._baseUrl}/signup`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({ name, email, password }),
      }).then((res) => this._checkStatus(res));
    };

    authorize({ email, password }) {
      return fetch(`${this._baseUrl}/signin`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({ email, password }),
      }).then((res) => this._checkStatus(res));
    };


    checkToken(){
      const headers = getTokenHeader();
      return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: headers,
    }).then((res) => this._checkStatus(res));
  };

}

const mainApi = new MainApi({
  baseUrl: BASE_URL,
});

export default mainApi;
