import './auth.scss'
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate, Link } from 'react-router-dom';
import { Backbutton } from '../BackButton/BackButton';
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { useForm } from "react-hook-form";
import {signInWithEmailAndPassword } from 'firebase/auth'
import { Spinner } from '../Spinner/Spinner';




export const SignIn = ({signInWithGoogle, langEn}) => {

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
const emailRegisterEn = register("email", {
  required: "Email required",
  pattern: {
    message: "Incrorrect email!",
    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  }
});

const emailRegisterRu = register("email", {
  required: "Email обязателен",
  pattern: {
    message: "Некорректный email!",
    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  }
});
// Поле формы для пароля
const passwordRegisterEn = register("password", {
  required: "Password required"
  })

  const passwordRegisterRu = register("password", {
    required: "Пароль обязателен"
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
              <h1>{langEn ? 'SIGN IN' : "ВОЙТИ"}</h1>
              <span >{langEn ? 'New user?' : 'Новый пользователь?'} <Link style={{color: 'violet'}} to='/register'>{langEn ? 'SIGN UP!' : "ЗАРЕГИСТРИРУЙТЕСЬ!"}</Link></span>
            </div>
          {/* Форма */}
            <form onSubmit={handleSubmit(sendSignInData)}>
              <div className='auth_form'>
                    <div className='inputs__container'>
                        <div className='single__input__wrapper'>
                          <label >Email :</label>
                            {langEn ?
                            <input
                              className='input'
                              type='text'
                              {...emailRegisterEn}
                            >
                            </input>
                            :
                            <input
                            className='input'
                            type='text'
                            {...emailRegisterRu}
                          >
                          </input>
                          }
                        </div>
                      
                        <div className='single__input__wrapper'>
                          <label>{langEn ? 'Password' : 'Пароль'}</label>
                           {langEn ?
                            <input
                              className='input'
                              type='password'
                              {...passwordRegisterEn}
                            >
                            </input>
                            :
                            <input
                            className='input'
                            type='password'
                            {...passwordRegisterRu}
                          >
                          </input>
                          }
                        </div>
                    </div>

                <div className='errors__container'> 
                { errors?.email  &&
                  <small className='auth_small'>{errors.email?.message}</small>
                  }
                  { errors?.password  &&
                  <small className='auth_small'>{errors.password?.message}</small>
                  }
                  {loginErr && <small style={{color: 'darkorange'}}>{langEn ? 'Login error. Check if your email address and your password are correct.' : 
                  'Ошибка входа. Проверьте правильность введнных почты и пароля'}</small>}
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
          <button className='auth_sign_btn' onClick={()=>{onSignInWithGoogle()}}>Sign in with Google Account <GoogleIcon fontSize='medium'/></button>
          <button onClick={()=>{navigate('/password-reset')}} className='auth_sign_btn'>Forgot My Password</button>
        </div>
    
      </div>
    </div>
  )
}