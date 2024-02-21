import './textPage.scss'
import { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getTextsList } from '../../utils/api_texts'
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { searchText } from '../../utils/api_texts';
import {getAuth} from 'firebase/auth'

export const TextsPage = ({langEn, texts, setTexts}) => {
 
const [searchQuery, setSearchQuery] = useState(undefined);

const auth = getAuth();
const user = auth.currentUser;




const navigate = useNavigate();

  useEffect(()=>{ 
    if (searchQuery === "" || searchQuery === undefined) {
    getTextsList().then((res) => {
      setTexts(res)
    })
  }
}, [searchQuery])

const options = { 
  day: "numeric",
  month: "numeric",
  year: "numeric",
  }

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

const texts_sorted_en = [{id: 'Author'}, { id: 'New' },  { id: 'Old' }, { id: 'Popular' }, { id: 'Most discussed' }]
const texts_sorted_ru = [{id: 'Автор'}, { id: 'Новые' },  { id: 'Старые' }, { id: 'Популярные' }, { id: 'Обсуждаемые' }]

const sortTextsEn = (sortWay) => {
  switch(sortWay){
    case 'Author':
      const sorTextsByAuthor = texts.sort((a, b) => (b.author.localeCompare(a.author)))
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
  case 'Most discussed':
    const sortDiscussedTexts = texts.sort((a, b) =>(b.comments.length) - (a.comments.length));
    setTexts([...sortDiscussedTexts]);
  break;
      default: 
  }
}

const sortTextsRu = (sortWay) => {
  switch(sortWay){
    case 'Автор':
      const sorTextsByAuthor = texts.sort((a, b) => (b.author.localeCompare(a.author)))
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
  case 'Обсуждаемые':
    const sortDiscussedTexts = texts.sort((a, b) => (b.comments.length) - (a.comments.length));
    setTexts([...sortDiscussedTexts]);
  break;
      default: 
  }
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
              <span onClick={()=>{onSearchClick()}} title={langEn ? 'Search' : "Искать"} className='texts__page__input__search__icon'><SearchIcon/></span>
            </div>
        <button className='add__text__sumbit_btn' onClick={()=>{navigate('/texts/add-text')}}>{langEn ? 'Publish New Text' : 'Опубликовать текст'}</button>
        </div>
      </div>
      
    { texts.length !== 0 ?
      <div>
      {langEn ?
        <div className='texts__page__sort__controls'>
        {texts_sorted_en.map((e)=>{
          return(
            <span onClick={() => sortTextsEn(e.id)}>{e.id}</span>
          )
          })}
        </div>
        :
        <div className='texts__page__sort__controls'>
        {texts_sorted_ru.map((e)=>{
          return(
            <span onClick={() => sortTextsRu(e.id)}>{e.id}</span>
          )
          })}
        </div>
      }
        
        <table>
          <thead>
              <tr>
              <th>{langEn ? 'Text Name' : 'Название текста'}</th>
              <th>{langEn ? 'Author' : 'Автор'}</th>
              <th>{langEn ? 'Published' : 'Опубликовано'}</th>
              {/* <th>{langEn ? 'Language(s)' : 'Язык(и)'}</th> */}
              <th title={langEn ? 'Liked' : "Понравилось"}><FavoriteIcon fontSize='small' /></th>
              <th title={langEn ? 'Comments' : "Комментарии"}><CommentIcon fontSize='small' /></th>
            </tr>
            </thead>
          {texts?.map((el)=>{
            return (
        
              <tbody>
                  <tr key={el._id}>
                    <td>
                      <Link className='texts__page__link'  to={`/texts/${el._id}`}>{langEn ? el.name_en : el.name_ru}</Link>
                    </td>
                    <td>{el.author}</td>
                    <td>{new Date (el.createdAt).toLocaleString("ru-RU", options)}</td>
                    {/* <td>{text.content_en !== ''}</td> */}
                    <td>{el.likes.length}</td>
                    <td>{el.comments.length}</td>
                  </tr>
              </tbody>
              )
            })}
        </table>
      </div>
      :
      <span className='texts__page__not__found'>{langEn ? "Sorry, no texts found" : "К сожалению, ничего не найдено"}</span>
    } 
    </div>
  )
}