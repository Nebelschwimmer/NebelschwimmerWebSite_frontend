import './auth.scss'
import { useNavigate, Link } from 'react-router-dom';
import { Backbutton } from '../BackButton/BackButton';
import { getAuth} from 'firebase/auth';
import { useForm, } from "react-hook-form";
import {sendPasswordResetEmail } from 'firebase/auth'
import { useSelector } from 'react-redux';


export const ResetPassword = () => {
  const navigate = useNavigate()
  const langEn = useSelector((state) => state.langEn);
  const {register, handleSubmit, formState: { errors }} = useForm({ mode: "onSubmit" });
  const auth = getAuth()
  auth.languageCode = 'en';


  const sendResetPasswordData = async (data) => {
    try {
      await sendPasswordResetEmail(auth, data.email)
      .then(() =>{alert('A reset email sent! / Письмо со ссылкой для сброса пароля отправлено');})
      .then(()=>{navigate('/sign-in')});
    }
    catch(errors) {
  console.log(errors)
    } 
  }

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
      message: "Некоректный email!",
      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    }
  });


  return (
    <div className='auth_layout'>
      <div className='auth_main'>
        
        <div className="auth_container">
          <div onClick={()=>navigate(-1)} className="auth_backbtn"><Backbutton/></div>
            <div className='auth_top'>
              <h1 style={{color:'darkorange'}}>{langEn ? 'Password Reset' : "Сброс пароля"}</h1>
            </div>

            <form onSubmit={handleSubmit(sendResetPasswordData)}>
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
                    {/* Текст при ошибках email*/}
                    { errors?.email  &&
                      <small className='auth_small'>{errors.email?.message}</small>
                    }
                <div style={{width: '100%', textAlign: 'center'}}>
                  <p style={{fontSize:'12px'}}>{langEn ? 'A reset link will be sent to your e-mail box.' : 'Письмо для сброса пароля будет отправлено на указанный электронный ящик. ' }</p>
                  <p style={{fontSize:'12px'}}>{langEn ? 'Check it, then sign in with the new password.' : 'Проверьте его, затем войдите с новым паролем' }</p>
                  
                </div>
                
                </div>
              
              <div className='auth_sign_btn_wrapper'>
                <button type="submit" className='auth_sign_btn'>{langEn ? 'Send' : 'Отправить'}</button>
              </div>
            </form> 
        </div>
      </div>
    </div>
  )
}