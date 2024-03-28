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



export const TextsPage = ({langEn, pageQuery, setPageQuery, currentUser, texts, setTexts}) => {

const [searchQuery, setSearchQuery] = useState(undefined);
const [pages, setPages] = useState([])

const [pagesNumber, setPagesNumber] = useState()




const navigate = useNavigate();

  useEffect(()=>{ 
    if (searchQuery === "" || searchQuery === undefined) {
    
      getTextsList(pageQuery).then((res) => {
      setTexts(()=>([...res.texts]));
      setPagesNumber(res.totalPages);
      navigate(`/texts?page=${pageQuery}`)
      })
    }
  }, [searchQuery, pageQuery])



useEffect(()=>{
if (texts.length === 0 && pagesNumber >= 1)
navigate(-1)
}, [texts, pagesNumber])



const handleSearchInput = async (e) => {

  if(e.key === 'Enter' && searchQuery !== undefined) {
    await searchText(searchQuery).then((res)=>{
    setTexts(res)
    })
  }
}

const handleSearchInputChange = (event) => { 
  setSearchQuery(event.target.value);
}

const onSearchClick = async () => {
  if (searchQuery !== '')
  await searchText(searchQuery).then((res)=>{
    setTexts(res)
    });
  else  {
    document.getElementById('search_input').focus()
  }
}

const texts_sorted_en = [{id: 'Author'}, { id: 'New' },  { id: 'Old' }, { id: 'Popular' }]
const texts_sorted_ru = [{id: 'Автор'}, { id: 'Новые' },  { id: 'Старые' }, { id: 'Популярные' }]

const sortTextsEn = (sortWay) => {
  switch(sortWay){
    case 'Author':
      const sorTextsByAuthor = texts.sort((a, b) => (b.author_en.localeCompare(a.author_en)))
      setTexts([...sorTextsByAuthor]);
    break;
    case 'New':
      const sortNewTexts = texts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTexts([...sortNewTexts]);
    break;
  case 'Old':
    const sortOldTexts = texts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    setTexts([...sortOldTexts]);
      break;
  case 'Popular':
    const sortPopularTexts = texts.sort((a, b) => (b.likes.length) - (a.likes.length));
    setTexts([...sortPopularTexts]);
  break;
      default: 
  }
}

const sortTextsRu = (sortWay) => {
  switch(sortWay){
    case 'Автор':
      const sorTextsByAuthor = texts.sort((a, b) => (b.author_ru.localeCompare(a.author_ru)))
      setTexts([...sorTextsByAuthor]);
    break;
    case 'Новые':
      const sortNewTexts = texts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTexts([...sortNewTexts]);
    break;
  case 'Старые':
    const sortOldTexts = texts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    setTexts([...sortOldTexts]);
      break;
  case 'Популярные':
    const sortPopularTexts = texts.sort((a, b) => (b.likes.length) - (a.likes.length));
    setTexts([...sortPopularTexts]);
  break;
      default: 
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
              <span onClick={()=>{onSearchClick()}} title={langEn ? 'Search' : "Искать"} className='texts__page__input__search__icon'><SearchIcon fontSize=''/></span>
            </div>
        {currentUser !== '' ?
        <button className='add__text__sumbit_btn' onClick={()=>{navigate('/texts/add-text')}}>{langEn ? 'Publish New Text' : 'Опубликовать текст'}</button>
        :
        <span className='music_page_not_auth' onClick={()=>{navigate('/sign-in')}}>{langEn ? 'Please, sign in to publish new texts' : 
        'Пожалуйста, авторизуйтесь, чтобы публиковать тексты'}</span>
        }
        
        </div>
        {texts.length !== 0 &&
        <div>
          {langEn ?
          <div className='texts__page__sort__container'>
            <span>Sort by:</span>
          {texts_sorted_en.map((e, i)=>{
            return(
              <span className='texts__page__sort__item' key={i} onClick={() => sortTextsEn(e.id)}>{e.id}</span>
            )
            })}
          </div>
          :
          <div className='texts__page__sort__container'>
            <span>Сортировать:</span>
          {texts_sorted_ru.map((e, i)=>{
            return(
              <span key={i} className='texts__page__sort__item' onClick={() => sortTextsRu(e.id)}>{e.id}</span>
            )
            })}
          </div>
          }   
        </div>
        }
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
      <span className='texts__page__not__found'>{langEn ? "Sorry, no texts found" : "К сожалению, ничего не найдено"}</span>
    }
    {pagesNumber > 1 && !searchQuery ?
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
    </div>
  )
}