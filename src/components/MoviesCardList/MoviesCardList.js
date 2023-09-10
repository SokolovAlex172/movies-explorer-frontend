import React, { useState, useEffect , useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import MoviesCard from '../MoviesCard/MoviesCard';
import { BreakPointsData, Length } from '../../utils/constants';

const MoviesCardList = ({ movies }) => {
  const { pathname } = useLocation();
  const { savedMovies } = useContext(CurrentUserContext);

  const [chunkLength, setChunkLength] = useState(0);
  const [isMoreButton, setIsMoreButton] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResizeWindow = () => setWindowWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  useEffect(() => {
    if (windowWidth <= BreakPointsData.MOBILE) {
      setChunkLength(Length.MOBILE);
    } else if (windowWidth <= BreakPointsData.TABLET) {
      setChunkLength(Length.TABLET);
    } else {
      setChunkLength(Length.DESKTOP);
    }
  }, [windowWidth, movies.length]);

  useEffect(() => {
    if (pathname === '/movies' ) {
      movies.length > chunkLength ? setIsMoreButton(true) : setIsMoreButton(false);
    } else {
      setIsMoreButton(false);
    }
  }, [pathname, movies.length, chunkLength]);

  const handleMoreBtnClick = () => {
    setChunkLength((current) => {
      if (windowWidth <= BreakPointsData.TABLET) {
        return current + 2;
      }
      return current + 4;
    })
  };

  const checkIsSaved = (movie) => {
    const targetMovie = savedMovies.find((film) => film.movieId === movie.movieId);
    return targetMovie
      ? { isSaved: true, id: targetMovie._id }
      : { isSaved: false, id: '' }
  };

  const renderMovieCards = () => {
    if (pathname === '/movies') {
      return movies.length ? movies.slice(0, chunkLength).map((movie) => (
        <MoviesCard
          key={movie.movieId}
          movie={movie}
          saveStatus={checkIsSaved(movie)}
        />
      )) : '';
    } else {
      return movies.length ? movies.map((movie) => (
        <MoviesCard
          key={movie.movieId}
          movie={movie}
          saveStatus={{ isSaved: true, id: movie._id }}
        />
      )) : '';
    }
  };
  return (
    <section className='card-list'>
      <div className='card-list__content'>
          <ul className='card-list__list'>
          {renderMovieCards()}
          </ul>
          {isMoreButton ?
          <button
            className='card-list__btn button'
            type='button'
            onClick={handleMoreBtnClick}
          >
            Ещё
          </button> : ''}
      </div>
    </section>
  ) 
};

export default MoviesCardList;