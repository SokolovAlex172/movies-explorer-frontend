import './NavTab .css';



const NavTab = () => {
  return (
  <nav className='nav-tab'>
    <div className='nav-tab__content'>
      <ul className='nav-tab__list'>
        <li className='nav-tab__item'>
          <a className='nav-tab__link' href="#about-project">О проекте</a>
        </li>
        <li className='nav-tab__item'>
          <a className='nav-tab__link' href="#techs">Технологии</a>
        </li>
        <li className='nav-tab__item'>
          <a className='nav-tab__link' href="#about-me">Студент</a>
        </li>
      </ul>
    </div>
  </nav>
  )

}

export default NavTab