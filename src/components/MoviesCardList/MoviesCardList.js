import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ movies }) => {
  const handleBtnClick = () => {};

  return (
    <section className='card-list'>
      <div className='card-list__content'>
          <ul className='card-list__list'>
            {movies.map((movie) => (
              <MoviesCard
                key={movie.id}
                movie={movie}
              />
            ))}
          </ul>
          <button
            className='card-list__btn button'
            type='button'
            onClick={handleBtnClick}
          >
            Ещё
          </button>
      </div>
    </section>
  ) 
};

export default MoviesCardList;