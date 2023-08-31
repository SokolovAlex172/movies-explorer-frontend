const ProfileForm = ({ buttonText, formName, setIsEdit, userName, email }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsEdit(false);
  };

  return (
    <form 
      className='profile__form'
      name={`profile__${formName}`}
      action=''
      method=''
      onSubmit={handleSubmit}
    >
    <div className='profile__container'>
        <div className='profile__info'>
          <label htmlFor='name' className='profile__text'>Имя</label>
          <input
            className='profile__input'
            type='text'
            name='name'
            id='name'
            value={userName}
          />
        </div>
        <div className='profile__info'>
          <label htmlFor='email' className='profile__text'>E-mail</label>
          <input
            className='profile__input'
            type='email'
            name='email'
            id='email'
            value={email}
          />
        </div>
      </div>
      <p className='error'></p>
      <button type='submit' className='submit-btn'>{buttonText}</button>
    </form>
  )
}

export default ProfileForm;