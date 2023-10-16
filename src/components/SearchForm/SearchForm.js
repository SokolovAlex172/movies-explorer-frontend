import './SearchForm.css';
import {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useFormValidation  from '../../hooks/useFormValidation';

const SearchForm = ({
  isShort,
  savedMovies,
  setDisplayedMovies,
  toggleShortFilms,
  handleSearch,
}) => {
  const location = useLocation();
  const [errorQuery, setErrorQuery] = useState('');
  const { inputValues, handleChange, isValid} = useFormValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    if (inputValues.search && inputValues.search.trim() !== '') {
      handleSearch(inputValues.search);
    } else {
      setErrorQuery('Нужно ввести ключевое слово');
    }
  }

  useEffect(() => {
    setErrorQuery('');
  }, [isValid]);

  useEffect(() => {
    if (location.pathname === '/saved-movies' && !inputValues.search) {
      setDisplayedMovies(savedMovies);
    }
  }, [location, inputValues.search, savedMovies, setDisplayedMovies]);

  return (
    <section className='search-form'>
      <div className='search-form__content'>
        <form 
          noValidate
          className='search-form__form'
          name='search-form'         
          onSubmit={handleSubmit}
          action=''
          method=''
        >
          <input
            className='search-form__input'
            placeholder={errorQuery ||'Фильм'}
            name='search'      
            value={inputValues.search || ''}
            type='text' 
            required
            onChange={handleChange}
          />
         
          <button className='search-form__btn' type='submit'></button>
        </form>
        <FilterCheckbox isShort={isShort} toggleShortFilms={toggleShortFilms} />
      </div>
    </section>
  )
};

export default SearchForm;