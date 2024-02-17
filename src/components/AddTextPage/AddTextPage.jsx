import './addTextPage.scss'
import { useForm } from "react-hook-form";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { addNewText } from '../../utils/api_texts';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Backbutton } from '../BackButton/BackButton';

export const AddTextPage = ({langEn, currentUser, texts, setTexts}) => {
const navigate = useNavigate()
const [printAdded, setPrintAdded] = useState(false)



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
const user_displayName = currentUser.displayName

  const SendNewText = async (data) => {
    try {
      await  addNewText(data, user_displayName)
        .then(res => {
          setTexts([...texts, res]);
          setPrintAdded(true)
          console.log(res)
        }
      )
    }
    catch(err) {
      
      setPrintAdded(true)
    }  
  }

  const nameRegister = register("name", {
    required: 'Name is required',
    maxLength: {
      value:50,
      message:
      "Your name is too long, it must not exceed 25 characters",
      }
    }
  );
  
  useEffect(()=>{
    if (printAdded)
    setTimeout(()=>{
      navigate('/texts')
    }, 2000)
  }, [printAdded])

  return (
    <div className='add__text'>
          <Backbutton/>
        <form className='add__text__container' onSubmit={handleSubmit(SendNewText)}>
          <h2 style={{color:'darkorange'}}>{langEn ? 'Add Text' : 'Добавить текст'}</h2>
          
          <label className='add__text__label'>{langEn ? 'Name' : 'Название'}
            <input 
            className='add__text__input' 
            type="text"
            {...nameRegister}
            ></input>
            { errors?.name  &&
                  <small >{errors.name?.message}</small>
              }
          </label>
          
          { langEn ?
            <div className='add__text__textarea__wrapper'> 
              {/* Сделать обычный текстареа! */}
              <TextareaAutosize 
              placeholder='Place your text here'
              className='add__text__textarea'
              {...register("content_en")}
              >
              </TextareaAutosize>
            </div>
          :
            <div className='add__text__textarea__wrapper'>
              <TextareaAutosize 
              placeholder='Разместите текст здесь'
              className='add__text__textarea'
              {...register("content_ru")}
              >
              </TextareaAutosize>
            </div>
          }
          
          <div className='add__text__sumbit_btn_wrapper'>
            <div>
              <button type='submit' className='add__text__sumbit_btn'>{langEn ? 'Publish' : 'Опубликовать'}</button>
              {printAdded &&
                <div className='print__added__wrapper'>
                  <span>{langEn ? 'Your text was successfully published' : "Текст успешно добавлен"}</span>
                </div>
              }
            </div>
          
            <button onClick={()=>{navigate('/texts')}} className='add__text__sumbit_btn'>{langEn ? 'Go to Texts List' : 'Перейти к списку текстов'}</button>
          </div>
        
        </form>
    </div>
  )
}