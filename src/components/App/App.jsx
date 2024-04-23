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
import { Privacy } from '../Privacy/Privacy.jsx';
import { AddTextPage } from '../AddTextPage/AddTextPage.jsx';
import { SingleTextPage } from '../../pages/TextsPage/SingleTextPage/SingleTextPage.jsx';
import { AboutPage } from '../../pages/AboutPage/AboutPage.jsx';
import { PicturesPage } from '../../pages/PicturesPage/PicturesPage.jsx';
import { NotFound } from '../NotFound/NotFound.jsx';
import { AddMusicForm } from '../../pages/MusicPage/AddMusicForm/AddMusicForm.jsx';


function App() {
  // Стейты:
  // Для изменения языка
  const [langEn, setLangEn] = useState(false);
  // Для актуального пользователя
  const [currentUser, setCurrentUser] = useState('')
  // Для отображения модального окна
  const [showModal, setShowModal] = useState(false);

  const [texts, setTexts] = useState([]);

  const [trackList, setTrackList] = useState([]);
  
  const [pagesNumber, setPagesNumber] = useState();
  
  const [pageQuery, setPageQuery] = useState(1)

 const [pageMusicQuery, setPageMusicQuery] = useState(1);

 const [pagesMusicNumber, setPagesMusicNumber] = useState();




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
  


return (
  <>
    <Header showModal={showModal} setShowModal={setShowModal} langEn={langEn} setLangEn={setLangEn} currentUser={currentUser} user={user} onSignOut={onSignOut} />
      <main className='main_content_container'>

      <Routes>
        <Route path='/' element={<HomePage langEn={langEn} currentUser={currentUser} setLangEn={setLangEn} />}></Route> 
        <Route path='/texts/:textID' element={<SingleTextPage setTexts={setTexts} pageQuery={pageQuery} setPageQuery={setPageQuery} pagesNumber={pagesNumber}  currentUser={currentUser} 
          setLangEn={setLangEn} showModal={showModal} setShowModal={setShowModal} texts={texts}  langEn={langEn} />}> </Route> 
        <Route path='/music' element={<MusicPage  setPagesMusicNumber={setPagesMusicNumber} pagesMusicNumber={pagesMusicNumber} pageMusicQuery={pageMusicQuery} setPageMusicQuery={setPageMusicQuery} 
        showModal={showModal} setShowModal={setShowModal} trackList={trackList} setTrackList={setTrackList}  langEn={langEn} currentUser={currentUser}/>}>
        </Route>
        <Route path='/texts' element={<TextsPage pagesNumber={pagesNumber} setPagesNumber={setPagesNumber} currentUser={currentUser} pageQuery={pageQuery} setPageQuery={setPageQuery} showModal={showModal} 
        setShowModal={setShowModal} langEn={langEn} texts={texts} setTexts={setTexts}/>}></Route>
        <Route path='/texts/add-text' element={<AddTextPage pageQuery={pageQuery} pagesNumber={pagesNumber} currentUser={currentUser} texts={texts} setTexts={setTexts} langEn={langEn} setPageQuery={setPageQuery} showModal={showModal} setShowModal={setShowModal}/>}></Route> 
        <Route path='/register' element={<Register langEn={langEn} currentUser={currentUser} setCurrentUser={setCurrentUser} signInWithGoogle={signInWithGoogle}/>}></Route>
        <Route path='/user-settings' element={<UserSettings langEn={langEn} showModal={showModal} setShowModal={setShowModal} onSignOut={onSignOut}  currentUser={currentUser} setCurrentUser={setCurrentUser}/>}></Route>
        <Route path='/sign-in' element={<SignIn langEn={langEn} signInWithGoogle={signInWithGoogle}/>}></Route>
        <Route path='/password-reset' element={<ResetPassword langEn={langEn}/>}></Route>       
        <Route path='/about' element={<AboutPage langEn={langEn}/>}></Route>
        <Route path='/privacy-policy' element={<Privacy langEn={langEn}/>}></Route>
        <Route path='/pictures' element={<PicturesPage showModal={showModal} setShowModal={setShowModal} langEn={langEn}/>}></Route>
        <Route path='*' element={<NotFound langEn={langEn}/>}></Route>
        <Route path='/add-track' element={<AddMusicForm  pagesMusicNumber={pagesMusicNumber} currentUser={currentUser} trackList={trackList} setTrackList={setTrackList}
        setPageMusicQuery={setPageMusicQuery}setPagesMusicNumber={setPagesMusicNumber} langEn={langEn}/>}></Route>
      </Routes>
    </main>
    <Footer lanEn={langEn}/>
  </>
  );
}

export default App;
