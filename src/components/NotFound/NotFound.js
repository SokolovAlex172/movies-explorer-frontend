import './NotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className='not-found'>
      <main>
        <div className='not-found__container'>
          <h1 className='not-found__title'>404</h1>
          <p className='not-found__description'>Страница не найдена</p>
        </div>
        <Link to='/' className='not-found__link'>Назад</Link>
      </main>
    </section>
  )
}

export default NotFound;
