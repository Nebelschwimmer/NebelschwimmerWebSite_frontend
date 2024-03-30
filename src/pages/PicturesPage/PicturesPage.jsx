import SearchIcon from '@mui/icons-material/Search';
import './pictures_page.scss'
import { ModalWindow } from '../../components/ModalWindow/ModalWindow';
import { AddPicturesForm } from './AddPicturesForm/AddPicturesForm';


export const PicturesPage = ({langEn, setShowModal, showModal}) => {
  return (
    <>
    
    <div  className='pictures__page__container'>
        {langEn ? <h1 className='music_page_title'>PICTURES</h1> : <h1 className='music_page_title'>КАРТИНКИ</h1>}
        <span>{langEn ? 'This section is currently being developped' : 'Секция в разработке'}</span>
      
      </div>
    </>
  )
}