import { useForm } from "react-hook-form";
import './music_edit.scss'
import { updateTrack} from "../../../utils/api_music";
import { useState, useEffect } from "react";
import { useId } from 'react';
import cn from "classnames";
import { Spinner } from "../../Spinner/Spinner";


export const MusicEditForm = ({langEn, track, track_id, setTrackList, setShowModalEdit, trackList}) => {

  const [showSpinner, setShowSpinner] = useState(false)
  const [preview, setPreview] = useState('')
  const [nameValue, setNameValue] = useState(track.track_name)
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm()




// Для отправки данных
const onSubmitData = async (data) => {
  const formData = new FormData();
  
  for (const key in data) {
    if (key === 'file__image')  
    formData.append(key, data[key][0])
  }
  formData.append('track_name', data.track_name);
  formData.append('track_id', track_id);
  formData.append('track_image', track.track_image);

  console.log(formData)
try {
    await updateTrack(track_id, formData)
    .then((newTrackList)=> {
      setTrackList(newTrackList);
      setShowModalEdit(false)
    })
  }
  catch (err) {console.log(err)}
  
}

const onImgFileAdding = (e) => {
  const findImgFile = e.target.files[0]
  if (findImgFile) {
  const findImgFile = e.target.files[0]
  const imageSrc = URL.createObjectURL(findImgFile)
  setPreview(imageSrc)
  }
}




  return (
  
    <div className="edit__music__container">
      <h2>{langEn ? 'Edit Track' : 'Изменить данные'}</h2>

        
          {/*Cекция для добавления музыки из файла  */}
        <form className="edit__music__form" onSubmit={handleSubmit(onSubmitData)}>
            <label>{langEn ? 'Change Name' : 'Изменить название'}</label>
            <input
              type="text"
              className="edit__music__text__input"
              value={nameValue}
              onInput={e=>setNameValue(e.target.value)}
              {...register("track_name")}
              placeholder={langEn ? 'Change Track Name' : 'Изменить название трека'}
            />  
            <div className="edit__music__image__input">
                <label className="edit__music__image__input__label">
                  {langEn ? 'Change image file' : 'Изменить картинку' }
                  <input
                    type="file"
                    className="add__music__file__input__hidden"
                    {...register("file__image")}
                    onInput={onImgFileAdding}
                    accept="image/*"/>
                </label>
                <img className="add__music__file__input__preview__image" src={preview || track.track_image }/>
            </div>

            <div className="edit__music__submit__btn__wrapper">
            {!showSpinner ?
              <button  type="submit"
                className="add__text__sumbit_btn"
                >{langEn ? 'Send' : "Отправить"}
              </button>
              :
                <span><Spinner/></span>
              }
            </div>
          </form> 
    </div>
  
  )
}