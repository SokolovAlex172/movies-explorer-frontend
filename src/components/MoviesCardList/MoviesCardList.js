import './MoviesCardList.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import { movieGridDisplaySetting } from '../../utils/constants';
  const MoviesCardList = ({
    saveClick,
    deleteClick,
    movieList,
    savedMovies,

  }) => {
    
    const location = useLocation();

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const { desktop, laptop, tablet, mobile } = movieGridDisplaySetting;
    const [showMovieList, setShowMovieList] = useState([]);
    const [movieCardDisplaySetting, setMovieCardDisplaySetting] = useState({ movieCardsCount: 12, loadCards: 3,});

    const getLoadCards = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1280) {
        return movieGridDisplaySetting.desktop.loadCards;
      } else if (screenWidth >= 1024) {
        return movieGridDisplaySetting.laptop.loadCards;
      } else if (screenWidth >= 960) {
        return movieGridDisplaySetting.tablet.loadCards;
      } else {
        return movieGridDisplaySetting.mobile.loadCards;
      }
    }
    
    const handleAppendMoviesToList = () => {
      const loadCards = getLoadCards();
      const startIndex = showMovieList.length;
      const endIndex = startIndex + loadCards;
      const remainingMovies = movieList.length - startIndex;
    
      if (remainingMovies > 0) {
        const newMovies = movieList.slice(startIndex, endIndex);
        setShowMovieList(prevShowMovieList => [...prevShowMovieList, ...newMovies]);
      }
    }

    useEffect(() => {
      if (movieList.length) {
        const res = movieList.slice(0, movieCardDisplaySetting.movieCardsCount);
        setShowMovieList(res);
      }
    }, [movieList, movieCardDisplaySetting.movieCardsCount]);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    }

    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
      if (location.pathname === '/movies') {
        if (screenWidth > desktop.width) {
          setMovieCardDisplaySetting(desktop);
        } else if (screenWidth <= desktop.width && screenWidth > laptop.width) {
          setMovieCardDisplaySetting(laptop);
        } else if (screenWidth <= laptop.width && screenWidth > tablet.width) {
          setMovieCardDisplaySetting(tablet);
        } else {
          setMovieCardDisplaySetting(mobile);
        }
      }
    }, [screenWidth, desktop, laptop, tablet, mobile, location.pathname]);

    const getSavedMovie = (array, movie) => {
      return array.find((item) => {
        return item.movieId === (movie.id || movie.movieId);
      });
    }

    const renderMovieCards = () => {
      return showMovieList.map((movie) => (
        <MoviesCard
          key={movie.id || movie._id}
          movie={movie}
          savedMovies={getSavedMovie(savedMovies, movie)}
          saveClick={saveClick}
          deleteClick={deleteClick}
        />
      ));
    };

    const renderMoreButton = () => {
      if (
        location.pathname === '/movies' &&
        showMovieList.length >= 4 &&
        showMovieList.length < movieList.length
      ) {
        return (
          <button
            className='card-list__btn button'
            type='button'
            onClick={handleAppendMoviesToList}
          >
            Ещё
          </button>
        );
      }
      return null;
    };

    return (
      <section className='card-list'>
        <div className='card-list__content'>
          <ul className='card-list__list'>
            {renderMovieCards()}
          </ul>
          {renderMoreButton()}
        </div>
      </section>
    );
  };

export default MoviesCardList;