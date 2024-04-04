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
import cn from 'classnames'


export const MusicPage = ({langEn, trackList, setTrackList, showModal, setShowModal, currentUser}) => {

  const [searchMusicQuery, setSearchMusicQuery] = useState('')
  const [pages, setPages] = useState([]);
  const [pagesNumber, setPagesNumber] = useState();
  const [pageQuery, setPageQuery] = useState(1);
  const [showPagination, setShowPagination] = useState(false)

  const [disButton, setDisButton] = useState(false)



  const navigate = useNavigate()

  useEffect(()=>{
    if (!currentUser) {
      setDisButton(true);
  }
    else setDisButton(false)
  }, [currentUser])
  
  
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
}, [searchMusicQuery, pageQuery, pagesNumber])

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
      const slicedPaginationArray = paginationArr.slice(5, pagesNumber)  
      console.log(slicedPaginationArray)
      setPages(slicedPaginationArray)
    }
    else 
    setPages(()=>(paginationArr.slice(0, 5))); 
    }
  )
}, [pageQuery, trackList])

useEffect(()=>{
  if (trackList.length === 0 && pagesNumber >= 1)
  navigate(-1)
  }, [trackList, pagesNumber])

const handlePublishClick = () => {
  if (!disButton)
  setShowModal(true);
  else navigate('/sign-in')
}

useEffect(()=>{
  if (!searchMusicQuery && pagesNumber > 1)
  setShowPagination(true);
  else setShowPagination(false)
}, [searchMusicQuery, pagesNumber])

// useEffect(()=>{
//   if (trackList.length > 5)
//   setShowPagination(true);
// else setShowPagination(false)
// }, [trackList])


  return (
    <div className='music_page_container'>

      <div  className='music_page_container_title_btn_wrapper'>
        {langEn ? <h1 className='music_page_title'>MUSIC</h1> : <h1 className='music_page_title'>МУЗЫКА</h1>}
        <button 
        onClick={()=>{handlePublishClick()}} 
        className={cn("add__text__sumbit_btn", { ["add__text__sumbit_btn__Disabled"]: disButton })}
        >
        {langEn ? 'Add New Track ' : "Добавить музыку "} </button> 
      
      </div>
      {trackList.length !== 0 &&
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
      }
            
      {trackList.length !== 0 ? 
      < MusicList user_id={user_id}  showModal={showModal} setShowModal={setShowModal} trackList={trackList} 
        setTrackList={setTrackList} langEn={langEn}  currentUser={currentUser}/>
      :
      <div className='not__found'>
        <span className='music__page__empty'>{langEn ? 'Tracklist not found' : 'Треки не найдены'}</span>
        <img width='200px' height='200px' src="https://cdn0.iconfinder.com/data/icons/file-and-document-41/100/file_document_doc-23-512.png"/>
      </div>
      }
      {showPagination ?
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