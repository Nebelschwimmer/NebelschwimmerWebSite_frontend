import './singleText.scss'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import { deleteTextFromItsPage, updateRuTextById } from '../../utils/api_texts';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { updateEnTextById } from '../../utils/api_texts';
import { useForm } from "react-hook-form";
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { Backbutton } from '../BackButton/BackButton';
import { CommentsForm } from './CommentsForm/CommentsForm';
import cn from 'classnames'
import { Comments } from './Comments/Comments';
import { Link } from 'react-router-dom';
import { updateTextNameEn } from '../../utils/api_texts';
import { updateTextNameRu } from '../../utils/api_texts';
import { getPublisherInfoByID } from '../../utils/api_texts';

export const SingleText = ({singleText, langEn, setTexts, texts, pagesNumber, pageQuery, setSingleText, showModal, setLangEn, setShowModal, setPageQuery, currentUser, handleTextLike}) => {

const navigate = useNavigate(); 

const [noContent, setNoContent] = useState(false);
const [contentEn, setContentEn] = useState('');
const [contentRu, setContentRu] = useState('');
const [editMode, setEditMode] = useState(false);
const [updateSuccess, setUpdateSuccess] = useState(false);
const [favText, setFavText] = useState(false);
const [showComments, setShowComments] = useState(false);
const [showDeleteIcon, setShowDeleteIcon] = useState(false);
const [showNotAuth, setShowNotAuth] = useState(false);
const [editName, setEditName] = useState(false);
const [ruName, setRuName] = useState(singleText.name_ru);
const [enName, setEnName] = useState(singleText.name_en);
const [showMore, setShowMore] = useState(true);
const [checkTextLength, setCheckTextLength] = useState(false);
const [truncated, setTruncated] = useState(true);
const [publisheInfo, setPublisherInfo] = useState({})





const scrollRef = useRef(null)
const user_id = currentUser.uid;
const publisher_id = singleText.publisher_id
const textID = singleText._id;
const options = { 
  day: "numeric",
  month: "numeric",
  year: "numeric",
  timeZone: "Europe/Moscow",
  hour: "2-digit", 
  minute: "2-digit"
  }
const createdAtDate = new Date (singleText.createdAt).toLocaleString("ru-RU", options);


const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();

useEffect(()=>{
  getPublisherInfoByID(publisher_id).then(
  res => setPublisherInfo({publisher_name: res.publisher_name, publisher_avatar: res.publisher_avatar}))
  
}, [])



useEffect(()=>{
if (currentUser !== '' && currentUser.uid === singleText.publisher_id)
setShowDeleteIcon(true)
}, [currentUser])

useEffect(()=>{
  if (currentUser === '')
  setShowNotAuth(true)
  else setShowNotAuth(false)
}, [currentUser])


useEffect(()=>{
  if (singleText.likes?.includes(user_id))
  setFavText(true)
  else setFavText(false)
  }, [singleText, favText]);

  



  const onTextDelete = async (textID) => {
    try {
      await deleteTextFromItsPage(textID).then((newTexts)=>{
        
        const newTextslength = newTexts.length - 1;
        setTexts(()=>([...newTexts]));
        setShowModal(false);
        
        if (newTextslength === 4 * (pagesNumber - 1)) {
        
          setPageQuery(st => st - 1);
          navigate(`/texts?page=${pageQuery}`)
        }
        else navigate(`/texts?page=${pageQuery}`)
        
  });
  }
  catch(err) {
    console.log(err)
  }
}




useEffect(()=>{
  if (!langEn && contentRu === '')
  setNoContent(true);
  else setNoContent(false);
  if (langEn && contentRu !== '')
  setNoContent(true);
  if (contentEn !== '' && contentRu !== '')
  setNoContent(false);
  if (updateSuccess)
  setNoContent(false)
}, [langEn, contentRu, noContent, updateSuccess])

const enContentSplited = singleText.content_en.split('\n');
const ruContentSplited = singleText.content_ru.split('\n');



useEffect (()=>{
  if (singleText.content_en !== '') {
    const truncatedText = enContentSplited.slice(0,5);
      if (showMore) {
    const newEnContent = truncatedText.map((p, i)=> {
      return (
        <div  className={cn("single__text__read__mode", { ["single__text__read__mode__Truncated"]: truncated })} >
            <p className='text__readonly__p'key={i}>{p.trim()}</p>
          </div>
      )
    })
    setContentEn(newEnContent);
    setTruncated(true);
    setCheckTextLength(true)
    }
    else {
    const newEnContent = enContentSplited.map((p, i)=> {
      return (
        <p className='text__readonly__p' key={i}>{p}</p>
      )
    })
    setContentEn(newEnContent);
    setTruncated(false);
      if (enContentSplited.length < 5) 
        setCheckTextLength(false)
      else setCheckTextLength(true)

    } 
  }
    else {
      setContentEn(''); setCheckTextLength(false)
    }
  }, 
[singleText, showMore, truncated, checkTextLength])





useEffect(()=>{
  if (editName)
  document.getElementById('name_input').focus()
}, [editName])


useEffect (()=>{
  if (singleText.content_ru !== '') {
  
  const truncatedText = ruContentSplited.slice(0,5);
    if (showMore ) {
      const newRuContent = truncatedText.map((p, i) => {
        return (
          <div  className={cn("single__text__read__mode", { ["single__text__read__mode__Truncated"]: truncated })} >
            <p className='text__readonly__p'key={i}>{p.trim()}</p>
          </div>
        )
      })
      setContentRu(newRuContent);
      setTruncated(true)
      
      if (ruContentSplited.length < 5) 
        setCheckTextLength(false)
      else setCheckTextLength(true)
      
    }
    else {
      const newRuContent = ruContentSplited.map((p, i) => {
      return (
        <p className='text__readonly__p' key={i}>{p}</p>
      )
    })
    setContentRu(newRuContent);
    setTruncated(false)
    setCheckTextLength(true)
  } 
}
  else { setContentRu(''); setCheckTextLength(false)
}
}, 
[singleText, showMore, truncated, checkTextLength])







const sendUpdatedEnText = async (data) => {
    try {
        await updateEnTextById(textID, data)
        .then(res => setSingleText(()=>({...res})));
        setUpdateSuccess(true);
        setEditMode(false);
      }
      catch(err) {
      console.log(err)
      }
}

const sendUpdatedRuText = async (data) => {
  try {
      await updateRuTextById(textID, data)
      .then(res => setSingleText(res));
      setUpdateSuccess(true);
      setEditMode(false);
    }
    catch(err) {
    console.log(err)
    }
}
const sendUpdatedNameEn = async (data) => {
  
  try {
      await updateTextNameEn(textID, data)
      .then(res => setSingleText(()=>({...res})));
      setUpdateSuccess(true);
      setEditName(false); 
    }
    catch(err) {
    console.log(err)
    }
}

const sendUpdatedNameRu = async (data) => {
  try {
    await updateTextNameRu(textID, data)
    .then(res => setSingleText(()=>({...res})));
    setUpdateSuccess(true);
    setEditName(false); 
  }
  catch(err) {
  console.log(err)
  }
}

useEffect(()=>{
if (updateSuccess)
  setTimeout(()=>{
  setUpdateSuccess(false)
}, 5000)
}, [updateSuccess])

const onTextLike = () => {
  handleTextLike(textID, user_id);
}

const handleNameEditClick = () => {
  setEditName(true);
  if (editName)
  setEditName(false)
}

document.addEventListener("keydown", function(event) {
  if (event.key === 'Escape') {
    setEditName(false);
    setEditMode(false)
  }
})

const handleChangeEn = (event) => {
  setEnName(event.target.value)
}

const handleChangeRu = (event) => {
  setRuName(event.target.value)
}

const nameEnRegister = register("name_en", {  
  maxLength: {
    value:50,
    message:
    "Your name is too long, it must not exceed 25 characters",
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
  if (noContent)
  setCheckTextLength(false)
}, [noContent, checkTextLength])



  return (
    <div className='single__text__main__container'>
    <div className='single__text__top'>
        <div className='single__text__top__upper'>
          <span onClick={()=>{navigate(`/texts?page=${pageQuery}`)}}><Backbutton/></span>
          <button onClick={()=>{navigate('/texts/add-text')}} 
          className={cn("add__text__sumbit_btn", { ["add__text__sumbit_btn__Disabled"]: showNotAuth })}
          type='submit'>{langEn? "Publish new Text" : "Опубликовать новый текст"}
          </button>
        </div>
      <div className='single__text__top__wrapper'>
        <div className='single__text__top__titile__container'>
            <div className='single__text__top__name'>
            
              {!!langEn ?
              <div>
                {!editName ? <h1>{singleText.name_en}</h1> :
                <form className='single__text__top__name__form' onSubmit={handleSubmit(sendUpdatedNameEn)}>
                  <input
                    type='text'
                    value={enName}
                    onInput={handleChangeEn}
                    id='name_input'
                    {...nameEnRegister}
                    className={cn('single__text__top__name__input', { ['single__text__top__name__input__Active']: editName })}
                  >
                  </input>
                </form>
                }
              </div>
              :
              <div>
                  {!editName ? <h1>{singleText.name_ru}</h1> :
                <form className='single__text__top__name__form' onSubmit={handleSubmit(sendUpdatedNameRu)}>
                  <input
                    id='name_input'
                    type='text'
                    value={ruName}
                    {...nameRuRegister}
                    readOnly={!editName}
                    className={cn('single__text__top__name__input', { ['single__text__top__name__input__Active']: editName })}
                    onInput={handleChangeRu}
                  >
                  </input>
                </form>
                }
              </div>
              }
              
              
              {showDeleteIcon && 
              <div className='single__text__top__icons__wrapper'> {editName && <span onClick={()=>{setEditName(false)}}><CloseIcon/></span>}
                {!editName &&
                <span title={langEn ? "Edit Name" : "Редактировать название"}
                  onClick={()=>{handleNameEditClick()}}><EditIcon fontSize='' />
                </span>
                }
              </div>
              }
            </div>
        
        
        </div>
      </div>
            <em >{langEn ? singleText.author_en : singleText.author_ru }</em>
      
      <div className='single__text__top__lower' >
        <div className='single__text__top__lower__timestamps'>
          <span>{langEn ? "Published" : "Опубликовал"} </span>
          <div>
            <span>{ publisheInfo.publisher_name} </span>
            <img src={publisheInfo.publisher_avatar} width='20px' height='20px'/>
          </div>
          <span>{createdAtDate}</span>
        
        </div>
        <div className='single__text__top__lower__middle__container'> 
          <div className='single__text__top__lower__middle__wrapper'>
            {showNotAuth && 
            <Link to='/sign-in' style={{color: 'darkorange'}}>{langEn ? 
              <span >Sign in to add text to favorites and comment it</span> : 
              <span>Войдите, чтобы ставить лайки и комментировать</span>}
            </Link>}
            <button title={langEn ? 'Add to favorites' : 'Мне нравится'} className={cn("single__text__top__lower__like__btn", { ["single__text__top__lower__like__btn__Active"]: favText })} onClick={()=> onTextLike()}>
              <FavoriteIcon fontSize='small'/>
            </button>
            <span title={langEn ? 'Like it' : 'Нравится'}>{singleText.likes.length}</span>
          </div>
          <div className='single__text__top__lower__middle__wrapper'>
            <span title={langEn ? 'See comments' : 'Посмотреть комментарии'}  onClick={() => scrollRef.current.scrollIntoView() }>
              <CommentIcon className='single__text__top__lower__like__btn' fontSize='small'/>
            </span>
            <span title={langEn ? 'Comments' : 'Комментарии'}>{singleText.comments.length}</span>
          </div>
        </div>
        
        {showDeleteIcon &&
          <div className='single__text__top__lower__ctrl__btn__container'>
            <button className='single__text__top__lower__ctrl__btn' title={langEn ? "Delete" : "Удалить"}  
            onClick={()=>{setShowModal(true)}}> <DeleteForeverIcon fontSize='' /> </button>
            <button className='single__text__top__lower__ctrl__btn' title={langEn ? "Edit" : "Редактировать"}  
            onClick={()=>{setEditMode(true)}}><EditIcon fontSize='' /> </button>
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
      {updateSuccess && <small>{langEn ? 'Text successfully updated!' : 'Текст успешно обновлен!'}</small>}
      {!editMode ?
        <div className='single__text__textarea__containter'
        >
          <div >{langEn ? contentEn : contentRu}</div>
          
          {!!noContent && <div>
            {langEn ? 
            <div className='single__text__notAvailable__container'>
              <span>Unfortunately, there is no Enlgish version of this text</span>
              <span id='change_lang' onClick={()=>{setLangEn(false)}}> See Russian version</span>
            </div> 
            : 
            <div>
              <span className='single__text__notAvailable__container'>К сожалению, версии на русском языке этого текста нет</span>
              <span id='change_lang' onClick={()=>{setLangEn(true)}}>Посмотреть английскую версию</span>
            </div>}
          </div>}
        </div>

        :

        <div className='single__text__textarea__editMode__containter'>
          <div>
            <span>{langEn ? "Edit Mode" : "Режим редактирования"}</span>
            <span onClick={()=>{setEditMode(false)}} className='close__span' title={langEn ? "Quit Edit Mode" : "Выйти из режима редактирования"}>
              <CloseIcon/>
            </span>
          </div>
          {langEn ?
            <form onSubmit={handleSubmit(sendUpdatedEnText)}>
              <textarea className='textarea_auto' defaultValue={singleText.content_en} {...register("content_en")}></textarea>
              <div style={{width:'30%'}}><button className='add__text__sumbit_btn' type='submit'>{langEn? "Send" : "Отправить"}</button></div>
            </form>
            :
            <form onSubmit={handleSubmit(sendUpdatedRuText)}>
              <textarea className='textarea_auto' defaultValue={singleText.content_ru} {...register("content_ru")}></textarea>
              <div style={{width:'30%'}}>
                <button
                  className='add__text__sumbit_btn'
                  type='submit'>{langEn? "Send" : "Отправить"}
                </button>
              </div>
            </form>
          }    
        </div>
      }
    {/* ------- КНОПКА ДЛЯ РАЗВЕРТЫВАНИЯ ТЕКСТА--------- */}
    {checkTextLength &&
    <div className='single__text__show__more__wrapper'>
      {showMore ?
      <button onClick={()=>{setShowMore(false)}}  className='add__text__sumbit_btn'>{langEn ? 'Expand' : "Развернуть"}</button>
      : 
      <button onClick={()=>{setShowMore(true)}}  className='add__text__sumbit_btn'>{langEn ? 'Collapse' : "Свернуть"}</button>
    }
    </div>
  }
   
    
    {/* ------- КОММЕНТАРИИ--------- */}
    <section ref={scrollRef} className='single__text__comments__section'>
      {!showComments && 
      <div >
        <button
        onClick={()=>{setShowComments(true)}}
        disabled={showNotAuth}
        className={cn("add__text__sumbit_btn", { ["add__text__sumbit_btn__Disabled"]: showNotAuth })}
        >
          {langEn ? 'Comment' : 'Комментировать'}
          </button> 
      </div>
      }
      {showComments &&
        <div className='single__text__comments__section__upper'>
          <small onClick={()=>{setShowComments(false)}}><CloseIcon/></small>
          <CommentsForm setShowComments={setShowComments} setSingleText={setSingleText} 
          textID={textID} user_id={user_id} currentUser={currentUser} langEn={langEn}/>
        </div>
      }
      {
        singleText.comments.length !== 0  ? 
        <Comments user_id={user_id} currentUser={currentUser}  options={options} textID={textID} singleText={singleText} setSingleText={setSingleText}/>
            :  
            <span>{langEn ? 'No comments yet' : 'Комментариев пока нет'}</span>
        }
    </section>
    </div>
  )
}