export const BASE_URL = 'https://api.sokolov171.nomoreparties.co'

export const NAME_REGEX ='^[A-Za-zА-Яа-яЁё /s -]+$';
export const EMAIL_REGEX = "^[a-zA-Z0-9+_.\\-]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]{2,4}$";

export const SHORT_DURATION = 40;

export const filterMoviesByDuration = (movies) =>{
  return movies.filter(movie => movie.duration < SHORT_DURATION);
}

export const getFilteredMovies = (movies, query, isShortMovies) => {
  const filteredMovies = movies.filter((movie) => {
  const movieRU = String(movie.nameRU).toLowerCase().trim();
  const movieEN = String(movie.nameEN).toLowerCase().trim();
  const userMovie = query.toLowerCase().trim();
  
  return movieRU.includes(userMovie) || movieEN.includes(userMovie);
  });
  
  return isShortMovies ? filterMoviesByDuration(filteredMovies) : filteredMovies;
  }

export const movieGridDisplaySetting = {
  desktop: {
    width: 1280,
    movieCardsCount: 16,
    loadCards: 4,
  },
  laptop: {
    width: 1024,
    movieCardsCount: 12,
    loadCards: 3,
  },
  tablet: {
    width:  763,
    movieCardsCount: 8,
    loadCards: 2,
  },
  mobile: {
    width: 320,
    movieCardsCount: 5,
    loadCards: 2,
  },
};