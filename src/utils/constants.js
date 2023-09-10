export const SHORT_MOVIE_DURATION = 40;

export const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';
export const AUTH_URL = 'https://api.sokolov171.nomoreparties.co';

export const IMAGES = 'https://api.nomoreparties.co';
export const REGEX = /https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?/;

export const SearchMessage = {
  EMPTY: 'Введите название фильма.',
  NOT_FOUND: 'Ничего не найдено.',
  NOT_SAVED_MOVIES: 'Нет сохранённых фильмов.',
  SEARCH_ERROR: 'Во время загрузки сохранённых фильмов произошла ошибка.',
}

export const AppMessage = {
  SUCCESS: 'Всё прошло успешно!',
  REGISTER_SUCCESS: 'Вы успешно зарегистрировались!',
  UPDATE_SUCCESS: 'Ваши данные успешно изменены.',
  ERROR: 'Во время запроса произошла ошибка.',
  BAD_REQUEST: 'Что-то пошло не так.',
}

export const CodeError = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  ALREADY_EXISTS: 409,
  SERVER_ERROR: 500,
};

export const validationParams = {
  username: {
    pattern: '^[\\sa-zA-Zа-яА-ЯёЁ-]+$',
    message: 'Имя может содержать только латиницу, кириллицу, пробел или дефис.',
  },
  email: {
    pattern: '^[-\\w.]+@([A-z0-9][-A-z0-9]+\\.)+[A-z]{2,4}$',
    message: 'Введите e-mail.',
  },
};

export const BreakPointsData = {
  MOBILE: 480,
  TABLET: 1010,
  DESKTOP: 1280,
};

export const Length = {
  MOBILE: 5,
  TABLET: 8,
  DESKTOP: 12,
}
