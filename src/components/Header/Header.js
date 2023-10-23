import logo from '../../images/logo.svg'
import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

const Header = ({ loggedIn, isMenuOpen, setIsMenuOpen }) => {
  const { pathname } = useLocation();

  const headerClassNames = `header ${pathname === '/' ? 'header_bg_blue' : ''}`;

  return(
    <header className={headerClassNames}>
        <div className='header__content'>
        <BurgerMenu loggedIn={loggedIn} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <Link to='/'  className={loggedIn ? '' :'header__logo-link'}>
            <img
              src={logo}
              alt='Лого'
              className='logo'
            />
          </Link>
          {loggedIn ? 
          <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
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