import './auth.scss'
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate, Link } from 'react-router-dom';
import { Backbutton } from '../BackButton/BackButton';
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { useForm } from "react-hook-form";
import {signInWithEmailAndPassword } from 'firebase/auth'
import { Spinner } from '../Spinner/Spinner';
import { useSelector } from 'react-redux';



export const SignIn = ({signInWithGoogle}) => {

  const langEn = useSelector((state) => state.langEn);

  const navigate = useNavigate()

  const {register, handleSubmit, formState: { errors }} = useForm({ mode: "onSubmit" });


  const [loginErr, setLoginErr] = useState(false)


  const [showSpinner, setShowSpinner] = useState(false);


  useEffect(()=>{
    if (loginErr)
    setShowSpinner(false)
  },[loginErr])
  

  const auth = getAuth();



  const onSignInWithGoogle = () => {
    signInWithGoogle();
    navigate('/')
  }

  const SingInWithEmailAndPassword = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    }).then(()=>{navigate('/')})
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-login-credentials' || 'auth/invalid-credential' ) setLoginErr(true) 
    });
  }


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

const passwordRegisterEn = register("password", {
  required: "Password required"
  })

  const passwordRegisterRu = register("password", {
    required: "Пароль обязателен"
    })



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
        
        <div className="auth_container">
          <div onClick={()=>navigate(-1)} className="auth_backbtn"><Backbutton/></div>
            <div className='auth_top'>
              <h1>{langEn ? 'SIGN IN' : "ВХОД"}</h1>
              <span className='sign-in-label'>{langEn ? 'New user?' : 'Новый пользователь?'} <Link style={{color: 'violet'}} to='/register'>{langEn ? 'SIGN UP!' : "ЗАРЕГИСТРИРУЙТЕСЬ!"}</Link></span>
            </div>
        
            <form onSubmit={handleSubmit(sendSignInData)}>
              <div className='auth_form'>
                    <div className='inputs__container'>
                        <div className='single__input__wrapper'>
                          <label >Email</label>
                            {langEn ?
                            <input
                              className='input'
                              type='text'
                              {...emailRegisterEn}
                            />
                            :
                            <input
                            className='input'
                            type='text'
                            {...emailRegisterRu}
                            />
                            }
                          </div>
                      
                          <div className='single__input__wrapper'>
                            <label>{langEn ? 'Password' : 'Пароль'}</label>
                            {langEn ?
                              <input
                                className='input'
                                type='password'
                                {...passwordRegisterEn}
                              />
                              :
                              <input
                              className='input'
                              type='password'
                              {...passwordRegisterRu}
                              />
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


            
              <div className='auth_sign_btn_wrapper'>
                <button type="submit" className='auth_sign_btn'>{langEn ? 'Sign In' : "Войти"}</button>
              </div>
            </form> 
              {/* Кнопки "Войти с гугл" и "Сброс пароля" */}
              <button className='auth_sign_btn' onClick={()=>{onSignInWithGoogle()}}>{langEn ? 'Continue with Google ' : "Войти с Google" } <GoogleIcon fontSize='medium'/></button>
              <button onClick={()=>{navigate('/password-reset')}} className='auth_sign_btn'>{langEn ? 'Forgot My Password' : "Забыли пароль?" }</button>
              <div className='spinner_container'>
              {showSpinner &&
                <span><Spinner/></span>
                    }
          </div>
        </div>
      </div>
    </div>
  )
}