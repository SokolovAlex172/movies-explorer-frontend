import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = ({ handleCheckbox  }) => {
  const { pathname } = useLocation();
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    handleCheckbox(!isChecked);
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (pathname === '/movies') {
      const storageIsShort = JSON.parse(localStorage.getItem('storageIsShort'));
      storageIsShort && setIsChecked(storageIsShort);
    } else {
      setIsChecked(false);
    }
  }, [pathname]);

  return (
    <div className='filter-checkbox'>
      <label className='filter-checkbox__content'>
        <input
          className='filter-checkbox__input'
          type='checkbox'
          checked={isChecked}
          onChange={handleChange}
        />
        <span className='filter-checkbox__switch'></span>
        <span className='filter-checkbox__text'>Короткометражки</span>
      </label>
    </div>
  )
};

export default FilterCheckbox;