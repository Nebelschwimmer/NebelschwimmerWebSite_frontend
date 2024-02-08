import { useForm } from "react-hook-form";
import '../musicPage.css'
import { addNewTrack } from "../../../utils/api_music";
import { useState, useEffect } from "react";
import { useId } from 'react';
import cn from "classnames";



export const AddMusicForm = ({langEn, setShowModal, trackList, setTrackList}) => {


// Стейты для показа информации о файле
const [showFileName, setShowFileName] = useState('')
const [showFileSize, setShowFileSize] = useState('')
const [fileSizeError, setFileSizeError] = useState('')
const [disableBtn, setDisableButton] = useState(false)
// Стейт для активной кнопки для 2-й формы


// Для формы

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm()


// Для отображения инфо о файле 

const onFileAdding = (e) => {
  const findFile = e.target.files[0]
  
  if (findFile.name.length > 50) {
    setShowFileName(findFile.name.substring(0, 43) + '...' + ',') 
  }
  else setShowFileName(findFile.name + ',');

  setShowFileSize((findFile.size / 1048576 ).toFixed(2) +' MB')
  if (findFile.size > 1e+7 ) setFileSizeError('This file is too big! It must not exceed 20 MB!')
  else (setFileSizeError(''))
};

useEffect(()=>{
  if (fileSizeError) setDisableButton(true)
  else setDisableButton(false)
})

// Для отправки данных
const onSubmitData = async (data) => {
  // Объявляем экземпляр FormData
  const formData = new FormData();
// Цикл для объекта formData, чтобы добавить к нему файл 1-й файл из массива файлов и другие
// поля формы
for (const key in data) {
    if (key === "file") {
      formData.append(key, data[key][0]);
    } else {
      formData.append(key, data[key]);
    }
  }
  try {
    await addNewTrack(formData).then((newTrack)=> {
      setTrackList([...trackList, newTrack]);
      setShowModal(false)
    })
  }
  catch (err) {console.log(err)}
}

  return (
    <div>
      <h2 className="add_music_title">{langEn ? 'Add New Track' : 'Добавить музыку'}</h2>
      <div className="add_music_form_container">
        
          {/*Cекция для добавления музыки из файла  */}
        <form onSubmit={handleSubmit(onSubmitData)}>
          <section className="add_music_add_track_container">
              <div className="add_music_choose_image_wrapper">
                <span style={{fontWeight:'600'}}>Сhoose audio file <span className='auth_req'> *</span></span>
                <small style={{color:'darkorange'}}>Your file must be in .mp3 extension and not exceed 20 MB</small>
                <div className="add_music_choose_image_btn_wrapper">
                  <label className="add_music_add_track_btn">
                    Add file
                    <input
                    type="file" 
                    {...register("file")}
                    className="add_music_add_track_input"
                    onInput={onFileAdding}
                    accept="audio/mpeg"
                    >
                    </input>
                  </label>
                  <small>{showFileName} {showFileSize}</small>
                  <span style={{color:'darkorange', fontWeight: 600}}>{fileSizeError}</span>
                  </div>
              </div>
          </section>
        
        {/* Для добавления имени, описания и пр. */}

          <section className="add_music_form_bottom">
                {/* Инпут для имени */}
          <div>
            <div className="add_music_inputs">
              <div className='auth_label_input'>
                <label className='add_music_input_label'>{langEn ? 'Name :' : 'Название :'}<span className='auth_req'> *</span></label> 
                  <input 
                  className='add_music_input' 
                  {...register("track_name", { required: true })}
                  type='text'
                  maxLength={23}
                  >
                  </input>
              </div>
              {/* Textarea для описания на англ. */}
                <div className='auth_label_input'>
                  <label className='add_music_input_label'>Description (En) :</label> 
                    <textarea 
                    className='add_music_textarea' 
                    {...register("track_description_en", { required: false })}
                    maxLength={100}
                    >
                    </textarea>
                </div>
              
                {/* Textarea для описания на русс.  */}
                <div className='auth_label_input'>
                  <label className='add_music_input_label'>Description (Ru) : </label> 
                    <textarea 
                    className='add_music_textarea' 
                    type='text'
                    {...register("track_description_ru", { required: false })}
                    >
                    </textarea>
                </div>
          
                {/* Инпут для картинки */}
                <div className='auth_label_input'>
                    <label className='add_music_input_label'>Image URL :</label> 
                      <input 
                      className='add_music_input' 
                      type='url'
                      {...register("track_image", { required: false })}
                      >
                      </input>
                </div>
            </div>
              <div className="add_music_create_btn_wrapper">
                <button disabled={disableBtn} type="submit" 
                className={cn("add_music_create_btn", { ["add_music_create_btn_Disabled"]: disableBtn })}
                >Create New Track</button>
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}