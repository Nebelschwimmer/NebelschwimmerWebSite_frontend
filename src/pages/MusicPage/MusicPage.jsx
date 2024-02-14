import { ModalWindow } from '../../components/ModalWindow/ModalWindow';
import {MusicList} from '../../components/MusicList/MusicList'
import './musicPage.css'
import AddIcon from '@mui/icons-material/Add';
import { AddMusicForm } from './AddMusicForm/AddMusicForm';
import { useState, useEffect } from 'react';
import { addLikeById, deleteMusicLikeById, getMusicList } from '../../utils/api_music';


export const MusicPage = ({langEn, showModal, setShowModal, currentUser}) => {

  //---- Логика для страницы с музыкой------
  // Для музыки
  const [trackList, setTrackList] = useState([]);
  // Получаем карточки с музыкой
  useEffect(()=>{
    getMusicList().then((result)=>{
      setTrackList(result)
    })
  }, [])

  const user_id = currentUser.uid


// Функция для отправки или удаления лайка музыки по клику.
// Если лайк поставлен, происходил удаление лайка



  return (
    <div className='music_page_container'>

      <div  className='music_page_container_title_btn_wrapper'>
        {langEn ? <h1 className='music_page_title'>My Music</h1> : <h1 className='music_page_title'>Моя музыка</h1>}
        <button onClick={()=>{setShowModal(true)}} className='add_music_create_btn'>{langEn ? 'Add New Track ' : "Добавить музыку "}<AddIcon/> </button>
      {/* <button className='music_page_add_btn' onClick={()=>{play()}}>Развел гоев на доллары!</button> */}
      </div>
      < MusicList user_id={user_id}  showModal={showModal} setShowModal={setShowModal} trackList={trackList} setTrackList={setTrackList} langEn={langEn}  currentUser={currentUser}/>
        {!!showModal &&
        <ModalWindow setShowModal={setShowModal}  showModal={showModal}>
          <AddMusicForm trackList={trackList} setShowModal={setShowModal} setTrackList={setTrackList} langEn={langEn}/>
        </ModalWindow>
        }
    </div>
  )
}