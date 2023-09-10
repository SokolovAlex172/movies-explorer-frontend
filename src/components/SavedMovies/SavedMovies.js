import { useContext, useState, useEffect } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { filterMovies } from '../../utils/utils';
import { SearchMessage } from '../../utils/constants';

const SavedMovies = () => {
  const { savedMovies } = useContext(CurrentUserContext);
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useState({
    keyWord: '',
    isShort: false,
  });
  const [errorMessage, setErrorMessage] = useState('');

  const getFilteredMovies = (keyWord, isShort) => {
    const filteredMovies = filterMovies(savedMovies, keyWord, isShort);
    filteredMovies.length === 0 ? setErrorMessage(SearchMessage.NOT_FOUND) : setErrorMessage('');
    !savedMovies.length ? setErrorMessage(SearchMessage.NOT_SAVED_MOVIES) : setErrorMessage('');
    setMovies(filteredMovies);
  };

  useEffect(() => {
    setMovies(savedMovies);
    getFilteredMovies(searchParams.keyWord, searchParams.isShort);
    !savedMovies.length ? setErrorMessage(SearchMessage.NOT_SAVED_MOVIES) : setErrorMessage('');
  }, [savedMovies]);

  const handleSubmitSearch = (word) => {
    setSearchParams({...searchParams, keyWord: word});
    getFilteredMovies(word, searchParams.isShort);
  };

  const handleChangeCheckbox = (isChecked) => {
    setSearchParams({...searchParams, isShort: isChecked});
    getFilteredMovies(searchParams.keyWord, isChecked);
  };

  const renderMoviesSection = () => {
    if (errorMessage.length) {
      return <p className='card__search-message'>{errorMessage}</p>;
    }
    return (
      <MoviesCardList movies={movies} />
    )
  };

  return (
    <main>
      <SearchForm
        handleSubmitSearch={handleSubmitSearch}
        handleChangeCheckbox={handleChangeCheckbox}
        showError={setErrorMessage}
      />
      {renderMoviesSection()}
    </main>
  )
};

export default SavedMovies;
