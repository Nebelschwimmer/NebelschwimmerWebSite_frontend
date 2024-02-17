import './textPage.scss'
import { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getTextsList } from '../../utils/api_texts'
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { searchTextByAuthor } from '../../utils/api_texts';


export const TextsPage = ({langEn, texts, setTexts, currentUser, showModal, setShowModal}) => {
 


const [searchQuery, setSearchQuery] = useState(undefined)



const navigate = useNavigate()

// Getting all texts
  useEffect(()=>{ 
    getTextsList().then((res) => {
      setTexts(res);
    });
}, [])




const options = { 
  day: "numeric",
  month: "numeric",
  year: "numeric",
  }

useEffect(()=>{

}, [])

console.log(searchQuery)


  
  return (
    <div className='texts__page'>
      
      <div className='texts__page__upper_wrapper'>
          <h1 style={{color:'darkorange'}}>{langEn ? 'Texts' : 'Тексты'}</h1>
        <div className='texts__page__search__wrapper'>
          <div className='texts__page__input__container'>
              
              <input 
              className='texts__page__input' 
              placeholder={langEn ? 'Input author\'s or text name' : 'Введите имя автора либо название текста'}
              value={searchQuery ?? ''}
              onChange={(e) => setSearchQuery(e.target.value)}
              >  
              </input>
              <span className='texts__page__input__search__icon'><SearchIcon/></span>
            </div>
        <button className='add__text__sumbit_btn' onClick={()=>{navigate('/texts/add-text')}}>{langEn ? 'Publish New Text' : 'Опубликовать текст'}</button>
        </div>
      </div>
    
      <table>
        <thead>
            <tr>
            <th>{langEn ? 'Text Name' : 'Название текста'}</th>
            <th>{langEn ? 'Author' : 'Автор'}</th>
            <th>{langEn ? 'Published' : 'Опубликовано'}</th>
            {/* <th>{langEn ? 'Language(s)' : 'Язык(и)'}</th> */}
            <th title={langEn ? 'Liked' : "Понравилось"}><FavoriteIcon /></th>
            <th title={langEn ? 'Comments' : "Комментарии"}><CommentIcon /></th>
          </tr>
          </thead>

        {texts?.map((el)=>{
          return (
            
            <tbody>
                <tr key={el._id}>
                  <td>
                    <Link className='texts__page__link'  to={`/texts/${el._id}`}>{el.name}</Link>
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
  )
}