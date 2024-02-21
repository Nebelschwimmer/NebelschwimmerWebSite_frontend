import './home_page.scss';
;
import { useNavigate } from 'react-router-dom';
import { scrollToTop } from '../../utils/utils';
import { Link } from 'react-router-dom';
import { Spinner } from '../../components/Spinner/Spinner';

export const HomePage = ({langEn, currentUser}) => {
  return (
  <div className='home__page'>
    <span className='home__page__greeting' >{langEn ? 'Welcome to' : 'Приветствуем вас на сайте'}</span>
    <span className='home__page__title'>Surland</span>
    <section className='home__page__about'>
      {langEn ?
      <div>
        <p>This website is dedicated to exchanging music and texts related to surrealism.</p>
      
        <div>
          <p>In order to be able to publish your own art, leave comments and set favorites, please, </p>
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
          <p>Чтобы публиковать свое творчество и оставлять комментарии и лайки, пожалуйста,</p>
            <p>
              <Link className='home__page__about__link' to="/register"> зарегистируйтесь </Link>
              или
              <Link className='home__page__about__link' to="/sign-in"> войдите в аккаунт.</Link>
            </p>
        </div>

      </div>

      }
    </section>
  </div>  
  )
}