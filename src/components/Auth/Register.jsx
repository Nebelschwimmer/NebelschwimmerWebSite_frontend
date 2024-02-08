import './auth.css'
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate, Link } from 'react-router-dom';
import { Backbutton } from '../BackButton/BackButton';
import { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useForm, } from "react-hook-form";
import './spinner.css'


export const Register = ({currentUser, setCurrentUser, signInWithGoogle}) => {
  const navigate = useNavigate()
// Стейт для надписи об ошибке
  const [emailExists, setEmailExists] = useState('')

    // Стейт для спиннера
    const [showSpinner, setShowSpinner] = useState(false);

  // Таймаут для надписи об ошибке
  useEffect(()=>{
    setTimeout(()=>{
      if (emailExists !=='')
      setEmailExists('')
    }, 5000)
  }, [emailExists])

  // При входе с аккаунта Google
  const onSignInWithGoogle = () => {
    signInWithGoogle();
    navigate('/')
  }


  // Достаем пользователя из Firebase
  const auth = getAuth();
  const user = auth.currentUser


// Объявление полей для формы
  const {register, handleSubmit, getValues, formState: { errors }} = useForm({ mode: "onSubmit" });

  const emailRegister = register("email", {
    required: "Email required",
    pattern: {
      message: "Incrorrect email!",
      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    }
  });

useEffect(()=>{
  if (emailExists)
  setShowSpinner(false)
},
[emailExists])




// Register для пароля
  const passwordRegister = register("password", {
    required: "Password required",
    pattern: {
      message:
      "Your password must be not shorter than 6 characters and have at least one upper case English letter.",
      value: /(?=.*?[A-Z])/g
    },
    minLength: {
      value:6,
      message:
      "Your password must be not shorter than 6 characters",
      }
  });
// Для подтверждения
  const passwordConfirm = register('passwordConfirm', {
    required: true,
      validate: (value) => {
        const {password} = getValues();
        return password === value || 'Passwords do not match'
        },
      }
  ) 

// Функция для создания пользователя
async function RegisterWithEmailPassword(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      setCurrentUser(user);
      navigate('/user-settings')
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use' ) 
      setEmailExists('This email already exists') 
    });
  
}


// Отправляем данные формы
const sendSignUpData = async (data) => {
  setShowSpinner(true)
  await RegisterWithEmailPassword(data.email, data.password)   
}


  return (
    <div>
      <div className='auth_main'>
        {/* Шапка */}
        <div className="auth_container">
          <div onClick={()=>navigate(-1)} className="auth_backbtn"><Backbutton/></div>
          <div className='auth_top'>
          <h1 style={{fontSize:'36px', color:'darkorange'}}>SIGN UP</h1>
          <span >Existing user? <Link style={{color: 'violet'}} to='/sign-in'>SIGN IN!</Link></span>
          </div>
          {/* Форма */}
          <form onSubmit={handleSubmit(sendSignUpData)}>
            <div className='auth_form'>
              {/* Инпут для email */}
              <div className='auth_label_input'>
                <label className='auth_label'>Email:<span className='auth_req'>*</span></label> 
                  <input 
                  className='auth_input' 
                  type='email'
                  {...emailRegister}
                  >
                  </input>
              </div>
              {/* Текст при ошибках email*/}
              { errors?.email  &&
                <small className='auth_small'>{errors.email?.message}</small>
              }

              {/* Показываем надпись, что email существует, если приходит ошибка */}
              { emailExists !== '' && <small className='auth_small'>{emailExists}</small>
              }
              
              {/* Инпут для пароля */}
              <div className='auth_label_input'>
                <label className='auth_label'>Password: <span className='auth_req'>*</span></label> 
                  <input 
                  className='auth_input' 
                  type='password'
                  {...passwordRegister}
                  minLength={6}
                  >
                  </input>
              </div>
                {/* Текст при ошибках пароля*/}
                {errors?.password && (
                  <small className='auth_small'>{errors.password?.message}</small>)
                }
                 {/* Подтверждение пароля */}
                <div className='auth_label_input'> 
                  <label className='auth_label'>Confirm Password: <span className='auth_req'>*</span></label>
                    <input className='auth_input' type='password'
                    {...passwordConfirm}
                    ></input>
                </div>
                {/* Текст при несовпадения пароля*/}
                {errors?.passwordConfirm && (
                  <small className='auth_small'>{errors.passwordConfirm?.message}</small>)}
              </div>
              <div className='auth_sign_btn_wrapper'>
                {/* Кнопка для отправки данных */}
                
                  <button type="submit" className='auth_sign_btn'>Create My Account</button>
                  {showSpinner &&
                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                  }
              </div>
          </form> 
        
          {/* Кнопка для входа по аккаунту Гугл */}
          <button className='auth_sign_btn' onClick={()=>{onSignInWithGoogle()}}>Sign in with Google Account <GoogleIcon fontSize='large'/></button>
          
        </div>
      </div>
    </div>
  )
}