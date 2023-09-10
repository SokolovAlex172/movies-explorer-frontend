import { SHORT_MOVIE_DURATION, IMAGES, REGEX } from './constants';

const filterMovies = (movies, keyWord, isShort) => {
  const word = keyWord.toLowerCase().trim();

  const searchedMovies = movies
    .filter((movie) => {
      const ruName = movie.nameRU && movie.nameRU.toLowerCase().trim();
      const enName = movie.nameEN && movie.nameEN.toLowerCase().trim();
      return (ruName.match(word)) || (enName && enName.match(word));
    });

  if (isShort) {
    return searchedMovies.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION);
  }

  return searchedMovies;
};

const normalizeMovies = (movies) => {
  return movies
    .map((movie) => ({
        country: movie.country || '',
        director: movie.director || '',
        duration: movie.duration || 60,
        year: movie.year || 2000,
        description: movie.description || '',
        image: `${IMAGES}/${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `${IMAGES}/${movie.image.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU || '',
        nameEN: movie.nameEN || '',
      }))
    .map((movie) => (
      REGEX.test(movie.trailerLink) ? movie : {...movie, trailerLink: movie.image}
    ));
};

const formatDuration = (time) => {
  const hours = Math.trunc(time / 60);
  const minutes = time % 60;

  return `${hours}ч ${minutes}м`;
};

export {  filterMovies, normalizeMovies, formatDuration };
