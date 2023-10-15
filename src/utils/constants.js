export const BASE_URL = 'https://api.sokolov171.nomoreparties.co'

export const NAME_REGEX ='^[A-Za-zА-Яа-яЁё /s -]+$';

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
    movieCardsCount: 12,
    loadCards: 4,
  },
  laptop: {
    width: 1024,
    movieCardsCount: 9,
    loadCards: 3,
  },
  tablet: {
    width: 960,
    movieCardsCount: 6,
    loadCards: 2,
  },
  mobile: {
    width: 768,
    movieCardsCount: 4,
    loadCards: 2,
  },
};