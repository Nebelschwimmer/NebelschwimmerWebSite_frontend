import { useForm } from "react-hook-form";
import './addMusic.scss'
import { addNewTrack } from "../../../utils/api_music";
import { useState, useEffect } from "react";
import { useId } from 'react';
import cn from "classnames";
import { Spinner } from "../../../components/Spinner/Spinner";



export const AddMusicForm = ({langEn, setShowModal, currentUser, trackList, setTrackList}) => {


// Стейты для показа информации о файле
const [showFileName, setShowFileName] = useState('');
const [showFileSize, setShowFileSize] = useState('');
const [fileSizeError, setFileSizeError] = useState(false);
const [disableBtn, setDisableButton] = useState(false);
const [checkedPic, setCheckedPic] = useState(false);
const [preview, setPreview] = useState(undefined);
const [showSpinner, setShowSpinner] = useState(false);
// Для формы

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();


// Для отображения инфо о файле 

const onAudioFileAdding = (e) => {
  const findAudFile = e.target.files[0]
  
  if (findAudFile.name.length > 50) {
    setShowFileName(findAudFile.name.substring(0, 43) + '...') 
  }
  else setShowFileName(findAudFile.name);
  setShowFileSize((findAudFile.size / 1048576 ).toFixed(2) +' MB');
  if (findAudFile.size > 2e+7 ) setFileSizeError(true)
  else setFileSizeError(false)
};

const onImgFileAdding = (e) => {
  if (checkedPic) {
  const findImgFile = e.target.files[0]
  const imageSrc = URL.createObjectURL(findImgFile)
  setPreview(imageSrc)
  }

};
const trackNameTrimmed = showFileName.replace('.mp3', '')



useEffect(()=>{
  if (fileSizeError) setDisableButton(true)
  else setDisableButton(false)
})


const onSubmitData = async (data) => {

  const formData = new FormData();

    for (const key in data) {  
      formData.append(key, data[key][0])
    }
    formData.append('track_author', currentUser.displayName);
    formData.append('track_author_id', currentUser.uid);
    formData.append('track_name', trackNameTrimmed);

  try {
    await addNewTrack(formData).then((newTrackList)=> {
      setTrackList(newTrackList);
      setShowSpinner(true)
    })
  }
  catch (err) {
    console.log(err)
  }
}




useEffect(()=>{
  if (showSpinner)
  setTimeout(()=>{
    setShowModal(false);
    setShowSpinner(false)
  }, 2000)
}, [showSpinner])



const audioFileRegister = register("file__audio", {
  required: 'Выберите файл'
})


  return (
    <div className="add__music__container">
      <h1>{langEn ? 'Add New Track' : 'Добавить музыку'}</h1>
          {/*Cекция для добавления музыки из файла  */}
        <form onSubmit={handleSubmit(onSubmitData)}>
          <section className="add__music__file__input__container">
                <div className="add__music__file__input__top">
                  <span>
                    {langEn ? 'Choose audio file ' : 'Выберите аудио файл'}<span className='auth_req'> *</span></span>
                  <span>{langEn ? 'Your file must be in .mp3 extension, must not exceed 20 MB and violate copyright.' 
                  : 'Ваш файл должен быть в формате mp3 и не превышать размером 20 Мб и не нарушать авторские права.'}</span>
                  <span>{langEn ? 'Please, make sure your file contains the author\'s name' : 'Убедитесь, что ваш файл содержит информацию об авторе.'}</span>
                </div>
                <div className="add__music__file__input__bottom">
                  <label className="add__music__file__input__label">
                    {langEn ? 'Add audio file' : 'Добавить аудио файл'}
                      <input
                      type="file"   
                    {...audioFileRegister}
                      onInput={onAudioFileAdding}
                      accept="audio/mpeg"/>
                  </label>
                <div className="add__music__file__input__bottom__file__info__wrapper">
                  <small>{showFileName}</small>
                  {showFileSize !== '' &&  <small>{showFileSize}</small> }
                </div>
                    {fileSizeError &&
                    <span>{langEn ? 'This file is too big! It must not exceed 20 MB.' : "Файл слишком большой! Он не должен превышать 20 Мб."}</span>
                    } 
                </div>
              
                <div>
                  <div className="add__music__inputs__container"> 
                  <label className="add__music__inputs__label">{langEn ? 'Сustom picture' : 'Своя картинка'}
                    <input checked={checkedPic} onChange={()=>{setCheckedPic(!checkedPic)}} type="checkbox"/>
                  </label>
                  {checkedPic &&
                      <div>
                        <span>{langEn ? 'Your file must not violate copyright.' : 'Файл не должен нарушать авторских прав.'}</span>
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
                        {preview && <img className="add__music__file__input__preview__image" src={preview}/>}
                                            </div>
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
     
    </div>
  )
}