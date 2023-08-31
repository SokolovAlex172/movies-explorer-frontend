import SignForm from "../SignForm/SignForm";

const Register = () => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <SignForm
      buttonText='Зарегистрироваться'
      formName='register'
      question='Уже зарегистрированы?'
      loginTilte='Добро пожаловать!'
      linkText='Войти'
      link='signin'
      onSubmit={handleSubmit}
    >
      <div className='form__wrapper'>
        <p className='form__text'>Имя</p>
        <input
          className='form__input'
          placeholder='Имя'
          type='text'
          name='name'
          id='name'
          required
        />
        <p className='error' id='name-error'></p>
      </div>

      <div className='form__wrapper'>
        <p className='form__text'>E-mail</p>
        <input
          className='form__input'
          placeholder='E-mail'
          type='email'
          name='email'
          id='email'
          required
        />
        <p className='error' id='email-error'></p>
      </div>

      <div className='form__wrapper'>
        <p className='form__text'>Пароль</p>
        <input
          className='form__input'
          placeholder='Пароль'
          type='password'
          name='password'
          id='password'
          required
        />
        <p className='error' id='password-error'></p>
      </div>
    </SignForm>
  )
};

export default Register;
