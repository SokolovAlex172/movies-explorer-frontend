import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getFilteredMovies } from '../../utils/constants';
import { useState, useEffect } from 'react';
import Preloader  from '../Preloader/Preloader';

const SavedMovies = ({ deleteClick, savedMovies, setIsPopup, setSavedMovies  }) => {
  const [displayedMovies, setDisplayedMovies] = useState(savedMovies);
  const [notFound, setNotFound] = useState(false);
  const [filteredResults, setFilteredResults] = useState(displayedMovies);
  const [isPreloader, setIsPreloader] = useState(false);
 
  const [isShort, setIsShort] = useState(() => {
    const isShortSaved = localStorage.getItem('isShortSaved');
    return isShortSaved === 'true';
  });
  
  const handleSearch = (query) => {
    const filteredMovies  = getFilteredMovies(savedMovies, query, isShort);
    const notFound = filteredMovies.length === 0;
    setNotFound(notFound);
    setFilteredResults(filteredMovies);
    setDisplayedMovies(filteredMovies);
  }

  const toggleShortFilms = () => {
    setIsShort(!isShort);
    localStorage.setItem('isShortSaved', !isShort);
  };

  const handleDeleteClick = (movie) => {
    const updatedDisplayedMovies = displayedMovies.filter((displayedMovie) => displayedMovie._id !== movie._id);
    setSavedMovies(updatedDisplayedMovies);

    deleteClick(movie);
  };

    useEffect(() => {
      const filteredMovies = getFilteredMovies(savedMovies, '', isShort);
      const notFound = filteredMovies.length === 0;
      setNotFound(notFound);
      setFilteredResults(filteredMovies);
      setDisplayedMovies(filteredMovies);
    }, [savedMovies, isShort]);
    
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
          deleteClick={handleDeleteClick}
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