import { useForm } from "react-hook-form";
import './addMusic.scss'
import { addNewTrack } from "../../../utils/api_music";
import { useState, useEffect } from "react";
import { useId } from 'react';
import cn from "classnames";
import { Spinner } from "../../../components/Spinner/Spinner";



export const AddMusicForm = ({langEn, setShowModal, currentUser, trackList, setTrackList}) => {


// Стейты для показа информации о файле
const [showFileName, setShowFileName] = useState('')
const [showFileSize, setShowFileSize] = useState('')
const [fileSizeError, setFileSizeError] = useState('')
const [disableBtn, setDisableButton] = useState(false)
const [trackName, setTrackname] = useState('')
const [checkedPic, setCheckedPic] = useState(false)
const [preview, setPreview] = useState(undefined)
const [showSpinner, setShowSpinner] = useState(false)
// Для формы

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm()


// Для отображения инфо о файле 

const onAudioFileAdding = (e) => {
  const findAudFile = e.target.files[0]
  
  if (findAudFile.name.length > 50) {
    setShowFileName(findAudFile.name.substring(0, 43) + '...') 
  }
  else setShowFileName(findAudFile.name);
  setShowFileSize((findAudFile.size / 1048576 ).toFixed(2) +' MB')
  if (findAudFile.size > 1e+7 ) setFileSizeError('This file is too big! It must not exceed 20 MB!')
  else (setFileSizeError(''))
};

const onImgFileAdding = (e) => {
  if (checkedPic) {
  const findImgFile = e.target.files[0]
  const imageSrc = URL.createObjectURL(findImgFile)
  setPreview(imageSrc)
  }

};




useEffect(()=>{
  if (fileSizeError) setDisableButton(true)
  else setDisableButton(false)
})

// Для отправки данных
const onSubmitData = async (data) => {
  // Объявляем экземпляр FormData
  const formData = new FormData();

console.log(data)
    formData.append("files", data.file__audio[0]);
    formData.append("track_author", currentUser.displayName);
    formData.append("track_name",  data.track_name);
    if(data.file__image !== undefined) {
    formData.append("files", data.file__image[0])
    };

  try {
    await addNewTrack(formData).then((newTrackList)=> {
      setTrackList(newTrackList);
      setShowSpinner(true)
    })
  }
  catch (err) {console.log(err)}
}

useEffect(()=>{
  if (showFileName !== '') setTrackname(showFileName.replace('.mp3', ''))
}, [showFileName])

useEffect(()=>{
  if (showSpinner)
  setTimeout(()=>{
    setShowModal(false);
    setShowSpinner(false)
  }, 2000)
}, [showSpinner])


  return (
    <div className="add__music__container">
      <h1>{langEn ? 'Add New Track' : 'Добавить музыку'}</h1>
      <div>
        
          {/*Cекция для добавления музыки из файла  */}
        <form onSubmit={handleSubmit(onSubmitData)}>
          <section className="add__music__file__input__container">
                <div className="add__music__file__input__top">
                  <span>{langEn ? 'Choose audio file ' : 'Выберите аудио файл'}<span className='auth_req'> *</span></span>
                  <span>{langEn ? 'Your file must be in .mp3 extension and not exceed 20 MB' 
                  : 'Ваш файл должен быть в формате mp3 и не превышать размером 20 Мб'}</span>
                </div>
                <div className="add__music__file__input__bottom">
                  <label className="add__music__file__input__label">
                    {langEn ? 'Add audio file' : 'Добавить аудио файл'}
                      <input
                      type="file"   
                      {...register("file__audio")}
                      onInput={onAudioFileAdding}
                      accept="audio/mpeg"/>
                  </label>
                <small>{showFileName}</small>
                {showFileSize !== '' &&  <small>{showFileSize}</small> }
                  <span>{fileSizeError}</span>
                </div>
                {trackName !== '' &&
                <div>
                  <div className="add__music__inputs__container">
                  <label className="add__music__inputs__label"> {langEn ? 'Edit Name' : "Редактировать название"}
                      <input
                      type="text"
                      className="add__music__input"
                      value={trackName}
                      onInput={ev => setTrackname(ev.target.value)}
                      {...register("track_name")}
                      />
                    </label>
                  
                  <label className="add__music__inputs__label">{langEn ? 'Сustom picture' : 'Своя картинка'}
                    <input checked={checkedPic} onChange={()=>{setCheckedPic(!checkedPic)}} type="checkbox"/>
                  </label>
                  {checkedPic &&
                    <div className="add__music__file__input__add__image__container">
                      <label className="add__music__file__input__label">
                        {langEn ? 'Add image file' : 'Добавить картинку' }
                        <input
                          type="file"
                          className="add__music__file__input__hidden"
                          {...register("file__image")}
                          onInput={onImgFileAdding}
                          accept="image/*"/>
                      </label>
                      {preview !== undefined && <img className="add__music__file__input__preview__image" src={preview}/>}
                    </div>
                  }
                  </div>
                  <div className="add__music__submit__btn__wrapper">
                  {!showSpinner ?
                    <button disabled={disableBtn} type="submit"
                      className={cn("add__music__submit__btn", { ["add__music__submit__btn__Disabled"]: disableBtn })}
                      >{langEn ? 'Send' : "Отправить"}
                    </button>
                    :
                      <span><Spinner/></span>
                    }
                  </div>
                
                </div>
              }
            
            </section>
          </form>
        {/* Для добавления имени, описания и пр. */}

          {/* <section className="add__music__inputs__container">
              
            <div className="add__music__inputs__top">
              <div className='add__music__input__wrapper'>
                <label className=''>{langEn ? 'Name :' : 'Название :'}<span className='auth_req'> *</span></label> 
                  <input 
                    {...register("track_name")}
                    type='text'
                    maxLength={23}
                    className="add__music__input"
                  />
              </div> */}
              {/* Textarea для описания на англ. */}
                {/* <div className='add__music__input__wrapper'>
                  <label className='l'>{langEn ? 'En. description' : 'Описание на англ.'}:</label> 
                    <textarea 
                      {...register("track_description_en", { required: false })}
                      maxLength={100}
                      >
                    </textarea>
                </div> */}
              
                {/* Textarea для описания на русс.  */}
                {/* <div className='add__music__input__wrapper'>
                  <label className=''>{langEn ? 'Ru. description' : 'Описание на русс.'}</label> 
                    <textarea 
                      type='text'
                      {...register("track_description_ru", { required: false })}
                      maxLength={100}
                      >
                    </textarea>
                </div> */}
          
                {/* Инпут для картинки */}
                {/* <div className='add__music__input__wrapper'>
                  <label className='l'>Image URL : </label> 
                      <input 
                        className="add__music__input"
                        type='url'
                        {...register("track_image", { required: false })}
                      />
                </div> */}
            {/* </div> */}
              

        
       
      </div>
    </div>
  )
}