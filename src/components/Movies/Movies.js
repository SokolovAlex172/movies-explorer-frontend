import { useState, useEffect } from 'react';
import MoviesApi from '../../utils/MoviesApi';

import { SearchMessage } from '../../utils/constants';
import { filterMovies, normalizeMovies } from '../../utils/utils';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

const Movies = () => {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [keyWord, setKeyWord] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const storageAllMovies = JSON.parse(localStorage.getItem('storageAllMovies')) || [];

  useEffect(() => {
    const storageIsShort = JSON.parse(localStorage.getItem('storageIsShort')) || false;
    const storageSearchResult = JSON.parse(localStorage.getItem('storageSearchResult')) || [];
    const storageKeyWord = localStorage.getItem('storageKeyWord') || '';

    storageIsShort && setIsShortMovies(storageIsShort);
    storageSearchResult && setSearchedMovies(storageSearchResult);
    storageKeyWord && setKeyWord(storageKeyWord);
    }, 
  []);

  const getFilteredMovies = (keyWord, isShortMovies) => {
    if (!storageAllMovies.length) {
      setIsLoading(true);
      MoviesApi.getMovies()
        .then((allMovies) => {
          const normalizedMovies = normalizeMovies(allMovies);
          localStorage.setItem('storageAllMovies', JSON.stringify(normalizedMovies));
          const filteredMovies = keyWord
            ? filterMovies(normalizedMovies, keyWord, isShortMovies)
            : [];
          handleFilterResult(filteredMovies);
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage(SearchMessage.SEARCH_ERROR);
        })
        .finally(() => setIsLoading(false));
    } else {
      const filteredMovies = keyWord
        ? filterMovies(storageAllMovies, keyWord, isShortMovies)
        : [];
      handleFilterResult(filteredMovies);
    }
  };

  const handleSubmitSearch = (keyWord) => {
    setKeyWord(keyWord);
    localStorage.setItem('storageKeyWord', keyWord);
    getFilteredMovies(keyWord, isShortMovies);
  };

  const handleChangeCheckbox = (isChecked) => {
    setIsShortMovies(isChecked);
    localStorage.setItem('storageIsShort', isChecked);
    getFilteredMovies(keyWord, isChecked);
  };

  const handleFilterResult = (movies) => {
    setSearchedMovies(movies);
    localStorage.setItem('storageSearchResult', JSON.stringify(movies));
    movies.length === 0
      ? setErrorMessage(SearchMessage.NOT_FOUND)
      : setErrorMessage('');
  }
 
  const renderMoviesSection = () => {
    if (errorMessage.length) {
      return <p className='card__search-message'>{errorMessage}</p>;
    }
    return (
      <MoviesCardList movies={searchedMovies} />
    )
  };

  return (
    <main>
      <SearchForm
        handleSubmitSearch={handleSubmitSearch}
        handleChangeCheckbox={handleChangeCheckbox}
        showError={setErrorMessage}
      />
      {isLoading ? <Preloader /> : renderMoviesSection()}
    </main>
  )
};

export default Movies;
