import './home_page.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';




export const HomePage = ({}) => {
  const langEn = useSelector((state) => state.langEn);
  return (
  <div className='home__page'>
   
    <span className='home__page__title'>Surland</span>
    <section className='home__page__about'>
      {langEn ?
      <div>
        <p>This website is dedicated to exchanging music and texts related to surrealism.</p>
              <div>
          <p>In order to be able to publish your own art, leave comments and add to favorites, please, </p>
            <p>
              <Link className='home__page__about__link' to="/register"> sign up </Link>
            or
              <Link className='home__page__about__link' to="/sign-in"> sign in. </Link>
            </p>
        </div>
      
      </div>
      :
      <div>
        <p>Сайт посвящен обмену творчеством, связанным с сюрреализмом.</p>
        <div>
          <p>Чтобы публиковать свое творчество, оставлять комментарии и ставить лайки, пожалуйста,</p>
            <p>
              <Link className='home__page__about__link' to="/register"> зарегистируйтесь </Link>
              или
              <Link className='home__page__about__link' to="/sign-in"> войдите в аккаунт.</Link>
            </p>
        </div>
      </div>
      }
    </section>
    <section className='home__page__links'>    
        <Link className='home__page__links__container music' to={'/music'}>{langEn ? 'Music' : 'Музыка'}</Link>
        <Link className='home__page__links__container texts' to={'/texts'}>{langEn ? 'Texts' : 'Тексты'}</Link>
        <Link className='home__page__links__container pictures' to={'/pictures'}>{langEn ? 'Pictures' : 'Картинки'}</Link>
    </section>
  </div>  
  )
}