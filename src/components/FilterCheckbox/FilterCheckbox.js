import './FilterCheckbox.css';

const FilterCheckbox = ({ isShortFilm, setIsShortFilm }) => {
  return (
    <div className='filter-checkbox'>
      <label className='filter-checkbox__content'>
        <input
          className='filter-checkbox__input'
          type='checkbox'
          onClick={() => setIsShortFilm(!isShortFilm)}
          checked={isShortFilm}
        />
        <span className='filter-checkbox__switch'></span>
        <span className='filter-checkbox__text'>Короткометражки</span>
      </label>
    </div>
  )
};

export default FilterCheckbox;