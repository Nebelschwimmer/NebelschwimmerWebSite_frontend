import { ModalWindow } from '../../components/ModalWindow/ModalWindow';
import {MusicList} from '../../components/MusicList/MusicList'
import './musicPage.scss'
import { AddMusicForm } from './AddMusicForm/AddMusicForm';
import { useState, useEffect } from 'react';
import { getMusicList, searchMusic } from '../../utils/api_music';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { PaginationBoard } from '../TextsPage/PaginationBoard';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const MusicPage = ({langEn, trackList, setTrackList, showModal, setShowModal, currentUser}) => {

  const [searchMusicQuery, setSearchMusicQuery] = useState('')
  const [pages, setPages] = useState([])
  const [pagesNumber, setPagesNumber] = useState()
  const [pageQuery, setPageQuery] = useState(1)




  const navigate = useNavigate()


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
    getMusicList(pageQuery).then((res) => {
      setTrackList(()=>([...res.tracks]));
      setPagesNumber(res.totalPages);
      navigate(`/music?page=${pageQuery}`)
    })
  }
}, [searchMusicQuery, pageQuery])

const handleBackArrowClick = () => {
  if (pageQuery > 1)
  setPageQuery(
  st => st - 1
  )
}
const handleForwardArrowClick = () => {
  if (pageQuery < pagesNumber)
  setPageQuery(
  st => st + 1
  )
}

useEffect(()=>{ 
  const paginationArr = [...Array(pagesNumber).keys()].map(e => (e + 1));
  const limitArr = []
  for (let i = 0; i < 5; i++) {
    limitArr.push((i * 5) + 5)
  }
  limitArr.forEach((el, ind, arr) => {
    if (pageQuery > 5) {
      // Проблема: нужно сделать так, чтобы на каждой итерации лимитируещего
      // массива рендерился обрезанный массив из номеров страниц, т.е.
      // если страниц 11, то выводились сначала числа 1-5, затем 6-10, а потом только 11.
      // Попытки записать все массивы в стейты не удались, так как в результате
      // рендерилось только число 11, хотя консоль показывала числа 6-9 при 2-й итерации
      const slicedPaginationArray = paginationArr.slice(5, pagesNumber)  
      console.log(slicedPaginationArray)
      setPages(slicedPaginationArray)
    }
    else 
    setPages(()=>(paginationArr.slice(0, 5))); 
    }
  )
}, [pageQuery, trackList])


  return (
    <div className='music_page_container'>

      <div  className='music_page_container_title_btn_wrapper'>
        {langEn ? <h1 className='music_page_title'>MUSIC</h1> : <h1 className='music_page_title'>МУЗЫКА</h1>}
        {currentUser !== '' ? <button onClick={()=>{setShowModal(true)}} className='music_page_add_btn'>{langEn ? 'Add New Track ' : "Добавить музыку "} </button> : 
        <span className='music_page_not_auth' onClick={()=>{navigate('/sign-in')}}>{langEn ? 'Please, sign in to publish new tracks' : 'Пожалуйста, авторизуйтесь, чтобы публиковать музыку'}</span>}
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
      {pagesNumber > 1 && !searchMusicQuery ?
        <div className='texts__page__pagination__container'>
          <div className='texts__page__pagination__card' onClick={()=>{handleBackArrowClick()}}><ArrowBackIosIcon fontSize=''/></div>
          {pages.map((currentPage, i)=>{

            return (<PaginationBoard
            currentPage={currentPage}
            pageQuery={pageQuery}
            setPageQuery={setPageQuery}
            key={i}
            />)
          })}
        
        <div 
          className='texts__page__pagination__card'
          onClick={()=>{handleForwardArrowClick()}}
          ><ArrowForwardIosIcon fontSize=''/></div>
        </div>
        :
        <div></div> 
      }


      <ModalWindow showModal={showModal} setShowModal={setShowModal}>
        <AddMusicForm langEn={langEn} setShowModal={setShowModal} currentUser={currentUser} trackList={trackList} setTrackList={setTrackList}/>
      </ModalWindow>
    </div>
  )
}