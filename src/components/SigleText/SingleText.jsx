import './singleText.scss'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import { deleteTextFromItsPage } from '../../utils/api_texts';
import { useNavigate } from 'react-router-dom';
import { BaseButton } from '../BaseButton/BaseButton';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from 'react';
import { useState } from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { updateTextById } from '../../utils/api_texts';
import { useForm } from "react-hook-form";
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { Backbutton } from '../BackButton/BackButton';
import { CommentsForm } from './CommentsForm/CommentsForm';

export const SingleText = ({singleText, _id, langEn, setSingleText, showModal, setLangEn, setShowModal, currentUser}) => {

const navigate = useNavigate() 

const [noContent, setNoContent] = useState(false);
const [contentEn, setContentEn] = useState('');
const [contentRu, setContentRu] = useState('');
const [editMode, setEditMode] = useState(false)
const [updateSuccess, setUpdateSuccess] = useState(false)
const [showUpdDate, setShowUpdDate] = useState(false)

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm()


const options = { 
  day: "numeric",
  month: "numeric",
  year: "numeric",
  timeZone: "Europe/Moscow",
  hour: "2-digit", 
  minute: "2-digit"
  }

const createdAtDate = new Date (singleText.createdAt).toLocaleString("ru-RU", options)

const updatedAtDate = new Date (singleText.updatedAt).toLocaleString("ru-RU", options)

useEffect(()=>{
if (singleText.createdAt === singleText.updatedAt)
setShowUpdDate(false)
else setShowUpdDate(true)
}, [showUpdDate])



const textID = singleText._id

const onTextDelete = async (textID) => {
  try {
  await deleteTextFromItsPage(textID);
  navigate('/texts');
  setShowModal(false)
  }
  catch(err) {
    console.log(err)
  }
}

useEffect(()=>{
  if (!langEn && contentRu === '')
  setNoContent(true)
  else setNoContent(false)
  
}, [langEn])


const enContentSplited = singleText.content_en.split('\n');
const newEnContent = enContentSplited.map((e)=> {
  return(
    <p className='text__readonly__p'>{e}</p>
  )
})



useEffect (()=>{
  if (singleText.content_en !== '') {
  const enContentSplited = singleText.content_en.split('\n');
  const newEnContent = enContentSplited.map((e, i)=> {  
    return (
        <p className='text__readonly__p' key={i}>
        {e}
        </p>
    )
  })
  setContentEn(newEnContent)
  }
  else setContentEn('')
}, 
[])



useEffect (()=>{
  if (singleText.content_ru !== '') {
  const ruContendSplited = singleText.content_ru.split('\n');
  const newRuContent = ruContendSplited.map((e, i)=> {
    return (
      <p className='text__readonly__p' key={i}>{e}</p>
    )
  })
  setContentRu(newRuContent)
  }
  else setContentRu('')
}, 
[])




const sendUpdatedText = async (data) => {
    try {
        await updateTextById(textID, data)
        .then(res => setSingleText(()=>({...res})));
        setUpdateSuccess(true);
      }
      catch(err) {
      console.log(err)
      }
}

useEffect(()=>{
if (updateSuccess)
setTimeout(()=>{
  setEditMode(false);
  setUpdateSuccess(false)
}, 2000)
}, [updateSuccess])


  return (
    <>
    <div className='single__text__top'>
      <div className='single__text__top__wrapper'>
        <div onClick={()=>{navigate(-1)}}>
          <Backbutton/>
        </div>
        <h1 className='single__text__top__name'>{singleText.name}</h1>
      </div>
      <div className='single__text__top__lower' >
        <div className='single__text__top__lower__timestamps'>
          <span><em>{langEn ? "Published" : "Опубликовано"} : {createdAtDate}</em></span>
          { showUpdDate && <span><em>{langEn ? "Updated" : "Изменено"} : {updatedAtDate}</em></span> }
        </div>
        <div> 
          <div>
            <FavoriteIcon fontSize='small'/>
            <span>Likes: {singleText.likes.length}</span>
          </div>
          <div>
            <CommentIcon fontSize='small'/>
            <span>Comments: {singleText.comments.length}</span>
          </div>
        </div>
        {currentUser !== '' &&
          <div>
            <button title={langEn ? "Delete" : "Удалить"}  onClick={()=>{setShowModal(true)}}> <DeleteForeverIcon fontSize='small' /> </button>
            <button title={langEn ? "Edit" : "Редактировать"}  onClick={()=>{setEditMode(true)}}><EditIcon fontSize='small' /> </button>
          </div>
          
        }
      </div>
    </div>
    {!!showModal && 
      <ModalWindow showModal={showModal} setShowModal={setShowModal}> 
      <div className='modal_top'>
        <h3 style={{color:'darkorange'}}>{langEn ? "Are you sure?" : "Вы уверены?"}</h3>
      </div>
        <div className='modal_btns_wrapper'>
          <button onClick={()=>{onTextDelete(textID)}} className='modal_btn_warn'>{langEn ? "Delete Text" : "Удалить текст"}</button>
          <button onClick={()=>{setShowModal(false)}} className='modal_btn'>{langEn ? "Cancel" : "Отмена"}</button>
        </div>
      </ModalWindow>
    }
    
      {!editMode ?
        <div className='single__text__textarea__containter'>
          <div>{langEn ? newEnContent : contentRu}</div>
          
          {noContent && <div>
            {langEn ? 
            <div className='single__text__notAvailable__container'>
              <span>Unfortunately, there is no Enlgish version of this text</span>
              <span id='change_lang' onClick={()=>{setLangEn(false)}}>See Russian version</span>
            </div> 
            : 
            <div>
              <span className='single__text__notAvailable__container'>К сожалению, версии на русском языке этого текста нет</span>
              <span id='change_lang' onClick={()=>{setLangEn(true)}}>Посмотреть английскую версию</span>
            </div>}
          </div>}
        </div>

        :

        <form onSubmit={handleSubmit(sendUpdatedText)}>
          <div className='single__text__textarea__editMode__containter'>
            <div>
              <span>{langEn ? "Edit Mode" : "Режим редактирования"}</span>
              <span onClick={()=>{setEditMode(false)}} className='close__span' title={langEn ? "Quit Edit Mode" : "Выйти из режима редактирования"}>
                <CloseIcon ></CloseIcon>
              </span>
            </div>
            {langEn ?
            <textarea className='textarea_auto' defaultValue={singleText.content_en}
            {...register("content_en")}
            ></textarea>
            :
            <textarea className='textarea_auto' defaultValue={singleText.content_ru} {...register("content_ru")}>
            </textarea>
            }
            <button className='add__text__sumbit_btn' type='submit'>{langEn? "Send" : "Отправить"}</button>
            {updateSuccess && <small>{langEn ? 'Text successfully updated!' : 'Текст успешно обновлен!'}</small>
            }
          </div>
        </form>
    }
    <section className='single__text__comments__section'>
      <CommentsForm/>
    </section>
    </>
  )
}