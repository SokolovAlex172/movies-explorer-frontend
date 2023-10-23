import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Navigation.css';

const Navigation = ({ isMenuOpen, setIsMenuOpen }) => {
  const { pathname } = useLocation();
  const colorChange = window.innerWidth >= 1280;

  const navigationClassNames = `navigation ${isMenuOpen ? 'navigation_opened' : ''}`;

  const mainLinkClassNames = `navigation__link navigation__link_type_main ${
    pathname === '/' ? 'navigation__link_active' : ''
  } ${pathname === '/' && colorChange ? 'navigation__link_color' : ''}`;

  const moviesLinkClassNames = `navigation__link ${
    pathname === '/movies' ? 'navigation__link_active' : ''
  } ${pathname === '/' && colorChange ? 'navigation__link_color' : ''}`;

  const savedMoviesLinkClassNames = `navigation__link ${
    pathname === '/saved-movies' ? 'navigation__link_active' : ''
  } ${pathname === '/' && colorChange ? 'navigation__link_color' : ''}`;

  const profileLinkClassNames = `navigation__profile-link ${
    pathname === '/' && colorChange ? 'navigation__profile-link_color' : ''
  }`;

  return (
    <div className={navigationClassNames}>
      <nav className='navigation__content'>
        <div className='navigation__wrapper'>
          <Link to='/' className={mainLinkClassNames}>
            Главная
          </Link>
          <Link to='/movies' className={moviesLinkClassNames}>
            Фильмы
          </Link>
          <Link to='/saved-movies' className={savedMoviesLinkClassNames}>
            Сохранённые фильмы
          </Link>
        </div>
        <Link to='/profile' className={profileLinkClassNames}>
          Аккаунт
        </Link>
      </nav>
    </div>
  );
};

export default Navigation;