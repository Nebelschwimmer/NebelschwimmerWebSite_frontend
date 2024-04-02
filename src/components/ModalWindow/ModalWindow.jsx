import './modalWindow.scss'
import cn from "classnames";
import CloseIcon from '@mui/icons-material/Close';

export  function ModalWindow ({setShowModal, showModal, children}) {



  return (
    <div className={cn("modal", { ["active"]: showModal })} onClick={()=>{setShowModal(false)}}>
        <div  className={cn("modal_content", { ["active"]: showModal })}  onClick={(e) => e.stopPropagation()}>
          <div className='modal__close__container'>
            <span onClick={()=>{setShowModal(false)}}><CloseIcon/></span>
          </div>
          {children}
        </div>
    </div>
  );
}