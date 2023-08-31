import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import movies from '../../utils/db-movies';


const SavedMovies = () => {
  return (
    <main>
    <SearchForm />
    <MoviesCardList movies={movies} />
  </main>
  )
};

export default SavedMovies;