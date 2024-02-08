import './auth.css'
import { useNavigate, Link } from 'react-router-dom';
import { Backbutton } from '../BackButton/BackButton';
import { useEffect, useState} from 'react';
import { useForm, } from "react-hook-form";
import {getAuth, signOut, deleteUser, updateProfile} from 'firebase/auth'
import './spinner.css'
import { ModalWindow } from '../ModalWindow/ModalWindow';
import CloseIcon from '@mui/icons-material/Close';
import cn from "classnames";

export const UserSettings = ({currentUser, setCurrentUser, showModal, onSignOut, setShowModal}) => {
  
  // Стейт для спиннера
  const [showSpinner, setShowSpinner] = useState(false);
  // Стейт для автара
  const [avatar, setAvatar] = useState('')
 // Стейт для отображения инфо пользователя
  const [showProfileInfo, setShowProfileInfo] = useState(false)
  // Cтейт для кнопки очистки 1
  const [showClearBtn1, setShowClearBtn1] = useState(false)
  // Cтейт для кнопки очистки 2
  const [showClearBtn2, setShowClearBtn2] = useState(false)
  // Cтейт для отображения ошибки
  const [showError, setShowError] = useState(false)
  // Стейт для надписи об измнениях данных
  const [printChanged, setPrintChanged] = useState(false)
  // Cтейт для модального окна с подтверждением выхода из аккаунта
  const [showModalSignout, setShowModalSignout] = useState(false)

  // Служебные переменные
  const navigate = useNavigate()
  const auth = getAuth();
  const user = auth.currentUser;
  
  
  // Таймаут для спиннера
    useEffect(()=>{
      setTimeout(()=>{
      if (showSpinner) setShowSpinner(false)
      },700)
    }, 
    [currentUser])

  

    // Таймаут для надписи с ошибкой
    useEffect(()=>{
      setTimeout(()=>{
      if (showError) setShowError(false)
      },5000)
    }, 
    [showError])

    // Таймаут для надписи об измнениях данных
    useEffect(()=>{
      setTimeout(()=>{
      if (printChanged) setPrintChanged(false)
      },5000)
    }, 
    [printChanged])
  
  // Отображаем инфо о пользователе только если у него есть имя
  useEffect(()=>{
  if (currentUser.displayName !== null) setShowProfileInfo(true)},
  [currentUser])
  // Отображаем аватар по умолчанию, если пользователь не отправил ссылку на свой
  useEffect(()=>{
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
      alert('User deleted.');
      setCurrentUser('')
      navigate('/') 
  })
    .catch((error) => {
      const errorCode = error.code
      if (error.code === 'auth/requires-recent-login') {
        alert ('Login error. Please, sign out and sign in again to be able to delete your account')
      }
      console.log(errorCode)
  });
  }
    

// Логика для формы
  const {register, handleSubmit, reset, formState: { errors }} = useForm({ mode: "onSubmit" });

// Функция для обновления данных пользователя
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

// Для отправки данных
  const sendUpdateData = async (data) => {
    try {
      await UpdateUserData(data.userName, data.avatarURL).then(() => {
        // Ловим отредактированного пользователя
        const newUser = auth.currentUser;
        // Сеттим с колбэком
        setCurrentUser(()=>({...newUser}));
        // Сетим спинер
        
      })
    }
    catch(errors) {
    console.log(errors)
    } 
  }
