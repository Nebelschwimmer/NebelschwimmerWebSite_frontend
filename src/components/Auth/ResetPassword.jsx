import './auth.scss'
import { useNavigate, Link } from 'react-router-dom';
import { Backbutton } from '../BackButton/BackButton';
import { getAuth} from 'firebase/auth';
import { useForm, } from "react-hook-form";
import {sendPasswordResetEmail } from 'firebase/auth'



export const ResetPassword = () => {
  const navigate = useNavigate()

  const {register, handleSubmit, formState: { errors }} = useForm({ mode: "onSubmit" });

  const auth = getAuth()
  auth.languageCode = 'en';


  const sendResetPasswordData = async (data) => {
    try {
      await sendPasswordResetEmail(auth, data.email)
      .then(data =>{alert('Reminder sent!');})
      .then(()=>{navigate('/sign-in')});
    }
    catch(errors) {
  console.log(errors)
    } 
  }

  const emailRegister = register("email", {
    required: "Email required",
    pattern: {
      message: "Incrorrect email!",
      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    }
  });


  return (
    <div className='auth_layout'>
      <div className='auth_main'>
        
        <div className="auth_container">
          <div onClick={()=>navigate(-1)} className="auth_backbtn"><Backbutton/></div>
            <div className='auth_top'>
              <h1 style={{color:'darkorange'}}>Password Reset</h1>
            </div>

            <form onSubmit={handleSubmit(sendResetPasswordData)}>
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
                    {/* Текст при ошибках email*/}
                    { errors?.email  &&
                      <small className='auth_small'>{errors.email?.message}</small>
                    }
                <div style={{textAlign: 'center'}}>
                  <span>A reset link will be sent to your e-mail box. </span>
                  <span>Check it, then sign in with the new password</span>
                </div>
                
                </div>
              
              <div className='auth_sign_btn_wrapper'>
                <button type="submit" className='auth_sign_btn'>Send</button>
              </div>
            </form> 
        </div>
      </div>
    </div>
  )
}