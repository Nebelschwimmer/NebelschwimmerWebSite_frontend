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
import SockJS from 'sockjs-client';
import { UserPage } from '../../pages/UserPage/UserPage.jsx';

function App() {


const [currentUser, setCurrentUser] = useState('')

const [showModal, setShowModal] = useState(false);

const [pagesNumber, setPagesNumber] = useState();
  
const [pageQuery, setPageQuery] = useState(1)

const [pageMusicQuery, setPageMusicQuery] = useState(1);

const [pagesMusicNumber, setPagesMusicNumber] = useState();


const [wsData, setWsData] = useState({checkOnlineStatus: "offline"});

  const navigate = useNavigate()
  const [user] = useAuthState(auth);
  
  const onSignOut = async () => {
    await signOut(auth).then(() => {
      navigate('/');
      setCurrentUser('');
      const socket = new SockJS('http://localhost:4050/echo');
      socket.close();
      setWsData({checkOnlineStatus: 'offline'})
    }).catch((error) => {
      console.log(error)
    });
    }
  const signInWithGoogle = async () => {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider)
        .then((res) => {
          const credential = GoogleAuthProvider.credentialFromResult(res);
        }).catch((error) => {
          alert(error)
        });
      }
  // Если пользователь аутентифицирован в Firebase, сетим его извене в стейт фронтенда, иначе возвращаем undefined 
  useEffect(()=>{
    if (user !== null) {setCurrentUser(user)}
    else return

  }, [user])
  
  

  
  useEffect(() => {
    const sendUserData = async () => {
    
      if (user) {
        const userUID = user.uid;
        const socket = new SockJS('https://surland.ru:4050/echo');
        socket.onopen = () => {
          socket.send(JSON.stringify({ uid: userUID }));
          console.log('Connected to SockJS server', JSON.stringify({ uid: userUID }));
        };
        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          setWsData(data.isOnline);
          console.log('Received message:', {...wsData});
          
        };
        socket.onclose = () => {
          setWsData({checkOnlineStatus: "offline"})
        };
        return () => {
          socket.close();
        };
      }
    };
  
    sendUserData();
  }, [currentUser]);




return (
  <>
    <Header showModal={showModal} setShowModal={setShowModal}  currentUser={currentUser} user={user} onSignOut={onSignOut} />
      <main className='main_content_container'>

      <Routes>
        <Route path='/' element={<HomePage  currentUser={currentUser} />}></Route> 
        {/* <Route path='/user/:userID' element={<UserPage wsData={wsData}/>}></Route>  */}
        <Route path='/texts/:textID' element={<SingleTextPage pageQuery={pageQuery} setPageQuery={setPageQuery} pagesNumber={pagesNumber}  currentUser={currentUser} 
        showModal={showModal} setShowModal={setShowModal}  />}> </Route> 
        <Route path='/music' element={<MusicPage  setPagesMusicNumber={setPagesMusicNumber} pagesMusicNumber={pagesMusicNumber} pageMusicQuery={pageMusicQuery} setPageMusicQuery={setPageMusicQuery} 
        showModal={showModal} setShowModal={setShowModal}   currentUser={currentUser}/>}>
        </Route>
        <Route path='/texts' element={<TextsPage wsData={wsData} pagesNumber={pagesNumber} setPagesNumber={setPagesNumber} currentUser={currentUser} pageQuery={pageQuery} setPageQuery={setPageQuery} showModal={showModal} 
        setShowModal={setShowModal} />}></Route>
        <Route path='/texts/add-text' element={<AddTextPage pageQuery={pageQuery} pagesNumber={pagesNumber} currentUser={currentUser} setPageQuery={setPageQuery} showModal={showModal} setShowModal={setShowModal}/>}></Route> 
        <Route path='/register' element={<Register currentUser={currentUser} setCurrentUser={setCurrentUser} signInWithGoogle={signInWithGoogle}/>}></Route>
        <Route path='/user-settings' element={<UserSettings wsData={wsData} showModal={showModal} setShowModal={setShowModal} onSignOut={onSignOut}  currentUser={currentUser} setCurrentUser={setCurrentUser}/>}></Route>
        <Route path='/sign-in' element={<SignIn signInWithGoogle={signInWithGoogle}/>}></Route>
        <Route path='/password-reset' element={<ResetPassword/>}></Route>       
        <Route path='/about' element={<AboutPage/>}></Route>
        <Route path='/privacy-policy' element={<Privacy />}></Route>
        <Route path='/pictures' element={<PicturesPage showModal={showModal} setShowModal={setShowModal}/>}></Route>
        <Route path='*' element={<NotFound />}></Route>
        <Route path='/add-track' element={<AddMusicForm  pagesMusicNumber={pagesMusicNumber} currentUser={currentUser} 
        setPageMusicQuery={setPageMusicQuery}setPagesMusicNumber={setPagesMusicNumber}/>}></Route>
      </Routes>
    </main>
    <Footer/>
  </>
  );
}

export default App;