// Для заполнения инпута с именем
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
          <h1 style={{color:'darkorange'}}>Profile</h1>
          </div>
          
            <div className='auth_top'>
              
              {/* Отображаем блок с инфо о пользователе и кнопками только если введено имя */}
              {showProfileInfo && 
              <div className='auth_user_info'>
                <div>
                  <img className='auth_user_avatar' src={avatar}/>
                </div>
                <div className='auth_user_info_name_wrapper'>
                  <div className='auth_user_info_name_top'>
                    <span className='auth_user_info_name'>{currentUser.displayName}</span>
                    <span>{currentUser.email}</span>
                  </div>
                  <div className='auth_user_info_edt_btns_wrapper'>
                    <button onClick={()=>{setShowModalSignout(true)}} className='auth_user_info_edt_btn'>Sign Out</button>
                    {/* Модальное окно с подтверднением выхода из аккаунта */}
                      {!!showModalSignout &&
                    
                        <div className={cn("modal", { ["active"]: showModalSignout })} onClick={()=>{setShowModalSignout(false)}}>
                          <div className={cn("modal_content", { ["active"]: showModalSignout })}  onClick={(e) => e.stopPropagation()}>
                              <div className='modal_top'>
                                <h3 style={{color:'darkorange'}}>Are you sure?</h3>
                              </div>
                              <div className='modal_btns_wrapper'>
                                <button onClick={()=>{onSignOut()}} className='modal_btn_warn'>Sign out</button>
                                <button onClick={()=>{setShowModalSignout(false)}} className='modal_btn'>Cancel</button>
                            </div>
                          </div>
                      </div>
                    
                    }
                    <button onClick={()=>{setShowModal(true)}}  className='auth_user_info_edt_btn'>Delete Accout</button>
                  </div>
                  {/* Модальное окно с подтверждением удаления */}
                  {!!showModal &&
                  <ModalWindow setShowModal={setShowModal} showModal={showModal}>
                    <div className='modal_top'>
                      <h3 style={{color:'darkorange'}}>Are you sure you want to delete your account?</h3>
                      <span>This action cannot be undone</span>
                    </div>
                    <div className='modal_btns_wrapper'>
                      <button onClick={()=>{deleteUserAccount()}} className='modal_btn_warn'>Delete</button>
                      <button onClick={()=>{setShowModal(false)}} className='modal_btn'>Cancel</button>
                    </div>
                  </ModalWindow>
                }
                
                </div>
              </div>
                }     
            </div>
            <div className='auth_edit_top_wrapper'>
              <h2 >Edit Profile</h2>
              <small className={cn("auth_updated", { ["auth_updated_Active"]: printChanged })}>Profile Updated!</small>
            </div>  
             {/* Форма */}
            <form onSubmit={handleSubmit(sendUpdateData)}>
              <div className='auth_form_user'>
              {/* Инпут длля имени */}
                <div className='auth_form_labels'>
                <label >Display Name  :</label>
                <label>Avatar URL :</label>   
                </div>
                {/* Блок с инпутами. При фокусировке отображаются кнопки очистки ввода. При расфокусировке они исчезают */}
                <div className='auth_form_inputs'>
                  <div className='auth_label_input'
                  onFocus={()=>{setShowClearBtn1(true)}}
                  onBlur={()=>{setShowClearBtn1(false)}}
                  >
                        <input
                          className='auth_input' 
                          defaultValue={currentUser.displayName}
                          type='text'
                          {...userNameRegister}  
                        >
                        </input>
                      {/* Кнопка очистики инпута 1 */}
                        <button type='button' className={cn("auth_clear_btn", { ["auth_clear_btn_Active"]: showClearBtn1 })} onClick={()=>{reset({userName: ''})}}> <CloseIcon fontSize='small'/> </button>
                    </div>
                  {/* Инпут длля аватара */}
                    <div className='auth_label_input'
                    onFocus={()=>{setShowClearBtn2(true)}}
                    onBlur={()=>{setShowClearBtn2(false)}}
                    >
                        <input
                          style={{fontSize:'12px'}}
                          className='auth_input' 
                          defaultValue={currentUser.photoURL}
                          type='url'
                          {...register("avatarURL", { required: false })}  
                        >
                        </input>
                      {/* Кнопка очистики инпута 2 */}
                        <button type='button' onClick={()=>{reset({avatarURL: ''})}} className={cn("auth_clear_btn", { ["auth_clear_btn_Active"]: showClearBtn2 })}><CloseIcon fontSize='small'/></button>
                    </div>
                  </div>
                </div>
                {/* Надпись об ошибке при вводе слишком длинного URL + Ошибка при вводе имени */}
                <div>
                  {showError && <small style={{color: 'darkorange'}}>This URL is too long, try another picture  </small>}
                  { errors?.userName  &&
                  <small className='auth_small'>{errors.userName?.message}</small>}
                </div>
                
                
                {/* Кнопка "Отправить" + спиннер */}
                <div className='auth_sign_btn_wrapper'>
                  <button type="submit" className='auth_sign_btn'>Send</button>
                  {/* Спиннер */}
                  {showSpinner &&
                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                  }
                </div> 
            </form> 
          </div>
      </div>
    </div>
  )
}