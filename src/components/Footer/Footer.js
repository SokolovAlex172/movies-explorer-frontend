import './Footer.css';

const Footer = () => {
  return(
    <footer className='footer'>
      <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__info'>
        <p className='footer__year'>&copy;2020</p>
        <div className='footer__links'>
        <a className='footer__link' href="https://practicum.yandex.ru" target='_blank'>Яндекс.Практикум</a>
        <a className='footer__link' href="https://github.com/" target='_blank'>Github</a>
        </div>
      </div>
    </footer>
  )
};

export default Footer;