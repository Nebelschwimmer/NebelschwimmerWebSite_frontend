import './header.scss'
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import {Link, useNavigate } from 'react-router-dom';
import cn from "classnames";
import {scrollToTop} from '../../utils/utils.js'
import { useEffect, useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LogoutIcon from '@mui/icons-material/Logout';
import uk_flag from '../../pictures/uk-flag.webp';
import rus_flag from '../../pictures/rus_flag.png';
import logo from '../../pictures/Logo_surLand2.svg';




export const Header = ({langEn, setLangEn, currentUser, onSignOut, user}) => {

  // Стейт для отображения аватара
  const [avatarURL, setAvatarURL] = useState('');
  // Стейт для отображения имени
  const [name, setName] = useState('')
  // Стейт для поповера
  const [showPopOver, setShowPopover] = useState(false)

  const [showLangPopOver, setShowLangPopOver] = useState(false)
  

  
  
  // Указываем Реакту, чтобы не показывал поповер, когда пользователь регистрируется либо входит в аккаунт
  useEffect(()=>{
    if (currentUser !== null) setShowPopover(false)
  }, [currentUser])

// Если объект с пользователем не пришел, возвращаем undefined  
  useEffect(()=>{
    if (currentUser === null) return
  }, [currentUser])

// Записываем в переменные аватар, имя и email из объекта пользователя
  const photoURL = currentUser.photoURL;
  const userName = currentUser.displayName;
  const userEmail = currentUser.email;

  // Если пользователь не указал имя, отображаем его email
  useEffect(()=>{
    if (userName !== null) setName(userName) 
    else setName(userEmail)
  }, [userName, currentUser])

  // Если пользователь авторизован, URL его аватара приходит из объекта. Если пользователь не вошел или вошел, но не выбрал ввел ссылку на автар, 
// отображается картинка по умолчанию
  useEffect(()=>{
    if (photoURL !== null) {
      setAvatarURL(photoURL)
    }
    else setAvatarURL('https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg')
  }, [photoURL, currentUser])

// Для навигации
const navigate = useNavigate()

// Функция для изменения языка.
  const onEnLangChange = () => {
    if (langEn) setLangEn(true)
    else setLangEn(true);
    scrollToTop();
    setShowLangPopOver(false);
  }

  const onRuLangChange = () => {
    if (!langEn) setLangEn(false)
    else setLangEn(false);
    scrollToTop();
    setShowLangPopOver(false);
  }


  // console.log(user)

  return (
  <div className='header'>
    <div className='header_container'>
      <div className='header_icon_container'>
        <span className='header_icon'>
          <MenuIcon fontSize='large'/>
        </span>
        <span onClick={()=>{navigate('/')}} className='header_name_wrapper_logo'>SurLand</span>

      </div>

      
      {langEn ? 
        <nav className='header_controls_block'>
          <div className='header_aut_nav'>
          
          {currentUser  ? (
          <div className='header_aut_nav_wrapper'>
            <div title={langEn ? 'View Profile' : 'Личный кабинет'} onClick={()=>{navigate('/user-settings')}} className='header_aut_name_img_wrapper'>
              <span>{userName}</span>
              <img className='header_aut_nav_img' src={avatarURL}/>
            </div>
        
            <button className='header_controls_block_single_btn_signin' title='Sign out' onClick={()=>{setShowPopover(true)}}><LogoutIcon /></button>
            {!!showPopOver &&
          <div className='header_popover'>
            <span>{langEn ? 'Are you sure?' : "Вы уверены?"}</span>
            <div className='header_popover_btns_wrapper'>
              <button className='header_popover_btn' onClick={()=>{onSignOut()}}>{langEn ? 'Sign out' : "Выйти"}</button>
              <button className='header_popover_btn' onClick={()=>{setShowPopover(false)}}>{langEn ? 'Cancel' : "Выйти"}</button>
            </div>
          </div>
            }
          </div>
          )
          :
          (<div className='header_aut_nav_wrapper'>
            <button onClick={()=>navigate('/sign-in')} title='Sign in' className='header_controls_block_single_btn_signin' >
            <LoginIcon/>Sign in</button>
            <button  onClick={()=>navigate('/register')} title='Sign up' className='header_controls_block_single_btn_signin' >
            <HowToRegIcon/>Sign up</button>
          </div>)}
          </div>
          
          
          
        
          <div className='header_controls_block_nav_btns_wrapper'>
            <Link className='header_controls_block_single_btn_link' to="/">
              <button className='header_controls_block_single_btn' ><HomeIcon fontSize='small'/>Ноme</button></Link>
            <Link className='header_controls_block_single_btn_link' to="/music">
              <button className='header_controls_block_single_btn'><LibraryMusicIcon fontSize='small'/>Music</button></Link>
            <Link className='header_controls_block_single_btn_link' to="/texts?page=1">
              <button className='header_controls_block_single_btn'><LibraryBooksIcon fontSize='small'/>Texts</button></Link>
            <Link className='header_controls_block_single_btn_link' to="/pictures">
              <button className='header_controls_block_single_btn'><InsertPhotoOutlinedIcon fontSize='small'/>Pictures</button></Link>
          </div>
        </nav>
        :
        <nav className='header_controls_block'>
          <div className='header_aut_nav'>
          {currentUser ? (
          <div className='header_aut_nav_wrapper'>
            <img onClick={()=>{navigate('/user-settings')}}  className='header_aut_nav_img' src={avatarURL}/>
            <span>{userName}</span>
            <button className='header_controls_block_single_btn_signin' title='Выйти' onClick={()=>{setShowPopover(true)}}> <LogoutIcon/></button>
            {!!showPopOver &&
          <div className='header_popover'>
            <span>{langEn ? 'Are you sure?' : "Вы уверены?"}</span>
            <div className='header_popover_btns_wrapper'>
              <button className='header_popover_btn' onClick={()=>{onSignOut()}}>{langEn ? 'Sign out' : "Выйти"}</button>
              <button className='header_popover_btn' onClick={()=>{setShowPopover(false)}}>{langEn ? 'Cancel' : "Отмена"}</button>
            </div>
          </div>
            }
          </div>
          )
          :
          (<div className='header_aut_nav_wrapper'>
            <button onClick={()=>navigate('/sign-in')} className='header_controls_block_single_btn_signin' >
            <LoginIcon/>Войти</button>
            <button  onClick={()=>navigate('/register')}  className='header_controls_block_single_btn_signin' >
            <HowToRegIcon/>Регистрация</button>
        </div>
        )}
          </div>
          <div className='header_controls_block_nav_btns_wrapper'>
            <Link className='header_controls_block_single_btn_link' to="/">
              <button className='header_controls_block_single_btn'><HomeIcon fontSize='small'/>Главная</button></Link>
            <Link className='header_controls_block_single_btn_link' to="/music">
              <button className='header_controls_block_single_btn'><LibraryMusicIcon fontSize='small'/>Музыка</button></Link>
            <Link className='header_controls_block_single_btn_link' to="/texts">
              <button className='header_controls_block_single_btn'><LibraryBooksIcon fontSize='small'/>Тексты</button></Link>
            <Link className='header_controls_block_single_btn_link' to="/pictures">
              <button className='header_controls_block_single_btn'><InsertPhotoOutlinedIcon fontSize='small'/>Картинки</button></Link>
            
          </div>
        </nav>
      }
        <div className='header_controls_block_languages' >
          
          <div className='header_controls_languages_wrapper' onClick={()=>{setShowLangPopOver(true)}} title={langEn? "Switch languages" : "Переключить язык"}>
          {langEn? "Language" : "Язык"}
              <img className='header_lang_img' src={langEn? uk_flag : rus_flag} alt='flag'/>
          </div>
          {showLangPopOver &&
            <div className='header_controls_languages_popover' onMouseLeave={()=>{setShowLangPopOver(false)}}>
              <img className='header_lang_img' title='English' src={uk_flag} alt='flag' onClick={()=>{onEnLangChange()}}/>
              <img className='header_lang_img' title='Русский' src={rus_flag} alt='flag' onClick={()=>{onRuLangChange()}}/>
            </div>
          }
        
        </div>
    </div>
  </div>  
  )
}
