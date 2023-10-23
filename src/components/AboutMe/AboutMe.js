import './AboutMe.css';
import student from '../../images/student.jpg';

const AboutMe = () => {
  return (
    <section className='about-me' id='about-me'>
      <div className='container-sm'>
        <h2 className='section-title'>Студент</h2>
        <div className='about-me__content'>
          <div className='about-me__info'>
            <h3 className='about-me__title'>Виталий</h3>
            <p className='about-me__subtitle'>Фронтенд-разработчик, 30 лет</p>
            <p className='about-me__text'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и&nbsp;дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании 
              «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
            <a className='about-me__link' href='https://github.com/SokolovAlex172' target='_blank' rel='noreferrer'>Github</a>
          </div>
          <img className='about-me__image' src={student} alt='Фотография-студента'></img>
        </div>
      </div>
    </section>
  )
};

export default AboutMe;