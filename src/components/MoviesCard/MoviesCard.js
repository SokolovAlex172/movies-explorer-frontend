import { useState, useContext, useEffect }  from 'react';
import './MoviesCard.css';
import cn from 'classnames';
import MainApi from '../../utils/MainApi';
import { formatDuration } from '../../utils/utils';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useLocation } from 'react-router-dom';


const MoviesCard = ({movie, saveStatus }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [mainApiId, setMainApiId] = useState('');
  const { nameRU, trailerLink, thumbnail, duration } = movie;
  const { pathname } = useLocation();
  const { savedMovies, setSavedMovies } = useContext(CurrentUserContext);

  useEffect(() => {
    setMainApiId(saveStatus.id);
    setIsSaved(saveStatus.isSaved);
  }, [saveStatus]);

  const handleDeleteMovie = () => {
    MainApi.deleteMovie(mainApiId)
      .then(() => {
        setSavedMovies(savedMovies.filter((data) => {
          return !(data._id === mainApiId);
        }));
        setIsSaved(false);
      })
      .catch((err) => console.log(err))
  };

  const handleSaveMovie = () => {
    MainApi.saveMovie(movie)
      .then((data) => {
        setSavedMovies([...savedMovies, data]);
        setIsSaved(true);
      })
      .catch((err) => console.log(err))
  };

  const cardBtnClassNames = cn('card__button', {
    'card__button_saved': pathname === '/movies' && isSaved,
    'card__button_delete': pathname === '/saved-movies',
  });

  return (
    <li className='card'>
      <a className='card__link' href={trailerLink} target='_blank' rel='noreferrer'>
        <img
          className='card__img'
          src={thumbnail}
          alt={nameRU}
        />
      </a>
      <div className='card__info'>
        <div className="card__container">
          <h2 className='card__title'>{nameRU}</h2>
          <button
            className={cardBtnClassNames}
            type='button'
            aria-label={'save movie'}
            onClick={isSaved ? handleDeleteMovie : handleSaveMovie}
          />
        </div>
        <p className='card__time'>{formatDuration(duration)}</p>
      </div>
    </li>
  )
}

export default MoviesCard;
