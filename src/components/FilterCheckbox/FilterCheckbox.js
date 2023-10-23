import './FilterCheckbox.css';

const FilterCheckbox = ({ isShort, toggleShortFilms }) => {
  return (
    <div className='filter-checkbox'>
      <label className='filter-checkbox__content'>
        <input
          className='filter-checkbox__input'
          type='checkbox'
          checked={isShort ? true : false}
          onChange={toggleShortFilms}
        />
        <span className='filter-checkbox__switch'></span>
        <span className='filter-checkbox__text'>Короткометражки</span>
      </label>
    </div>
  )
};

export default FilterCheckbox;