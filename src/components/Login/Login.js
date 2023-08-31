import SignForm from '../SignForm/SignForm';

const Login = () => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <SignForm
      buttonText='Войти'
      formName='login'
      question='Ещё не зарегистрированы?'
      linkText='Регистрация'
      loginTilte='Рады видеть!'
      link='signup'
      onSubmit={handleSubmit}
    >
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

export default Login;
