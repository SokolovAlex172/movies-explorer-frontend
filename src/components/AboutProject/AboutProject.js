import './AboutProject.css'

const AboutProject = () => {
  return (
    <section className='about-project' id="about-project">
      <div className='container'>
        <h2 className='section-title'>О проекте</h2>
        <div className='about-project__content'>
          <div className='about-project__info'>
            <div className='about-project__item'>
              <h3 className='about-project__item-title'>Дипломный проект включал 5 этапов</h3>
              <p className='about-project__item-subtitle'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </div>
            <div className='about-project__item'>
              <h3 className='about-project__item-title'>На выполнение диплома ушло 5 недель</h3>
              <p className='about-project__item-subtitle'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
          </div>
          <div className='about-project__progress'>
            <div className='about-project__weeks'>
              <p className='about-project__weeks-text'>1 неделя</p>
              <p className='about-project__weeks-text'>4 недели</p>
            </div>
            <div className='about-project__web'>
              <p className='about-project__web-text'>Back-end</p>
              <p className='about-project__web-text'>Front-end</p>
            </div>
          </div>
        </div>
        </div>
      </section>
  )
};

export default AboutProject;