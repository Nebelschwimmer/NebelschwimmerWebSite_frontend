
import './pictures_page.scss'



export const PicturesPage = ({langEn}) => {
  return (
    <>
    
    <div  className='pictures__page__container'>
        {langEn ? <h1 className='music_page_title'>PICTURES</h1> : <h1 className='music_page_title'>КАРТИНКИ</h1>}
        <span>{langEn ? 'This section is currently being developped' : 'Раздел в разработке'}</span>
      
      </div>
    </>
  )
}