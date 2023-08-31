import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import movies from '../../utils/db-movies';


const Movies = () => {
  const handleSubmitSearch = () => {};

  return (
    <main>
      <SearchForm handleSubmitSearch={handleSubmitSearch} />
      <MoviesCardList movies={movies} />
    </main>
  )
};

export default Movies;