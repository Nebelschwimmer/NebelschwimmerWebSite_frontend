import SearchIcon from '@mui/icons-material/Search';
import './pictures_page.scss'
import { ModalWindow } from '../../components/ModalWindow/ModalWindow';
import { AddPicturesForm } from './AddPicturesForm/AddPicturesForm';


export const PicturesPage = ({langEn, setShowModal, showModal}) => {
  return (
    <>
    
    <div  className='music_page_container_title_btn_wrapper'>
        {langEn ? <h1 className='music_page_title'>PICTURES</h1> : <h1 className='music_page_title'>КАРТИНКИ</h1>}
        <button onClick={()=>{setShowModal(true)}} className='music_page_add_btn'>{langEn ? 'Add New Pictures ' : "Добавить картинку "} </button>
      </div>
      <ModalWindow showModal={showModal} setShowModal={setShowModal}>
      <AddPicturesForm langEn={langEn}/>
      </ModalWindow>
      <div className='texts__page__input__container'>
        <input 
        id='search_input'
        className='texts__page__input' 
        placeholder={langEn ? 'Search pictures' : 'Искать картинки'}
        // value={searchMusicQuery ?? ''}
        // onChange={handleSearchMusicInputChange}
        // onKeyDown={handleSearchMusicInputKeyDown}
        >  
        </input>
        <span onClick={()=>{}} title={langEn ? 'Search' : "Искать"} className='texts__page__input__search__icon'><SearchIcon/></span>
      </div>
      <div className='pictures__page__grid'>
        <div className='pictures__page__img__wrapper'>
        <img src={''} alt='Picture'/>
        </div>
      </div>
    </>
  )
}