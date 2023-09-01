import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className='portfolio'>
      <div className='container-sm'>
        <h3 className='portfolio__title'>Портфолио</h3>
        <div className='portfolio__links'>
          <a className='portfolio__link' href="https://github.com/SokolovAlex172/how-to-learn" target='_blank'>
            <p className='portfolio__link-text'>Статичный сайт</p>
            <p className='portfolio__link-arrow'>↗</p>
          </a>
          <a className='portfolio__link' href="https://sokolovalex172.github.io/russian-travel/index.html#" target='_blank'>
            <p className='portfolio__link-text'>Адаптивный сайт</p>
            <p className='portfolio__link-arrow'>↗</p>
          </a>
          <a className='portfolio__link' href="https://sokolovalex172.github.io/mesto/" target='_blank'>
            <p className='portfolio__link-text'>Одностраничное приложение</p>
            <p className='portfolio__link-arrow'>↗</p>
          </a>
        </div>
      </div>
    </section>
  )
};

export default Portfolio;