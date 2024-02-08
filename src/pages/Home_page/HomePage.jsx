import './home_page.css'
import MyPhoto from './MyPhoto.jpg'
import { useNavigate } from 'react-router-dom'
import { scrollToTop } from '../../utils/utils'
import { Link } from 'react-router-dom'

export const HomePage = ({langEn}) => {
  return (
  <>
  {langEn ? <div>
  <h1 className="home_page_title">Welcome to Nebelschwimmer's Personal Website!</h1>
  
  <section className="home_page_descrpition_container">
    <div className='home_page_descrpition_greetings'>
      <div>
        <p>Hi, my real name is <b>Andrew Dyakov</b> and my nickname is <em>Nebelschwimmer</em>, which stands for "Fog Swimmer" in English. </p>
        <h3>Thank you for visiting my website!</h3>
        <p>I made it myself in order to be able to share my creations with you.</p>
        <p>Here you can find the following pages:</p>
      </div>
      <div className='home_page_descrpition_links_block'>
        <Link to='/music' ><button className='home_page_descrpition_links__btn' onClick={()=>{scrollToTop()}}>Music</button></Link>
        <Link to='/texts' ><button className='home_page_descrpition_links__btn' onClick={()=>{scrollToTop()}}>Texts</button></Link>
        <button className='home_page_descrpition_links__btn'>Frontend projects</button>
        <button className='home_page_descrpition_links__btn'>Contacts</button> 
      </div>
      <div>
      <h3>Please, 
        <Link style={{textDecoration:"none", color:'darkorange'}} to='/register'>  sign up  </Link>
        or
        <Link style={{textDecoration:"none", color:'darkorange'}} to='/sign-in'>  sign in  </Link>
        to be able to leave likes and comments!</h3> 
        <h2>About me</h2>
        <h4>Short Biography</h4>
        <div className='home_page_biography_block'>
        <p>My hometown is Vologda, Russia.</p>
        <p>I was born in 1991 in that very city, where I've lived most part of my life.</p>
        <p>After school I enrolled in Vologda State Pedagogical university where I studied French and English for 5 years.
          I graduated in 2013 with excellence. My qualification is "Linguist, French and English teacher".
        <p>Then I worked as a school teacher (English and French) for many years.</p>
        <p>Now I would like to change my job to become a professional web-developer.</p>
        </p>
        
      </div> 
      <h4>Hobbies</h4>
      <p>I'm into a lot of things:</p> 
      <ul className='home_page_hobbies_list'>
        <li>music (composing, playin the flute, the piano)</li>
        <li>3d graphics (3ds max)</li>
        <li>linguistics (European languages)</li>
        <li>literature (I write surrealistic short stories)</li>
        <li>science (Biology, Chemistry, Physics, Astronomy, medicine)</li>
        <li>cooking (all kinds of!)</li>
        <li>fitness</li>
        <li>web-development (Frontend, Backend)</li>
      </ul>     
    </div>
  </div>
    <span>
      <img  className='home_page_descrpition_image' src={MyPhoto}/>
    </span>
  </section>
  </div>
:
<div>
<h1 className="home_page_title">Приветствую вас на моем личном сайте!</h1>
  
  <section className="home_page_descrpition_container">
    <div className='home_page_descrpition_greetings'>
      <div>
        <p>Мое настоящее имя — <b>Андрей Дьяков</b>, мой никнейм — <em>Nebelschwimmer</em>, что в переводе с немецкого означает «Пловец в тумане». </p>
        <h3>Благодарю за посещение моего сайта!</h3>
        <p>Я создал его сам, чтобы иметь возможность поделиться с вами своими творениями, в том числе продемонстрировать свои умения в веб-разработке.</p>
        <p>Здесь вы можете найти следующие страницы:</p>
      </div>
      <div className='home_page_descrpition_links_block'>
        <button className='home_page_descrpition_links__btn' onClick={()=>{navigate('/music/ru')}}>Музыка</button>
        <button className='home_page_descrpition_links__btn' onClick={()=>{navigate('/texts/ru')}}>Тексты</button>
        <button className='home_page_descrpition_links__btn' onClick={()=>{navigate('/frontend/ru')}}>Фронтенд проекты</button>
        <button className='home_page_descrpition_links__btn' onClick={()=>{navigate('/contacts/ru')}}>Контакты</button> 
      </div>
      <div>
        
      <h3>Пожалуйста, 
        <Link style={{textDecoration:"none", color:'darkorange'}} to='/register'>  зарегистрируйтесь  </Link>
        или
        <Link style={{textDecoration:"none", color:'darkorange'}} to='/sign-in'>  войдите  </Link>
        чтобы иметь возможность ставить лайки и комментировать!</h3> 
        
        <h3>Обо мне</h3>
        <h4>Краткая биография</h4>
        <div className='home_page_biography_block'>
        <p>Я родился в 1991 году в г.Вологде и сейчас живу в этом же городе.</p>
        <p>После школы я поступил в Вологодский государственный педагогический университет, где 5 лет изучал французский и английский языки.
        Я закончил обучение в 2013 году с отличием. Моя квалификация: «Лингвист, преподаватель французского и английского языков».
        <p>Потом я много лет работал школьным учителем (английский и французский языки).</p>
        <p>Сейчас я хотел бы сменить работу и стать профессиональным веб-разработчиком..</p>
        </p>
        
      </div> 
      <h4>Увлечения</h4>
      <p>Я интересуюсь многим, в частности:</p> 
      <ul className='home_page_hobbies_list'>
        <li>музыка (composing, playin the flute, the piano)</li>
        <li>3d графика(3ds max)</li>
        <li>лингвистика (европейские языки)</li>
        <li>литература (пишу сюрреалистические рассказы)</li>
        <li>естествознание (биология, химия, физика, астрономия, медицина)</li>
        <li>кулинария (все виды!)</li>
        <li>фитнес</li>
        <li>веб-разработка (Frontend, Backend)</li>
      </ul>     
    </div>
  </div>
    <span>
      <img  className='home_page_descrpition_image' src={MyPhoto}/>
    </span>
  </section>
</div> 
}

  </>  
  )
}