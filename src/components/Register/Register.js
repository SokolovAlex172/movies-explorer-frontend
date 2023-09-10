import useFormValid from '../../hooks/useFormValid';
import { validationParams } from '../../utils/constants'
import SignForm from "../SignForm/SignForm";

const Register = ({ handleRegister, isLoading }) => {
  const {
    values,
    handleChange,
    errors,
    isValid,
  } = useFormValid();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleRegister(
      values.username,
      values.email,
      values.password,
    );
  };
  return (
    <SignForm
      buttonText='Зарегистрироваться'
      formName='register'
      question='Уже зарегистрированы?'
      loginTilte='Добро пожаловать!'
      linkText='Войти'
      link='signin'
      isLoading={isLoading}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className='form__wrapper'>
        <p className='form__text'>Имя</p>
        <input
          className='form__input'
          placeholder='Имя'
          type='text'
          name='username'
          id='name'
          minLength='2'
          maxLength='32'
          required
          value={values.username || ''}
          pattern={validationParams.username.pattern}
          onChange={handleChange}
        />
        <p className='error' id='name-error'>{errors.username}</p>
      </label>

      <label className='form__wrapper'>
        <p className='form__text'>E-mail</p>
        <input
          className='form__input'
          placeholder='E-mail'
          type='email'
          name='email'
          id='email'
          minLength='5'
          maxLength='30'
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
          maxLength='30'
          required
          value={values.password || ''}
          onChange={handleChange}
        />
        <p className='error' id='password-error'>{errors.password}</p>
      </label>
    </SignForm>
  )
};

export default Register;
