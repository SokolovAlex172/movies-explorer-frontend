import './Navigation.css';
import { Link, useLocation } from "react-router-dom";
import cn from 'classnames';

const Navigation = ({isMenuOpen, setIsMenuOpen}) => {
  const { pathname } = useLocation();
  const colorChange = window.innerWidth >= 1280;

  const navigationClassNames = cn('navigation', {
    'navigation_opened': isMenuOpen,
  });

  const mainLinkClassNames = cn('navigation__link navigation__link_type_main', {
    'navigation__link_active': pathname === '/',
    'navigation__link_color': pathname === '/' && colorChange,
  })

  const moviesLinkClassNames = cn('navigation__link', {
    'navigation__link_active': pathname === '/movies',
    'navigation__link_color': pathname === '/' && colorChange,
  });

  const savedMoviesLinkClassNames = cn('navigation__link', {
    'navigation__link_active': pathname === '/saved-movies',
    'navigation__link_color': pathname === '/' && colorChange,
  });

  const profileLinkClassNames = cn('navigation__profile-link', {
    'navigation__profile-link_color': pathname === '/' && colorChange,
  })

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
  )
};

export default Navigation;
