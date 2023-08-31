import logo from '../../image/logo.svg'
import './Header.css';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import React from "react";
import cn from 'classnames';
import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

const Header = () => {
  const { pathname } = useLocation();
  const [loggedIn, setLoggedIn] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

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
          {loggedIn ? <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
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