import './Profile.css';
import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useFormValidation from "../../hooks/useFormValidation";
import {NAME_REGEX} from '../../utils/constants';
import Preloader from '../Preloader/Preloader';

const Profile = ({ handleSignOut, handleProfile, isPreloader }) => {
  const { 
    inputValues, 
    errorText, 
    isValid, 
    handleChange, 
    resetForm } = useFormValidation();

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    resetForm(currentUser, {}, true);
  }, [currentUser, resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    handleProfile(inputValues);
  }
  const isFormValid =
    !isValid || (currentUser.name === inputValues.name && 
    currentUser.email === inputValues.email);


  return (
    <section className='profile'>
      <main>
        <h1 className='profile__title'>{`Привет, ${currentUser.name}!`}</h1>
          <form 
            className='profile__form'
            name= 'form-profile'
            action=''
            method=''
            onSubmit={handleSubmit}
          >
          <div className='profile__container'>
              <div className='profile__info'>
                <label htmlFor='name' className='profile__text'>Имя
                <input
                  className='profile__input'
                  placeholder='Имя'
                  type='text'
                  name='name'
                  id='name'
                  value={inputValues.name || ""}
                  minLength={2}
                  maxLength={32}
                  onChange={handleChange}
                  pattern= {NAME_REGEX}
                />
                </label>
                  <p className='error' id='email-error'>{errorText.name || ""}</p>
              </div>
              <div className='profile__info'>
                <label htmlFor='email' className='profile__text'>E-mail
                  <input
                    className='profile__input'
                    placeholder='E-mail'
                    type='email'
                    name='email'
                    id='email'
                    value={inputValues.email || ""}
                    onChange={handleChange}
                  />
                </label>
                  <p className='error' id='email-error'>{errorText.email || ""}</p>
                
              </div>
            </div>
            {isPreloader ? <Preloader /> : ''}
            <div className='profile__nav'>
            <button
              type="submit"
              className={`submit-btn profile__edit-button ${isFormValid && "submit-btn_disabled"}`}
              disabled={isFormValid}>
                Редактировать
              </button>
              <Link to={`/`} className='profile__link' onClick={handleSignOut}>Выйти из аккаунта</Link>
            </div>
          </form>
      </main>
    </section>
  )
};

export default Profile;
