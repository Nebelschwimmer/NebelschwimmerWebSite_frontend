import { useForm } from "react-hook-form";

import { updateTrack} from "../../../utils/api_music";
import { useState, useEffect } from "react";
import { useId } from 'react';
import cn from "classnames";



export const MusicEditForm = ({langEn, track, track_id, setTrackList, setShowModalEdit, trackList}) => {


// Для формы

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm()




// Для отправки данных
const onSubmitData = async (data) => {

console.log(data)
const json = JSON.stringify(data.track_description_en)
console.log(json)
try {
    await updateTrack(track_id, data)
    .then((newTrackList)=> {
      setTrackList(newTrackList);
      setShowModalEdit(false)
    })
  }
  catch (err) {console.log(err)}
  
}



  return (
    <div>
      <h2 className="add_music_title">{langEn ? 'Update Track Info' : 'Изменить информацию о треке'}</h2>
      <div className="add_music_form_container">
        
        <form onSubmit={handleSubmit(onSubmitData)}> 
        {/* Для добавления имени, описания и пр. */}

          <section className="add_music_form_bottom">
          {/* Инпут для имени */}
          <div>
            <div className="add_music_inputs">
              <div className='auth_label_input'>
                <label className='add_music_input_label'>{langEn ? 'Name :' : 'Название :'}<span className='auth_req'> *</span></label> 
                  <input 
                  className='add_music_input' 
                  defaultValue={track.track_name}
                  {...register("track_name", { required: true })}
                  type='text'
                  maxLength={23}
                  >
                  </input>
              </div>
                {/* Инпут для картинки */}
                <div className='auth_label_input'>
                    <label className='add_music_input_label'>Image URL :</label> 
                      <input 
                      className='add_music_input' 
                      defaultValue={track.track_image}
                      type='url'
                      {...register("track_image", { required: false })}
                      >
                      </input>
                </div>
              {/* Textarea для описания на англ. */}
                <div className='auth_label_input'>
                  <label className='add_music_input_label'>Description (En) :</label> 
                    <textarea 
                    className='add_music_textarea' 
                    defaultValue={track.track_description_en}
                    {...register("track_description_en", { required: false })}
                    maxLength={100}
                    >
                    </textarea>
                </div>
              
                {/* Textarea для описания на русс.  */}
                <div className='auth_label_input'>
                  <label className='add_music_input_label'>Description (Ru) : </label> 
                    <textarea 
                    defaultValue={track.track_description_ru}
                    className='add_music_textarea' 
                    type='text'
                    {...register("track_description_ru", { required: false })}
                    >
                    </textarea>
                </div>
            </div>
              <div className="add_music_create_btn_wrapper">
                <button type="submit" 
                className="add_music_create_btn"
                >Update Track Info</button>
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}