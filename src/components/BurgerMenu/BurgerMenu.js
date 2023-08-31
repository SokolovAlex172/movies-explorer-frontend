import cn from 'classnames';
import './BurgerMenu.css';
import {useLocation} from 'react-router-dom';

const BurgerMenu = ({loggedIn, isMenuOpen, setIsMenuOpen}) => {
  const { pathname } = useLocation();

  const burgerMenuClassNames = cn('burger-menu', {
    'burger-menu_invisible': !loggedIn,
    'burger-menu_close': isMenuOpen,
    'burger-menu_dark': !isMenuOpen && pathname === '/',
  });

  const handleBurgerMenuClick = () => setIsMenuOpen(!isMenuOpen);

  return (
    <button
      className={burgerMenuClassNames}
      type='button'
      onClick={handleBurgerMenuClick}
    >
      <span className="burger-menu__line" />
    </button>
  )
};

export default BurgerMenu;
