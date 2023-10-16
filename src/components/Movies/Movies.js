import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useState, useEffect } from 'react';
import { getFilteredMovies, filterMoviesByDuration} from '../../utils/constants';
import MoviesApi from '../../utils/MoviesApi';
import Preloader  from '../Preloader/Preloader';

  const Movies = ({
    saveClick,
    savedMovies,
    setIsPopup,
    deleteClick,
  }) => {
    const [isMovies, setIsMovies] = useState([]);
    const [isShort, setIsShort] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [initialMovies, setInitialMovies] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [isPreloader, setIsPreloader] = useState(false);
 
    
    const formatMovieUrls = (movies) => {
      movies.forEach(movie => {
        movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
        movie.image = `https://api.nomoreparties.co${movie.image.url}`
      });
      return movies
    }

    const handleApplyFilters = (movies, query, isShortSwitcher) => {
      const filteredMovies = getFilteredMovies(movies, query, isShortSwitcher);

      if (filteredMovies.length === 0) {
        setIsPopup({
          popupIsOpen: true,
          infoStatus: false,
          messageText: 'Ничего не найдено',
        });
        setNotFound(true);
      } else {
        setNotFound(false);
      }
      setInitialMovies(filteredMovies);
      const filteredResults = isShortSwitcher ? filterMoviesByDuration(filteredMovies) : filteredMovies;
      setFilteredResults(filteredResults);
      localStorage.setItem('initialMovies', JSON.stringify(filteredMovies)); // Сохраняем результаты поиска в localStorage
      localStorage.setItem('filteredResults', JSON.stringify(filteredResults)); // Сохраняем отфильтрованные результаты поиска в localStorage
      
    }

    const toggleShortFilms = () => {
      setIsShort(!isShort);
      const filteredResults = !isShort ? filterMoviesByDuration(initialMovies) : initialMovies;
      setFilteredResults(filteredResults);
      localStorage.setItem('isShort', !isShort);
    }

    const formatMovieUrlsAndHandleSearch = (inputValues) => {
      localStorage.setItem('searchQuery', inputValues); // Сохраняем значение inputValues в localStorage
      localStorage.setItem('isShort', isShort); // Сохраняем значение isShort в localStorage
      const movieLength = isMovies.length;
      if (movieLength === 0) {
        setIsPreloader(true);
        MoviesApi.getMovies()
          .then((movies) => {
            const formattedMovies = formatMovieUrls(movies);
            setIsMovies(formattedMovies);
            handleApplyFilters(formattedMovies, inputValues, isShort);
          })
          .catch(() =>
            setIsPopup({
              popupIsOpen: true,
              infoStatus: false,
              messageText: 'Во время запроса произошла ошибка',
            })
          )
          .finally(() => 
            setIsPreloader(false)
          );
      } else {
        handleApplyFilters(isMovies, inputValues, isShort);
      }
    }

    useEffect(() => {
      setNotFound(filteredResults.length === 0 && isShort ? true : false);
    }, [filteredResults, isShort]);

    useEffect(() => {
      const storedValue = localStorage.getItem('isShort');
      if (storedValue === 'true') {
        setIsShort(true);
      } else {
        setIsShort(false);
      }
    }, []);

    useEffect(() => {
      const storedInitialMovies = localStorage.getItem('initialMovies');
      const storedFilteredResults = localStorage.getItem('filteredResults');
      const storedIsShort = localStorage.getItem('isShort');
      if (storedInitialMovies && storedFilteredResults) {
        setInitialMovies(JSON.parse(storedInitialMovies));
        setFilteredResults(JSON.parse(storedFilteredResults));
      }
      if (storedIsShort === 'true') {
        setIsShort(true);
      } else {
        setIsShort(false);
      }
    }, []);

    return (
      <main>
        <SearchForm 
          isShort={isShort}
          toggleShortFilms={toggleShortFilms}
          handleSearch={formatMovieUrlsAndHandleSearch} />
        {!notFound && !isPreloader ? (
          <MoviesCardList
            movieList={filteredResults}
            savedMovies={savedMovies}
            saveClick={saveClick}
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

  export default Movies;