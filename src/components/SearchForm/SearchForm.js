import './SearchForm.css';
import {useState} from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = ({ handleSubmitSearch }) => {
  const [searchFilm, setSearchFilm] = useState('');
  const [isShortFilm, setIsShortFilm] = useState(false);

  const handleInputSearchFilm = (evt) => setSearchFilm(evt.target.value);

  const onSubmit = (evt) => {
    evt.preventDefault();
    handleSubmitSearch(searchFilm);
  };

  return (
    <section className='search-form'>
      <div className='search-form__content'>
        <form 
          className='search-form__form'
          name='search-form'         
          onSubmit={onSubmit}
          action=''
          method=''
        >
          <input
            className='search-form__input'
            placeholder='Фильм'
            name='search'      
            value={searchFilm}
            type='text' 
            required
            onChange={handleInputSearchFilm}
          />
          <button className='search-form__btn' type='submit'></button>
        </form>
        <FilterCheckbox isShortFilm={isShortFilm} setIsShortFilm={setIsShortFilm}/>
      </div>
    </section>
  )
};

export default SearchForm;