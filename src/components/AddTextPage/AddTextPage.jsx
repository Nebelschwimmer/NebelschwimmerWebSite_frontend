import './addTextPage.scss'
import { useForm } from "react-hook-form";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { addNewText } from '../../utils/api_texts';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TextAreaAuto } from '../TextAreaAuto/TextAreaAuto';

export const AddTextPage = ({langEn, texts, setTexts}) => {
const navigate = useNavigate()
const [printAdded, setPrintAdded] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const SendNewText = async (data) => {
    try {
      await  addNewText(data)
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
            <div className='add__text__textarea__wrapper'> Place your text in the area below (EN)
              {/* Сделать обычный текстареа! */}
              <TextareaAutosize 
              
              className='add__text__textarea'
              {...register("content_en")}
              >
              </TextareaAutosize>
            </div>
          :
            <div className='add__text__textarea__wrapper'> Разместите текст в области ниже (Русс.)
              <TextareaAutosize 
              className='add__text__textarea'
              {...register("content_ru")}
              >
              </TextareaAutosize>
            </div>
          }
          
          <div className='add__text__sumbit_btn_wrapper'>
            <button type='submit' className='add__text__sumbit_btn'>{langEn ? 'Publish' : 'Опубликовать'}</button>
          </div>
        {printAdded && 
          <div className='print__added__wrapper'>
            <span>{langEn ? 'Your text was successfully published' : "Текст успешно добавлен"}</span>
          </div>
        }
        </form>
    </div>
  )
}