import './auth.scss'
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate, Link } from 'react-router-dom';
import { Backbutton } from '../BackButton/BackButton';
import { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useForm, } from "react-hook-form";
import { Spinner } from '../Spinner/Spinner';


export const Register = ({currentUser, langEn, setCurrentUser, signInWithGoogle}) => {
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




useEffect(()=>{
  if (emailExists)
  setShowSpinner(false)
},
[emailExists])




// Register для пароля
  const passwordRegisterEn = register("password", {
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

  const passwordRegisterRu = register("password", {
    required: "Пароль обязателен",
    pattern: {
      message:
      "Ваш пароль должен быть не короче 6 знаков и должен иметь хотя бы одну заглавную латинскую букву",
      value: /(?=.*?[A-Z])/g
    },
    minLength: {
      value:6,
      message:
      "Ваш пароль должен быть не короче 6 знаков",
      }
  });
// Для подтверждения
  const passwordConfirmEn = register('passwordConfirm', {
    required: true,
      validate: (value) => {
        const {password} = getValues();
        return password === value || 'Passwords do not match'
        },
      }
  )
  const passwordConfirmRu = register('passwordConfirm', {
    required: true,
      validate: (value) => {
        const {password} = getValues();
        return password === value || 'Пароли не совпадают'
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
      if (errorCode === 'auth/email-already-in-use' && langEn) 
      setEmailExists('This email already exists');
      if (errorCode === 'auth/email-already-in-use' && !langEn) 
      setEmailExists('Данный email уже существует');
      
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
          <h1 style={{fontSize:'36px', color:'darkorange'}}>{langEn ? 'SIGN UP' : 'РЕГИСТРАЦИЯ'}</h1>
          <span >{langEn ? 'Existing user?' : 'Уже зарегистировались?'} <Link style={{color: 'violet'}} to='/sign-in'>{langEn ? 'SIGN IN' : 'ВОЙДИТЕ В АККАУНТ'}</Link></span>
          </div>
          {/* Форма */}
          <form onSubmit={handleSubmit(sendSignUpData)}>
            <div className='auth_form'>
              {/* Инпут для email */}
              <div className='inputs__container'>
                        {langEn ?
                        <div className='single__input__wrapper'>
                          <label >Email</label>
                            <input
                              className='input'
                              type='text'
                              {...emailRegisterEn}
                            >
                            </input>
                        </div>
                        :
                        <div className='single__input__wrapper'>
                        <label >Email</label>
                          <input
                            className='input'
                            type='text'
                            {...emailRegisterRu}
                          >
                          </input>
                      </div>
                      }
                        {langEn ?
                        <div className='single__input__wrapper'>
                          <label>{langEn ? 'Password' : 'Пароль'}</label>
                            <input
                              className='input'
                              type='password'
                              {...passwordRegisterEn}
                              minLength={6}
                            >
                            </input>
                        </div>
                        :
                        <div className='single__input__wrapper'>
                        <label>{langEn ? 'Password' : 'Пароль'}</label>
                          <input
                            className='input'
                            type='password'
                            {...passwordRegisterRu}
                            minLength={6}
                          >
                          </input>
                      </div>
                      }
                      {langEn ?
                        <div className='single__input__wrapper'>
                          <label>{langEn ? 'Confirm Password' : 'Подтвердите пароль'}</label>
                            <input
                              className='input'
                              type='password'
                              {...passwordConfirmEn}
                            >
                            </input>
                        </div>
                        :
                        <div className='single__input__wrapper'>
                        <label>{langEn ? 'Confirm Password' : 'Подтвердите пароль'}</label>
                          <input
                            className='input'
                            type='password'
                            {...passwordConfirmRu}
                          >
                          </input>
                      </div>
                      }
                    
                    
                    
                    
                    
                    </div>
              <div className='errors__container'>
                { errors?.email  &&
                  <small className='auth_small'>{errors.email?.message}</small>}
                { emailExists !== '' && <small className='auth_small'>{emailExists}</small>}
                  {errors?.password && (
                    <small className='auth_small'>{errors.password?.message}</small>)}
                  {errors?.passwordConfirm && (
                    <small className='auth_small'>{errors.passwordConfirm?.message}</small>)}
              </div>
              </div>
              
              <div className='auth_sign_btn_wrapper'>
                {/* Кнопка для отправки данных */}
                
                  <button type="submit" className='auth_sign_btn'>{langEn ? 'Create Account' : 'Создать аккаунт'}</button>
                  {showSpinner &&
                    <span className='spinner_container'><Spinner/></span>
                  }
              </div>
          </form> 
        
          {/* Кнопка для входа по аккаунту Гугл */}
          <button className='auth_sign_btn' onClick={()=>{onSignInWithGoogle()}}>{langEn ? 'Sign in with Google' : 'Войти с Google'}<GoogleIcon fontSize='medium'/></button>
          
        </div>
      </div>
    </div>
  )
}