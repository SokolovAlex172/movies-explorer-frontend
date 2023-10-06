import {MOVIES_URL} from "./constants";

class MoviesApi {
  constructor({ moviesUrl, headers }) {
    this._moviesUrl = moviesUrl;
    this._headers = headers;
  }
    _checkStatus(res) {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    getMovies() {
      return fetch(`${this._moviesUrl}`, {
        method: 'GET',
        headers: this._headers
      }).then((res) => this._checkStatus(res));
    }
}

const moviesApi = new MoviesApi({
  baseUrl: MOVIES_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});


export default moviesApi;