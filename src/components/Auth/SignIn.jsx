import './auth.scss'
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate, Link } from 'react-router-dom';
import { Backbutton } from '../BackButton/BackButton';
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { useForm } from "react-hook-form";
import {signInWithEmailAndPassword } from 'firebase/auth'
import { Spinner } from '../Spinner/Spinner';




export const SignIn = ({signInWithGoogle}) => {

  // Для навигации
  const navigate = useNavigate()
  // Для формы
  const {register, handleSubmit, formState: { errors }} = useForm({ mode: "onSubmit" });

  // Для отображении ошибки при входе
  const [loginErr, setLoginErr] = useState(false)

  // Стейт для спиннера
  const [showSpinner, setShowSpinner] = useState(false);

  // Если ошибка при входе, не показывать спиннер
  useEffect(()=>{
    if (loginErr)
    setShowSpinner(false)
  },[loginErr])
  
  // Достаем данные пользователя
  const auth = getAuth();


  // При входе через аккаунт гугл
  const onSignInWithGoogle = () => {
    signInWithGoogle();
    navigate('/')
  }
  // Функция для вход по почте и паролю
  const SingInWithEmailAndPassword = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    }).then(()=>{navigate('/')})
    .catch((error) => {
      
      const errorCode = error.code;
      console.log(error.code)
      if (errorCode === 'auth/invalid-login-credentials' || 'auth/invalid-credential' ) setLoginErr(true) 
    });
  }

// Таймаут для отображения ошибки
  useEffect(()=>{
    setTimeout(()=>{
      if (loginErr )
      setLoginErr(false)
    }, 5000)
  }, [loginErr])


// Поле формы для почты
const emailRegister = register("email", {
  required: "Email required",
  pattern: {
    message: "Incrorrect email!",
    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  }
});
// Поле формы для пароля
const passwordRegister = register("password", {
  required: "Password required"
  })


// Фунция для отправки данных
const sendSignInData = async (data) => {
  try {
    setShowSpinner(true);
    await SingInWithEmailAndPassword(data.email, data.password)
  }
  catch(errors) {
  console.log(errors)
  } 
}


  return (
    <div>
      <div className='auth_main'>
        {/* Шапка  */}
        <div className="auth_container">
          <div onClick={()=>navigate(-1)} className="auth_backbtn"><Backbutton/></div>
            <div className='auth_top'>
              <h1 style={{color:'darkorange'}}>SIGN IN</h1>
              <span >New user? <Link style={{color: 'violet'}} to='/register'>SIGN UP!</Link></span>
            </div>
          {/* Форма */}
            <form onSubmit={handleSubmit(sendSignInData)}>
              <div className='auth_form'>
                    <div className='inputs__container'>
                        <div className='single__input__wrapper'>
                          <label >Email :</label>
                            <input
                              className='input'
                              type='text'
                              {...emailRegister}
                            >
                            </input>
                        </div>
                      
                        <div className='single__input__wrapper'>
                          <label>Password :</label>
                            <input
                              className='input'
                              type='password'
                              {...passwordRegister}
                            >
                            </input>
                        </div>
                    </div>

                <div className='errors__container'> 
                { errors?.email  &&
                  <small className='auth_small'>{errors.email?.message}</small>
                  }
                  { errors?.password  &&
                  <small className='auth_small'>{errors.password?.message}</small>
                  }
                  {loginErr && <small style={{color: 'darkorange'}}>Login error! Check if your email address and your password are correct.</small>}
                  </div>
                </div>


              {/* Кнопка отправки */}
              <div className='auth_sign_btn_wrapper'>
                <button type="submit" className='auth_sign_btn'>Sign In</button>
                {showSpinner &&
                  <span className='spinner_container'><Spinner/></span>
                  }
              </div>
            </form> 
          {/* Кнопки "Войти с гугл" и "Сброс пароля" */}
          <button className='auth_sign_btn' onClick={()=>{onSignInWithGoogle()}}>Sign in with Google Account <GoogleIcon fontSize='large'/></button>
          <button onClick={()=>{navigate('/password-reset')}} className='auth_sign_btn'>Forgot My Password</button>
        </div>
    
      </div>
    </div>
  )
}