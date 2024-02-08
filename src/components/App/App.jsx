import './App.css';
import { Header } from '../Header/Header'
import { useState, useEffect } from 'react'
import {HomePage} from '../../pages/Home_page/HomePage'
import {Footer} from '../Footer/Footer'
import { Route, Routes, useNavigate } from "react-router-dom";
import { MusicPage } from '../../pages/MusicPage/MusicPage';
import { TextsPage } from '../../pages/TextsPage/TextsPage';
import { Register } from '../Auth/Register';
import {signOut, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.js";
import { SignIn } from '../Auth/SignIn.jsx';
import { UserSettings } from '../Auth/UserSettings.jsx';
import { ResetPassword } from '../Auth/ResetPassword.jsx';
import { addLikeById } from '../../utils/api_music.js';
import { getMusicList } from '../../utils/api_music.js';
import { deleteMusicLikeById } from '../../utils/api_music.js'; 
import { AddTextPage } from '../AddTextPage/AddTextPage.jsx';
import { SingleTextPage } from '../SingleTextPage/SingleTextPage.jsx';

function App() {
  // Стейты:
  // Для изменения языка
  const [langEn, setLangEn] = useState(true);
  // Для актуального пользователя
  const [currentUser, setCurrentUser] = useState('')
  // Для отображения модального окна
  const [showModal, setShowModal] = useState(false);
  // Для музыки
  const [trackList, setTrackList] = useState([]);

  const [texts, setTexts] = useState([]);


  // Функция для навигации
  const navigate = useNavigate()

  //---- Логика для страницы с аутентификации------

  // Достаем юзера
  const [user] = useAuthState(auth);
  
  // Фунция для выхода из аккаунта
  const onSignOut = async () => {
    await signOut(auth).then(() => {
      navigate('/');
      setCurrentUser('')
    }).catch((error) => {
      console.log(error)
    });
    }
  // Фунция для авторизации через Гугл
  const signInWithGoogle = async () => {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          console.log(user.displayName)
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
        });
      }
  // Если пользователь аутентифицирован в Firebase, сетим его извене в стейт фронтенда, иначе возвращаем undefined 
  useEffect(()=>{
    if (user !== null) {setCurrentUser(user)}
    else return

  }, [user])
  
  // --------------------------------------
  
  //---- Логика для страницы с музыкой------

  // Получаем карточки с музыкой
  useEffect(()=>{
    getMusicList().then((result)=>{
      setTrackList(result.data)
    })
  }, [])


// Функция для отправки или удаления лайка музыки по клику.
// Если лайк поставлен, происходил удаление лайка
  const handleMusicLike = (track) =>{
    const trackIsLiked = track?.track_likes?.some((s) => s === currentUser.uid);
    
    if (trackIsLiked) {
        deleteMusicLikeById({user_id: currentUser.uid, track_id: track.track_id}).then((newTrackList)=>{
        setTrackList(newTrackList)
        })
      }
    else {
      addLikeById({user_id: currentUser.uid, track_id: track.track_id}).then((newTrackList)=>{
        setTrackList(newTrackList)
      })
    }
  }
// --------------------------------------
return (
  <>
    <Header langEn={langEn} setLangEn={setLangEn} currentUser={currentUser} user={user} onSignOut={onSignOut} />
      <main className='main_content_container'>

      <Routes>
        <Route path='/' element={<HomePage langEn={langEn} setLangEn={setLangEn} />}></Route> 
        <Route path='/texts/:textID' element={<SingleTextPage currentUser={currentUser} setLangEn={setLangEn} showModal={showModal} setShowModal={setShowModal} texts={texts} setTexts={setTexts} langEn={langEn} />}> </Route> 
        <Route path='/music' element={<MusicPage showModal={showModal} setShowModal={setShowModal} trackList={trackList} handleMusicLike={handleMusicLike} setTrackList={setTrackList} langEn={langEn} currentUser={currentUser}/>}></Route>
        <Route path='/texts' element={<TextsPage  currentUser={currentUser} showModal={showModal} 
        setShowModal={setShowModal} langEn={langEn} texts={texts} setTexts={setTexts}/>}></Route>
        <Route path='/texts/add-text' element={<AddTextPage texts={texts} setTexts={setTexts} langEn={langEn} showModal={showModal} setShowModal={setShowModal}/>}></Route> 
        <Route path='/register' element={<Register langEn={langEn} currentUser={currentUser} setCurrentUser={setCurrentUser} signInWithGoogle={signInWithGoogle}/>}></Route>
        <Route path='/user-settings' element={<UserSettings showModal={showModal} setShowModal={setShowModal} onSignOut={onSignOut}  currentUser={currentUser} setCurrentUser={setCurrentUser}/>}></Route>
        <Route path='/sign-in' element={<SignIn langEn={langEn} signInWithGoogle={signInWithGoogle}/>}></Route>
        <Route path='/password-reset' element={<ResetPassword langEn={langEn}/>}></Route>       
      
      </Routes>
    </main>
    <Footer/>
  </>
  );
}

export default App;
