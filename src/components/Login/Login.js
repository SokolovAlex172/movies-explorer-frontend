
import SignForm from '../SignForm/SignForm';
import useFormValidation from '../../hooks/useFormValidation';
import FormButton from '../FormButton/FormButton';
import {EMAIL_REGEX} from '../../utils/constants';

const Login = ({ handleLogin, isPreloader }) => {
  const { 
    inputValues, 
    errorText, 
    isValid, 
    handleChange, 
    resetForm } = useFormValidation();

  const handleSubmit = (evt) =>{
    evt.preventDefault();
    handleLogin(inputValues);
    resetForm();
  }

  return (
      <SignForm
        formName='login'
        question='Ещё не зарегистрированы?'
        linkText='Регистрация'
        loginTilte='Рады видеть!'
        link='signup'
        isValid={isValid}
        onSubmit={handleSubmit}
        isPreloader={isPreloader}
      >
        <label className='form__wrapper'>
          <p className='form__text'>E-mail</p>
          <input
            className='form__input'
            placeholder='E-mail'
            type='email'
            name='email'
            id='email'
            value={inputValues.email || ''}
            onChange={handleChange}
            pattern= {EMAIL_REGEX}
            required
          />
          <p className='error' id='email-error'>{errorText.email}</p>
        </label>

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
            value={inputValues.password || ''}
            onChange={handleChange}
            required
          />
          <p className='error' id='password-error'>{errorText.password}</p>
        </div>
        <FormButton isValid={isValid} buttonText={'Войти'}/>
      </SignForm>
  )
};

export default Login;
