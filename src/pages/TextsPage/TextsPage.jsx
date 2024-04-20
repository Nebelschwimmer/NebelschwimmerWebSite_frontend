import './textPage.scss'
import { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { getTextsList } from '../../utils/api_texts'
import SearchIcon from '@mui/icons-material/Search';
import { searchText } from '../../utils/api_texts';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { PaginationBoard } from './PaginationBoard'
import { TextLink } from './TextLink'
import cn from 'classnames'
import { Spinner } from '../../components/Spinner/Spinner';



export const TextsPage = ({langEn, pageQuery, pagesNumber, setPagesNumber, setPageQuery, currentUser, texts, setTexts}) => {

const [searchQuery, setSearchQuery] = useState('');
const [pages, setPages] = useState([]);
const [disButton, setDisButton] = useState(false)
const [showPagination, setShowPagination] = useState(false)
const [searchRes, setSearchRes] = useState(false)

const navigate = useNavigate();







useEffect(()=>{ 
  if (searchQuery === "") {
    console.log(pageQuery)
    getTextsList(pageQuery).then((res) => {
    setTexts(()=>([...res.texts]));
    setPagesNumber(res.totalPages);
    setSearchRes(false); 
    navigate(`/texts?page=${pageQuery}`)
    })
  }
  else { 
    console.log(pageQuery)
      searchText(searchQuery).then((res)=>{
      setTexts(()=>([...res]));
      if (res.length === 0) { 
      setSearchRes(true);
      setShowPagination(false);
      }
      setShowPagination(false);
    
      })
      
  }
  
    }, [searchQuery, pageQuery])


const handleSearchInputChange = (event) => { 
  setSearchQuery(event.target.value);
}


useEffect(() => {
  const paginationArr = [...Array(pagesNumber).keys()].map((e) => e + 1);

  let start = Math.max(1, pageQuery - 2); 
  let end = Math.min(pagesNumber, start + 4); 
  if (end === pagesNumber) {
    start = Math.max(1, end - 4);
  }


  if (end < pagesNumber) {
    end--; 
    setPages([...paginationArr.slice(start - 1, end), '...']);
  } else {
    setPages(paginationArr.slice(start - 1, end));
  }
}, [pageQuery, pagesNumber]);


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

const handlePublishClick = () => {
  if (!disButton)
  navigate('/texts/add-text')
  else navigate('/sign-in')
}

useEffect(()=>{
  if (!currentUser) {
    setDisButton(true);
}
  else setDisButton(false)
}, [currentUser])



useEffect(()=>{
  if (searchQuery === '' && pagesNumber > 1)
  setShowPagination(true);
  else setShowPagination(false)
}, [searchQuery, pagesNumber])



  return (
    <div className='texts__page'>
      
      <div className='texts__page__upper_wrapper'>
          <h1 style={{color:'darkorange'}}>{langEn ? 'TEXTS' : 'ТЕКСТЫ'}</h1>
        <div className='texts__page__search__wrapper'>
          <div className='texts__page__input__container'>
              <input 
              id='search_input'
              className='texts__page__input' 
              placeholder={langEn ? 'Search texts' : 'Искать тексты'}
              value={searchQuery ?? ''}
              onChange={handleSearchInputChange}
              // onKeyDown={handleSearchInput}
              >  
              </input>
              <span title={langEn ? 'Search' : "Искать"} className='texts__page__input__search__icon'><SearchIcon fontSize='medium'/></span>
            </div>
        <button 
        className={cn("add__text__sumbit_btn", { ["add__text__sumbit_btn__Disabled"]: disButton })}
        onClick={()=>{handlePublishClick()}}
        >
        {langEn ? 'Publish New Text' : 'Опубликовать текст'}</button>


        </div>
      </div>
    { texts.length !== 0 ?
      <div className='text__page__links'>
          {texts?.map((el, i)=>{
            return (
              
              <TextLink
              {...el}
              link={el}
              key={i}
              langEn={langEn}
              />
                  
              )
            })}
        
      </div>
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
      {pages?.map((currentPage, i)=>{

        return (
        <PaginationBoard
          pagesNumber={pagesNumber}
          currentPage={currentPage}
          pageQuery={pageQuery}
          setPageQuery={setPageQuery}
          key={i}
        />
      )
      })}
    
    <div 
      className='texts__page__pagination__card'
      onClick={()=>{handleForwardArrowClick()}}
      ><ArrowForwardIosIcon fontSize=''/></div>
    </div>
    }
    </div>
  )
}
