import { Link } from 'react-router-dom';
import './SignForm.css';
import logo from '../../images/logo.svg';


function SignForm({
  children, 
  loginTilte, 
  formName, 
  question, 
  linkText, 
  link, 
  onSubmit,

  }) {

  return (
    <section className='login'>
      <main>
        <div className='login__container'>
          <Link to='/' className='login__logo-link'>
            <img src={logo} alt='Лого' className='logo' />
          </Link>
          <h1 className='login__title'>{loginTilte}</h1>
        </div>

        <form
          className='form'
          name={`form-${formName}`}
          action='' 
          method=''
          onSubmit={onSubmit}
        >
          {children}
        </form>

        <p className='login__question'>{question}&nbsp;
          <Link to={`/${link}`} className='login__link'>{linkText}</Link>
        </p>
      </main>
    </section>
  )
};

export default SignForm;
