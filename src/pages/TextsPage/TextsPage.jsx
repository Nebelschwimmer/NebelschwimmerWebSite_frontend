import './textPage.scss'
import { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getTextsList } from '../../utils/api_texts'


export const TextsPage = ({langEn, texts, setTexts, currentUser, showModal, setShowModal}) => {
 
const navigate = useNavigate()

// Getting all texts
  useEffect(()=>{ 
    getTextsList().then((res) => {
      setTexts(res);
    });
}, [])





  
  return (
    <div className='texts__page'>
      
      <div className='texts__page__upper_wrapper'>
        <h1 style={{color:'darkorange'}}>My texts</h1>
        <button className='add__text__sumbit_btn' onClick={()=>{navigate('/texts/add-text')}}>{langEn ? 'Publish New Text' : 'Опубликовать текст'}</button>
      </div>
      <h3>Contents:</h3>
      <div className='text__page__contents__container'>
        {texts?.map((text, i)=>{
          return (
            <div>
              <Link className='text__page__link' key={i} to={`/texts/${text._id}`}>{text.name}</Link>
        
            </div>
          )
        })
            }
      </div>
    </div>
  )
}