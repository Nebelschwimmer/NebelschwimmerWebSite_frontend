import { ModalWindow } from '../../components/ModalWindow/ModalWindow';
import {MusicList} from '../../components/MusicList/MusicList'
import './musicPage.scss'
import { AddMusicForm } from './AddMusicForm/AddMusicForm';
import { useState, useEffect } from 'react';
import { getMusicList, searchMusic } from '../../utils/api_music';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

export const MusicPage = ({langEn, trackList, setTrackList, showModal, setShowModal, currentUser}) => {

  const [searchMusicQuery, setSearchMusicQuery] = useState('')
  
  const navigate = useNavigate()

  useEffect(()=>{
    getMusicList().then((result)=>{
      setTrackList(result)
    })
  }, [])

  const user_id = currentUser.uid

const handleSearchMusicInputChange = (event) => {
  setSearchMusicQuery(event.target.value);
}
const handleSearchMusicInputKeyDown = async (e) => {
  if(e.key === 'Enter' && searchMusicQuery !== undefined) {
    await searchMusic(searchMusicQuery).then((res)=>{
      setTrackList(res)
    })
  } 
}

const onSearchClick = async () => {
  if (searchMusicQuery !== '')
  await searchMusic(searchMusicQuery).then((res)=>{
    setTrackList(res)
    });
  else  {
    document.getElementById('search_input').focus()
  }
}

useEffect(()=>{ 
  if (searchMusicQuery === "" || searchMusicQuery === undefined) {
    getMusicList().then((res) => {
      setTrackList(res)
    })
  }
}, [searchMusicQuery])



  return (
    <div className='music_page_container'>

      <div  className='music_page_container_title_btn_wrapper'>
        {langEn ? <h1 className='music_page_title'>MUSIC</h1> : <h1 className='music_page_title'>МУЗЫКА</h1>}
        <button onClick={()=>{setShowModal(true)}} className='music_page_add_btn'>{langEn ? 'Add New Track ' : "Добавить музыку "} </button>
      </div>
      
      <div className='texts__page__input__container'>
              <input 
              id='search_input'
              className='texts__page__input' 
              placeholder={langEn ? 'Search tracks' : 'Искать треки'}
              value={searchMusicQuery ?? ''}
              onChange={handleSearchMusicInputChange}
              onKeyDown={handleSearchMusicInputKeyDown}
              >  
              </input>
              <span onClick={()=>{onSearchClick()}} title={langEn ? 'Search' : "Искать"} className='texts__page__input__search__icon'><SearchIcon/></span>
            </div>
      

      {trackList.length !== 0 ? 
      < MusicList user_id={user_id}  showModal={showModal} setShowModal={setShowModal} trackList={trackList} 
        setTrackList={setTrackList} langEn={langEn}  currentUser={currentUser}/>
      :
      <span className='music__page__empty'>{langEn ? 'Tracklist not found' : 'Треки не найдены'}</span>
      }
      <ModalWindow showModal={showModal} setShowModal={setShowModal}>
        <AddMusicForm langEn={langEn} setShowModal={setShowModal} currentUser={currentUser} trackList={trackList} setTrackList={setTrackList}/>
      </ModalWindow>
    </div>
  )
}