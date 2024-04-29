import './auth.scss'
import { useNavigate} from 'react-router-dom';
import { Backbutton } from '../BackButton/BackButton';
import { useEffect, useState} from 'react';
import { useForm, } from "react-hook-form";
import {getAuth, deleteUser, updateProfile} from 'firebase/auth'
import { ModalWindow } from '../ModalWindow/ModalWindow';
import CloseIcon from '@mui/icons-material/Close';
import cn from "classnames";
import { Spinner } from '../Spinner/Spinner';
import { useSelector } from 'react-redux';
import { io } from "socket.io-client";



export const UserSettings = ({currentUser, setCurrentUser, showModal, onSignOut, setShowModal}) => {
  

  const [showSpinner, setShowSpinner] = useState(false);
  const [avatar, setAvatar] = useState('')
  const [showProfileInfo, setShowProfileInfo] = useState(false)
  const [showError, setShowError] = useState(false)
  const [printChanged, setPrintChanged] = useState(false)
  const [showModalSignout, setShowModalSignout] = useState(false)

  
  
  const navigate = useNavigate()
  const auth = getAuth();
  const user = auth.currentUser;
  const langEn = useSelector((state) => state.langEn);
  

    useEffect(()=>{
      setTimeout(()=>{
      if (showSpinner) setShowSpinner(false)
      },700)
    }, 
    [currentUser])

  
    useEffect(()=>{
      setTimeout(()=>{
      if (showError) setShowError(false)
      },5000)
    }, 
    [showError])

    useEffect(()=>{
      setTimeout(()=>{
      if (printChanged) setPrintChanged(false)
      },5000)
    }, 
    [printChanged])
  


  useEffect(()=>{
    if (currentUser.displayName !== null) { setShowProfileInfo(true) };
    if (currentUser.photoURL !== null) setAvatar(currentUser.photoURL)
    else setAvatar('https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg')
  },
  [currentUser])



 // Указываем Реакту, чтобы не показывал модальное окно после регистрации или входа
    useEffect(()=>{
    if (showProfileInfo) setShowModal(false)
  }, [showProfileInfo])  

// Удаление аккаунта
  const deleteUserAccount = async () => {
    await deleteUser(user)
    .then(() => {
      alert('Пользователь удале. User deleted.');
      setCurrentUser('')
      navigate('/') 
  })
    .catch((error) => {
      const errorCode = error.code
      if (error.code === 'auth/requires-recent-login') {
        alert ('Ошибка входа. Пожалуйста, выйдите из аккааунта и зайдите снова, чтобы удалить аккаунт. Login error. Please, sign out and sign in again to be able to delete your account')
      }
      console.log(errorCode)
  });
  }
    


  const {register, handleSubmit, reset, formState: { errors }} = useForm({ mode: "onSubmit" });


  async  function UpdateUserData (userName, avatarURL) {
    await updateProfile(auth.currentUser, {
      displayName: userName, photoURL: avatarURL
    })
    .then(()=>{setPrintChanged(true); setShowSpinner(true)})
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-profile-attribute') setShowError(true)
      }
    )
  }


  const sendUpdateData = async (data) => {
    try {
      await UpdateUserData(data.userName, data.avatarURL).then(() => {
        const newUser = auth.currentUser;
        setCurrentUser(()=>({...newUser}));
      })
    }
    catch(errors) {
    console.log(errors)
    } 
  }

  const userNameRegister = register("userName", {
    required: 'Display name required!',
    maxLength: {
      value:25,
      message:
      "Your name is too long, it must not exceed 25 characters",
      }
    }
  );




  return (
    <div>
      <div className='auth_main'>
        <div className="auth_container">
          <div onClick={()=>navigate(-1)} className="auth_backbtn"><Backbutton/>
          <h1>{ langEn ? "PROFILE" : 'Личный кабинет'}</h1>
          </div>
            <div className='auth_top'>
              
              {showProfileInfo && 
              <div className='auth_user_info'>
                  <img className='auth_user_avatar' src={avatar}/>
                <div className='auth_user_info_name_wrapper'>
                  <div className='auth_user_info_name_top'>
                    <span className='auth_user_info_name'>{currentUser.displayName}</span>
                  </div>
                  <div className='auth_user_info_edt_btns_wrapper'>
                    <button onClick={()=>{setShowModalSignout(true)}} className='auth_user_info_edt_btn'>{ langEn ? "Sign out" : 'Выйти'}</button>
                  
                      {!!showModalSignout &&
                    
                        <div className={cn("modal", { ["active"]: showModalSignout })} onClick={()=>{setShowModalSignout(false)}}>
                          <div className={cn("modal_content", { ["active"]: showModalSignout })}  onClick={(e) => e.stopPropagation()}>
                              <div className='modal_top'>
                                <h3 style={{color:'darkorange'}}>{ langEn ? "Sign out" : 'Выйти из аккаунта?'}</h3>
                              </div>
                              <div className='modal_btns_wrapper'>
                                <button onClick={()=>{onSignOut()}} className='modal_btn_warn'>{ langEn ? "Submit" : 'Подтвердить'}</button>
                                <button onClick={()=>{setShowModalSignout(false)}} className='modal_btn'>{ langEn ? "Cancel" : 'Отмена'}</button>
                            </div>
                          </div>
                      </div>
                    
                    }
                    <button onClick={()=>{setShowModal(true)}}  className='auth_user_info_edt_btn'>{ langEn ? "Delete account" : 'Удалить аккаунт'}</button>
                  </div>
                
                  {!!showModal &&
                  <ModalWindow setShowModal={setShowModal} showModal={showModal}>
                    <div className='modal_top'>
                      <h3 style={{color:'darkorange'}}>{ langEn ? "Are you sure you want to delete your account" : 'Вы уверены, что хотите удалить аккаунт'}</h3>
                      <span>{ langEn ? "This action cannot be undone." : 'Это действие нельзя отменить.'}</span>
                    </div>
                    <div className='modal_btns_wrapper'>
                      <button onClick={()=>{deleteUserAccount()}} className='modal_btn_warn'>{ langEn ? "Delete" : 'Удалить'}</button>
                      <button onClick={()=>{setShowModal(false)}} className='modal_btn'>{ langEn ? "Cancel" : 'Отмена'}</button>
                    </div>
                  </ModalWindow>
                }
                
                </div>
              </div>
                }     
            </div>
            <div className='auth_edit_top_wrapper'>
              <h2 >{langEn ? 'Edit Profile' : 'Редактировать профиль'}</h2>
              <small className={cn("auth_updated", { ["auth_updated_Active"]: printChanged })}>{ langEn ? "Profile updated!" : 'Профиль изменен'}</small>
            </div>  
            
            <form onSubmit={handleSubmit(sendUpdateData)}>
                
                <div className='inputs__container__profile'>
                        <div className='single__input__wrapper'
                        >
                          <label >{ langEn ? "Display Name" : 'Имя / Никнейм'}</label>
                            <input
                              className='input'
                              defaultValue={currentUser.displayName}
                              type='text'
                              {...userNameRegister}
                            />
                            <button type='button' className="auth_clear_btn"
                            onClick={()=>{reset({userName: ''})}}> <CloseIcon fontSize='small'/> </button>
                        </div>

                        <div className='single__input__wrapper'

                        >
                          <label>{ langEn ? "Avatar URL" : 'URL аватара'}</label>
                            <input
                              style={{fontSize:'12px'}}
                              className='input'
                              defaultValue={currentUser.photoURL}
                              type='url'
                              {...register("avatarURL")}
                            />
                          
                          <button type='button' onClick={()=>{reset({avatarURL: ''})}}
                          className="auth_clear_btn"><CloseIcon fontSize='small'/></button>
                        </div>

                  </div>

                {/* Надпись об ошибке при вводе слишком длинного URL + Ошибка при вводе имени */}
                <div className='show__error__container'>
                  {showError && <small style={{color: 'darkorange'}}>{langEn ? 'This URL is too long, try another picture' : "URL слишком длинный - попробуйте другую картинку"}  
                  </small>}
                  { errors?.userName  &&
                  <small className='auth_small'>{errors.userName?.message}</small>}
                </div>
                
                
                {/* Кнопка "Отправить" + спиннер */}
                <div className='auth_sign_btn_wrapper'>
                  <button type="submit" className='auth_sign_btn'>{ langEn ? "Send" : 'Отправить'}</button>
                </div> 
                  <div className='spinner_container'>
                    {showSpinner &&
                      <span><Spinner/></span>
                    }
                  </div>
            </form> 
          </div>
      </div>
    </div>
  )
}