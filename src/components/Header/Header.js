import logo from '../../images/logo.svg'
import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

const Header = ({ loggedIn, isMenuOpen, setIsMenuOpen, handleOverlayClick }) => {
  const { pathname } = useLocation();

  const headerClassNames = cn('header', {
    'header_bg_blue': pathname === '/',
  });

  return(
    <header className={headerClassNames}>
        <div className='header__content'>
        <BurgerMenu loggedIn={loggedIn} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <Link to="/"  className={loggedIn ? '' :'header__logo-link'}>
            <img
              src={logo}
              alt="Лого"
              className='logo'
            />
          </Link>
          {loggedIn ? <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} handleOverlayClick={handleOverlayClick}/>
          : 
          <nav className='header__navigation'>
              <Link to='/signup' className='header__register-link'>
                Регистрация
              </Link>
              <Link to='/signin' className='header__login-link'>
                Войти
              </Link>
            </nav>
          }
        </div>
    </header>

  );
};
export default Header;