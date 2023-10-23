import './MoviesCard.css';
import { useLocation, } from 'react-router-dom';

  const MoviesCard = ({
    movie,
    savedMovies,
    saveClick,
    deleteClick,
  }) => {
    
  const location = useLocation();

  const handleSaveButton = () => {
    saveClick(movie);
  }

  const handleDeleteButton = () => {
    deleteClick(movie);
  }

  return (
    <li className='card'>
      <a className='card__link' href={movie.trailerLink} target='_blank' rel='noreferrer'>
        <img
          className='card__img'
          src={movie.image}
          alt={movie.nameRU}
          title={movie.nameRU}
        />
      </a>
      <div className='card__info'>
        <div className='card__container'>
          <h2 className='card__title'>{movie.nameRU}</h2>
          {location.pathname === '/movies' && (
            <button
              type='button'
              className={`card__button card__button_${
                savedMovies ? 'saved' : ''
              }`}
              onClick={savedMovies ? handleDeleteButton : handleSaveButton}
            ></button>
          )}
          {location.pathname === '/saved-movies' && (
            <button
              className='card__button card__button_delete'
              type='button'
              title='Удалить фильм из сохранённых'
              onClick={handleDeleteButton}
            ></button>
          )}
        </div>
        <p className='card__time'> {`${Math.trunc(movie.duration / 60)}ч ${movie.duration % 60}м`}</p>
      </div>
    </li>
  )
}

export default MoviesCard;
