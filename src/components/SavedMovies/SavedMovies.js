import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getFilteredMovies, filterMoviesByDuration } from '../../utils/constants';
import { useState, useEffect } from 'react';
import Preloader  from '../Preloader/Preloader';

const SavedMovies = ({ deleteClick, savedMovies, setIsPopup }) => {
  const [isShort, setIsShort] = useState(false);
  const [displayedMovies, setDisplayedMovies] = useState(savedMovies);
  const [notFound, setNotFound] = useState(false);
  const [filteredResults, setFilteredResults] = useState(displayedMovies);
  const [isPreloader, setIsPreloader] = useState(false);
 
  const handleSearch = (query) => {
    const filteredMovies  = getFilteredMovies(savedMovies, query, isShort);
    const notFound = filteredMovies.length === 0;
    setIsPopup({
      popupIsOpen: notFound,
      infoStatus: false,
      messageText: notFound ? 'Ничего не найдено' : '',
    });
    setNotFound(notFound);
    setFilteredResults(filteredMovies);
    setDisplayedMovies(filteredMovies);
  }


  const toggleShortFilms = () => {
      if (!isShort) {
          setIsShort(true);
          localStorage.setItem('isShortSaved', true);
          const shortMovies = filterMoviesByDuration(filteredResults);
          setDisplayedMovies(shortMovies);
          setNotFound(shortMovies.length === 0);
      } else {
          setIsShort(false);
          localStorage.setItem('isShortSaved', false);
          setDisplayedMovies(filteredResults);
          setNotFound(filteredResults.length === 0);
      }
    }
    
  useEffect(() => {
    if (localStorage.getItem('isShortSaved') === true) {
      setIsShort(true);
      const shortMovies = filterMoviesByDuration(savedMovies);
      setDisplayedMovies(shortMovies);
    } else {
      setIsShort(false);
      setDisplayedMovies(savedMovies);
    }
    }, [savedMovies]);

  useEffect(() => {
    const saveMovises = savedMovies.length;
    if (saveMovises !== 0) {
      setFilteredResults(savedMovies);
      setNotFound(false);
    } else {
      setFilteredResults([]);
      setNotFound(true);
    }
    }, [savedMovies]);

  
  return (
    <main>
      <SearchForm 
        isShort={isShort}
        savedMovies={savedMovies}
        setDisplayedMovies={setDisplayedMovies}
        toggleShortFilms={toggleShortFilms}
        handleSearch={handleSearch}
      />
      {displayedMovies.length > 0 && !isPreloader ? (
        <MoviesCardList
          movieList={displayedMovies}
          savedMovies={savedMovies}
          deleteClick={deleteClick}
        />
        ) : (
          <div>
            {isPreloader && <Preloader />}
            {notFound && <p className='movies movies__info'>Ничего не найдено</p>}
          </div>
        )}
    </main>
  );
};

export default SavedMovies;