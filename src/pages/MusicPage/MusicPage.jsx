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


export const MusicPage = ({langEn, trackList, pageMusicQuery, isPlaying, setIsPlaying, setPageMusicQuery, pagesMusicNumber, setPagesMusicNumber, setTrackList, showModal, setShowModal, currentUser}) => {

  const [searchMusicQuery, setSearchMusicQuery] = useState('')
  const [pages, setPages] = useState([]);

  const [showPagination, setShowPagination] = useState(false)

  const [disButton, setDisButton] = useState(false)

  const [searchRes, setSearchRes] = useState(false)

  const navigate = useNavigate()



  
  useEffect(()=>{ 
    if (searchMusicQuery === "") {
      
      getMusicList(pageMusicQuery).then((res) => {
      setTrackList(()=>([...res.tracks]));
      setPagesMusicNumber(res.totalPages);
      setSearchRes(false); 
      navigate(`/music?page=${pageMusicQuery}`)
      })
    }
    else { 
      
      searchMusic(searchMusicQuery).then((res)=>{
        setTrackList(()=>([...res]));
        if (res.length === 0) { 
        setSearchRes(true);
        setShowPagination(false);
        }
        setShowPagination(false);
      
        })
        
    }
    
      }, [searchMusicQuery, pageMusicQuery])
  
  
  const handleSearchMusicInputChange = (event) => { 
    setSearchMusicQuery(event.target.value);
  }
  
  
  useEffect(() => {
    const paginationArr = [...Array(pagesMusicNumber).keys()].map((e) => e + 1);
  
    let start = Math.max(1, pageMusicQuery - 2); 
    let end = Math.min(pagesMusicNumber, start + 4); 
    if (end === pagesMusicNumber) {
      start = Math.max(1, end - 4);
    }
  
  
    if (end < pagesMusicNumber) {
      end--; 
      setPages([...paginationArr.slice(start - 1, end), '...']);
    } else {
      setPages(paginationArr.slice(start - 1, end));
    }
  }, [pageMusicQuery, pagesMusicNumber]);
  
  
  const handleBackArrowClick = () => {
    if (pageMusicQuery > 1)
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
  

  const handlePublishClick = () => {
    if (!disButton)
    navigate('/add-track')
    else navigate('/sign-in')
  }
  
  useEffect(()=>{
    if (!currentUser) {
      setDisButton(true);
  }
    else setDisButton(false)
  }, [currentUser])
  
  
  
  useEffect(()=>{
    if (searchMusicQuery === '' && pagesMusicNumber > 1)
    setShowPagination(true);
    else setShowPagination(false)
  }, [searchMusicQuery, pagesMusicNumber])


  
  const user_id = currentUser.uid



  
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
              >  
              </input>
              <span title={langEn ? 'Search' : "Искать"} className='texts__page__input__search__icon'><SearchIcon/></span>
            </div>
      
            
      {trackList.length !== 0 ? 
      < MusicList 
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        user_id={user_id}
        howModal={showModal} 
        setShowModal={setShowModal} 
        trackList={trackList} 
        setTrackList={setTrackList} 
        langEn={langEn}  
        currentUser={currentUser} 
        pageMusicQuery={pageMusicQuery} 
        setPageMusicQuery={setPageMusicQuery}
        pagesMusicNumber={pagesMusicNumber}
        setShowPagination={setShowPagination}
      />
      :
      <div className='not__found'>
      {!searchRes ?
      <Spinner/>
        
      :
    <div className='not__found'>
      <span className='music__page__empty'>{langEn ? 'Sorry, nothing found' : 'К сожалению, ничего не найдено'}</span>
      <img width='200px' height='200px' src="https://cdn0.iconfinder.com/data/icons/file-and-document-41/100/file_document_doc-23-512.png"/>
    </div>
  }
      </div>
      }
      {showPagination &&
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
          ><ArrowForwardIosIcon fontSize=''/>
        </div>
        </div>
      }

    </div>
  )
}