class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
    _checkStatus(res) {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    
    getMovies() {
      return fetch(this._baseUrl, {
        method: 'GET',
        headers: this._headers
      }).then((res) => this._checkStatus(res));
    }
}

const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    'Content-Type': 'application/json',
  }
});

export default moviesApi;
