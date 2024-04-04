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



export const TextsPage = ({langEn, pageQuery, pagesNumber, setPagesNumber, setPageQuery, currentUser, texts, setTexts}) => {

const [searchQuery, setSearchQuery] = useState(undefined);
const [pages, setPages] = useState([]);

const [sortWay, setSortWay] = useState('desc');
const [activeSort, setActiveSort] = useState(true);
const [disButton, setDisButton] = useState(false)
const [showPagination, setShowPagination] = useState(false)


const navigate = useNavigate();

  useEffect(()=>{ 
    if (searchQuery === "" || searchQuery === undefined) {
    
      getTextsList(pageQuery).then((res) => {
      setTexts(()=>([...res.texts]));
      setPagesNumber(res.totalPages);
      navigate(`/texts?page=${pageQuery}`)
      })
    }
    else { 
      navigate(`/texts?search=${searchQuery}`)
      setShowPagination(false)
    }
    
      }, [searchQuery, pageQuery])

useEffect(()=>{
  if (sortWay === 'desc')
  setActiveSort(true)
else setActiveSort(false)
}, [sortWay])




useEffect(()=>{
if (texts.length === 0 && pagesNumber >= 1)
navigate(-1)
}, [texts, pagesNumber])



const handleSearchInput = async (e) => {

  if(e.key === 'Enter' && searchQuery !== undefined) {
    await searchText(searchQuery).then((res)=>{
    setTexts(res);
    navigate
    })
  }
}

const handleSearchInputChange = (event) => { 
  setSearchQuery(event.target.value);
}

const onSearchClick = async () => {
  if (searchQuery !== '')
  await searchText(searchQuery).then((res)=>{
    setTexts(res);
    navigate(`/texts?search=${searchQuery}`)
    });
  else  {
    document.getElementById('search_input').focus()
  }
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
}, [pageQuery, texts])

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
  if (!searchQuery && pagesNumber > 1)
  setShowPagination(true);
  else setShowPagination(false)
}, [searchQuery, showPagination])

// console.log(texts)

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
              onKeyDown={handleSearchInput}
              >  
              </input>
              <span onClick={()=>{onSearchClick()}} title={langEn ? 'Search' : "Искать"} className='texts__page__input__search__icon'><SearchIcon fontSize='medium'/></span>
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
      <span className='music__page__empty'>{langEn ? 'Sorry, nothing found' : 'К сожалению, ничего не найдено'}</span>
      <img width='200px' height='200px' src="https://cdn0.iconfinder.com/data/icons/file-and-document-41/100/file_document_doc-23-512.png"/>
    </div>
    }
    {showPagination ?
    <div className='texts__page__pagination__container'>
      <div className='texts__page__pagination__card' onClick={()=>{handleBackArrowClick()}}><ArrowBackIosIcon fontSize=''/></div>
      {pages?.map((currentPage, i)=>{

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
    </div>
  )
}