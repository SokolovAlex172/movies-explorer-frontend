import './Profile.css';
import { useState, useContext, useRef } from 'react';
import MainApi from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import useFormValid from '../../hooks/useFormValid';
import { validationParams, AppMessage } from '../../utils/constants';
import Preloader from '../Preloader/Preloader';

const Profile = ({ signOut, setTooltipSettings, setInfoTooltipPopupOpen }) => {
  const userContext = useContext(CurrentUserContext);
  const [userData, setUserData] = useState(userContext.currentUser);

  const initialValues = {
    username: userData.name,
    email: userData.email,
  };

  const [currentError, setCurrentError]= useState('');
  const nameInputRef = useRef(false);
  const {
    values,
    handleChange,
    errors,
    resetForm,
  } = useFormValid({ initialValues });
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleEdit(evt) {
    evt.preventDefault();
    await setIsEdit(true);
    nameInputRef.current.focus();
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    setCurrentError('');
    setIsLoading(true);
    setUserData({
      name: values.username,
      email: values.email,
    });

    MainApi.changeUserInfo({
      name: values.username,
      email: values.email,
    })
      .then((data) => {
        setCurrentError('');
        setIsEdit(false);
        setInfoTooltipPopupOpen(true);
        setTooltipSettings({
          message: AppMessage.UPDATE_SUCCESS,
          isSuccess: true,
        })
        resetForm({
          username: data.name,
          email: data.email,
        })
      })
      .catch(async (err) => {
        const { message } = await err.json();
        setTooltipSettings({
          message: AppMessage.BAD_REQUEST,
          isSuccess: false,
        })
        setInfoTooltipPopupOpen(true);
        setCurrentError(message);
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <section className='profile'>
      <main>
        <h1 className='profile__title'>{`Привет, ${userData.name}!`}</h1>
          <form className='profile__form'
              name={`form-profile`}
              onSubmit={handleSubmit}
              >
              <div className='profile__container'>
                <div className='profile__info'>
                  <label htmlFor='name' className='profile__text'>Имя</label>
                  <input
                    className='profile__input'
                    placeholder='Имя'
                    type='text'
                    name='username'
                    id='name'
                    ref={nameInputRef}
                    minLength='2'
                    maxLength='30'
                    pattern={validationParams.username.pattern}
                    value={values.username || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className='profile__info'>
                  <label htmlFor='email' className='profile__text'>E-mail</label>
                  <input
                    className='profile__input'
                    placeholder='E-mail'
                    type='email'
                    name='email'
                    id='email'
                    minLength='5'
                    maxLength='50'
                    pattern={validationParams.email.pattern}
                    value={values.email || ''}
                    onChange={handleChange}
                  />
                </div>
            </div>
            {isLoading ? <Preloader /> : ''}
            <p className='profile__error'>{errors.username || errors.email}</p>
            {isEdit
              ?
              <button type='submit' className='submit-btn'>Сохранить</button>
              :
              <button type='button' className='profile__edit-button' onClick={handleEdit}>Редактировать</button>
            }
            {!isEdit
              ?
              <button type='button' className='submit-btn' onClick={signOut}>Выйти из аккаунта</button>
              :
              ''
            }
          </form>
      </main>
    </section>
  )
};

export default Profile;
