import SignForm from '../SignForm/SignForm';
import useFormValidation from '../../hooks/useFormValidation';
import FormButton from '../FormButton/FormButton';
import {NAME_REGEX, EMAIL_REGEX} from '../../utils/constants';

const Register = ({ handleRegister, isPreloader }) => {
  const { 
    inputValues, 
    errorText, 
    isValid, 
    handleChange, 
    resetForm } = useFormValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegister(inputValues);
    resetForm();
  }
  
  return (
    <SignForm
      formName='register'
      question='Уже зарегистрированы?'
      loginTilte='Добро пожаловать!'
      linkText='Войти'
      link='signin'
      isValid={isValid}
      onSubmit={handleSubmit}
      isPreloader={isPreloader}
    >
      <div className='form__wrapper'>
        <p className='form__text'>Имя</p>
        <input
          className='form__input'
          placeholder='Имя'
          type='text'
          name='name'
          id='name'
          minLength={2}
          maxLength={32}
          onChange={handleChange}
          value={inputValues.name || ''}
          pattern= {NAME_REGEX}
          required
        />
        <p className='error' id='name-error'>{errorText.name}</p>
      </div>

      <div className='form__wrapper'>
        <p className='form__text'>E-mail</p>
        <input
          className='form__input'
          placeholder='E-mail'
          type='email'
          pattern={EMAIL_REGEX}
          name='email'
          id='email'
          onChange={handleChange}
          value={inputValues.email || ''}
          required
        />
        <p className='error' id='email-error'>{errorText.email}</p>
      </div>

      <div className='form__wrapper'>
        <p className='form__text'>Пароль</p>
        <input
          className='form__input'
          placeholder='Пароль'
          type='password'
          name='password'
          id='password'
          minLength={8}
          maxLength={32}
          onChange={handleChange}
          value={inputValues.password || ''}
          required
        />
        <p className='error' id='password-error'>{errorText.password}</p>
      </div>
      <FormButton buttonText={'Зарегистрироваться'} isValid={isValid}/>
    </SignForm>
  )
};

export default Register;
