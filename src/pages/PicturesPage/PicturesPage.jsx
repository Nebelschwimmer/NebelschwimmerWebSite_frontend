
import './pictures_page.scss'
import { useNavigate } from 'react-router-dom'


export const PicturesPage = ({langEn}) => {
  const navigate = useNavigate();
  return (
    <>
    
    <div  className='pictures__page__container'>
        {langEn ? <h1 className='music_page_title'>PICTURES</h1> : <h1 className='music_page_title'>КАРТИНКИ</h1>}
        {/* <button onClick={()=> navigate('/add-pictures')}>Добавить картинку</button> */}
        <span>{langEn ? 'This section is currently being developped' : 'Раздел в разработке'}</span>
      
      </div>
    </>
  )
}