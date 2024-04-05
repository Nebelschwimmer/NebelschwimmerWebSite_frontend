import {MusicList} from '../../components/MusicList/MusicList'
import './musicPage.scss'
import { useState, useEffect } from 'react';
import { getMusicList, searchMusic } from '../../utils/api_music';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { PaginationMusicBoard } from './PaginatioMusicBoard';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import cn from 'classnames'
import { Spinner } from '../../components/Spinner/Spinner';


export const MusicPage = ({langEn, trackList, pageMusicQuery, setPageMusicQuery, pagesMusicNumber, setPagesMusicNumber, setTrackList, showModal, setShowModal, currentUser}) => {

  const [searchMusicQuery, setSearchMusicQuery] = useState('')
  const [pages, setPages] = useState([]);

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
    getMusicList(pageMusicQuery).then((res) => {
      setTrackList(()=>([...res.tracks]));
      setPagesMusicNumber(res.totalPages);
      navigate(`/music?page=${pageMusicQuery}`)
    })
  }
}, [searchMusicQuery, pageMusicQuery, pagesMusicNumber])

const handleBackArrowClick = () => {
  if (pageQuery > 1)
  setPageMusicQuery(
  st => st - 1
  )
}
const handleForwardArrowClick = () => {
  if (pageMusicQuery < pagesMusicNumber)
  setPageMusicQuery(
  st => st + 1
  )
}

useEffect(()=>{ 
  const paginationArr = [...Array(pagesMusicNumber).keys()].map(e => (e + 1));
  const limitArr = []
  for (let i = 0; i < 5; i++) {
    limitArr.push((i * 5) + 5)
  }
  limitArr.forEach((el, ind, arr) => {
    if (pageMusicQuery > 5) {
      const slicedPaginationArray = paginationArr.slice(5, pagesMusicNumber)  
      
      setPages(slicedPaginationArray)
    }
    else 
    setPages(()=>(paginationArr.slice(0, 5))); 
    }
  )
}, [pageMusicQuery, trackList])

useEffect(()=>{
  if (trackList.length === 0 && pagesMusicNumber >= 1)
  setPageMusicQuery(st => st - 1)
  }, [trackList, pagesMusicNumber])




const handlePublishClick = () => {
  if (!disButton)
  navigate('/add-track')
  else navigate('/sign-in')
}

useEffect(()=>{
  if (trackList.length === 0 && searchMusicQuery!== '')
  setShowPagination(false);
  else if (pagesMusicNumber > 1 && searchMusicQuery === '')
  setShowPagination(true);
  else  setShowPagination(false);
}, [ trackList, searchMusicQuery])




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
        setTrackList={setTrackList} langEn={langEn}  currentUser={currentUser} pageMusicQuery={pageMusicQuery} setPageMusicQuery={setPageMusicQuery}
        pagesMusicNumber={pagesMusicNumber}
        />
      :
      <div className='not__found'>
        {/* <span className='music__page__empty'>{langEn ? 'Tracklist not found' : 'Треки не найдены'}</span>
        <img width='200px' height='200px' src="https://cdn0.iconfinder.com/data/icons/file-and-document-41/100/file_document_doc-23-512.png"/> */}
        <Spinner/>
      </div>
      }
      {showPagination ?
        <div className='texts__page__pagination__container'>
          <div className='texts__page__pagination__card' onClick={()=>{handleBackArrowClick()}}><ArrowBackIosIcon fontSize=''/></div>
          {pages.map((currentMusicPage, i)=>{

            return (
            <PaginationMusicBoard
            currentMusicPage={currentMusicPage}
            pageMusicQuery={pageMusicQuery}
            setPageMusicQuery={setPageMusicQuery}
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

    </div>
  )
}