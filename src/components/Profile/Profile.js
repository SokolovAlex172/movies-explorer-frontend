import './Profile.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileForm from '../ProfileForm/ProfileForm';


const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);

  const userName = 'Виталий';
  const email = 'pochta@yandex.ru';

  const handleEditBtnClick = () => setIsEdit(true);

  return (
    <section className='profile'>
      <main>
        <h2 className='profile__title'>{`Привет, ${userName}!`}</h2>
        {isEdit
          ?
          <ProfileForm
            buttonText='Сохранить'
            formName='profile'
            setIsEdit={setIsEdit}
            userName={userName}
            email={email}
          />
          :
          <form className='profile__form'>
            <div className='profile__container'>
              <div className='profile__info'>
                <p className='profile__text'>Имя</p>
                <p className='profile__text'>{userName}</p>
              </div>
              <div className='profile__info'>
                <p className='profile__text'>E-mail</p>
                <p className='profile__text'>{email}</p>
              </div>
            </div>
            <div className='profile__nav'>
              <button type='button' className='profile__edit-button' onClick={handleEditBtnClick}>Редактировать</button>
              <Link to={`/`} className='profile__link'>Выйти из аккаунта</Link>
            </div>
          </form>
        }
      </main>
    </section>
  )
};

export default Profile;
