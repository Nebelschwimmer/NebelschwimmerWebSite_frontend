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
const [checked, setChecked] = useState(false);
const [showSecondTextarea, setShowSecondTextarea] = useState(true);

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm()
const user_displayName = currentUser.displayName
const author_id = currentUser.uid
  const SendNewText = async (data) => {
    console.log(data)
    try {
      await  addNewText(data, user_displayName, author_id)
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
  const handleCheckChange = () => {
    setChecked(!checked);
  }

  useEffect(()=>{
    checked ? setShowSecondTextarea(true):
    setShowSecondTextarea(false)
  },[checked, showSecondTextarea])

  const nameEnRegister = register("name_en", {
  
    maxLength: {
      value:50,
      message:
      "Your name is too long, it must not exceed 25 characters",
      }
    }
  );
  const authorEnRegister = register("author_en", {

    maxLength: {
      value:50,
      message:
      "Author\'s name is too long, it must not exceed 50 characters",
      }
    }
  );

  const authorRuRegister = register("author_ru", {
    maxLength: {
      value:50,
      message:
      "Имя слишком длинное, оно не должно быть длиннее 50 символов",
      }
    }
  );

  const nameRuRegister = register("name_ru", {
    maxLength: {
      value:50,
      message:
      "Название слишком длинное, оно должно быть не длиннее 25 символов",
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
        <span onClick={()=>{navigate(-1)}}>
          <Backbutton />
        </span>
        {currentUser!== '' ?
        <form className='add__text__container' onSubmit={handleSubmit(SendNewText)}>
          <h1>{langEn ? 'Add Text' : 'Добавить текст'}</h1>
          <label className='add__text__label'>{langEn ? '2 languages' : '2 языка'}
              <input type='checkbox' checked={checked} onChange={handleCheckChange}></input>
            </label>
          <div className='add__text__inputs'>
            <label className='add__text__label'>
              <div className='add__text__inputs__container'>
                <div>
                  <input
                    className='add__text__input'
                    type="text"
                    {...nameEnRegister}
                    placeholder={langEn ? 'Text Name (English)' : 'Название текста (англ.)'}
                  />
                  { errors?.name_en  &&
                    <small >{errors.name_en?.message}</small>
                    }
                </div>
                
                <div>
                  <input
                    className='add__text__input'
                    type="text"
                    {...authorEnRegister}
                    placeholder={langEn ? 'Author (English)' : 'Автор (англ.)'}
                  />
                    {errors?.author_en  &&
                    <small >{errors.author_en?.message}</small>}
                </div>
              </div>
                
              
            </label>
            
            
          </div>
        
            <div className='add__text__textarea__wrapper'> 
              <TextareaAutosize 
              placeholder={langEn ? 'Place your English text here' : 'Разместите текст на английском здесь'}
              className='add__text__textarea'
              {...register("content_en")}
              >
              </TextareaAutosize>
            </div>
            { showSecondTextarea &&
                  <div className='add__text__textarea__wrapper'>
                    <label className='add__text__label'>
                      <div className='add__text__inputs__container'>
                        <div>
                          <input
                            className='add__text__input'
                            type="text"
                            {...nameRuRegister}
                            placeholder={langEn ? 'Text Name (Russian)' : 'Название текста (русс.)'}
                          />
                            {errors?.name_ru  &&
                              <small >{errors.name_ru?.message}</small>}
                        </div>
                        <div>
                          <input
                            className='add__text__input'
                            type="text"
                            {...authorRuRegister}
                            placeholder={langEn ? 'Author (Russian)' : 'Автор (русс.)'}
                          />
                              {errors?.author_ru  &&
                                <small >{errors.author_ru?.message}</small>}
                        </div>
                      </div>
                        
                          
                    </label>
                  <TextareaAutosize
                  placeholder={langEn ? 'Place your Russian text here' : 'Разместите текст на русском здесь'}
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
          </div>
        </form>
        :
        <span onClick={()=>{navigate('/sign-in')}} className='add__text__not__auth'>{langEn ? 'Please, log in to be able to post texts': 'Пожалуйста, войдите или зарегестрируйтесь, чтобы публиковать тексты'}</span>
            }
    </div>
  )
}