import './SearchForm.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useFormValid from '../../hooks/useFormValid';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import {SearchMessage} from '../../utils/constants';

const SearchForm = ({ handleSubmitSearch, handleChangeCheckbox, showError }) => {
  const { pathname } = useLocation();
  const {
    values,
    setValues,
    handleChange,
    isValid,
    setIsValid,
  } = useFormValid();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    isValid ? handleSubmitSearch(values.keyWord) : showError(SearchMessage.EMPTY);
  };

  useEffect(() => {
    if (pathname === '/movies') {
      const storageKeyWord = localStorage.getItem('storageKeyWord');
      storageKeyWord && setValues({keyWord: storageKeyWord});
      setIsValid(true);
    } else {
      setValues({keyWord: ''});
    }
  }, [pathname, setValues, setIsValid]);

  return (
    <section className='search-form'>
      <div className='search-form__content'>
        <form 
          className='search-form__form'
          name='search-form'         
          onSubmit={handleSubmit}
          noValidate
        >
          <input
            className='search-form__input'
            placeholder='Фильм'
            name='keyWord'
            id='keyWord'
            value={values.keyWord || ''}
            type='text' 
            required
            minLength='1'
            maxLength='30'
            onChange={handleChange}
          />
          <button 
            className='search-form__btn'
            type='submit'
            aria-label='Поиск'
            />
        </form>
        <FilterCheckbox handleCheckbox={handleChangeCheckbox}/>
      </div>
    </section>
  )
};

export default SearchForm;