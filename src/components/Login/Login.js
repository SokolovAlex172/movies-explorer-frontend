import SignForm from '../SignForm/SignForm';
import useFormValid from '../../hooks/useFormValid';
import { validationParams } from '../../utils/constants';

const Login = ({ handleLogin, isLoading }) => {
  const {
    errors,
    isValid,
    values,
    handleChange,
  } = useFormValid();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin(
      values.email,
      values.password,
    );
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
        isValid={isValid}
        isLoading={isLoading}
      >
        <label className='form__wrapper'>
          <p className='form__text'>E-mail</p>
          <input
            className='form__input'
            placeholder='E-mail'
            type='email'
            name='email'
            id='email'
            minLength='5'
            maxLength='32'
            required
            value={values.email || ''}
            pattern={validationParams.email.pattern}
            onChange={handleChange}
          />
          <p className='error' id='email-error'>{errors.email}</p>
        </label>

        <label className='form__wrapper'>
        <p className='form__text'>Пароль</p>
          <input
            className='form__input'
            placeholder='Пароль'
            type='password'
            name='password'
            id='password'
            minLength='8'
            maxLength='32'
            required
            value={values.password || ''}
            onChange={handleChange}
          />
          <p className='error' id='password-error'>{errors.password}</p>
        </label>
      </SignForm>
  )
};

export default Login;
