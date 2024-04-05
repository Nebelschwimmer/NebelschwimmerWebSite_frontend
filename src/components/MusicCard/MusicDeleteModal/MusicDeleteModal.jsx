import cn from 'classnames'

export const MusicDeleteModal = ({showModalDelete, langEn, deleteMusicCard, track_id, setShowModalDelete}) => {

  return (
    <div className={cn("modal", { ["active"]: showModalDelete })} onClick={()=>{setShowModalDelete(false)}}>
      <div className={cn("modal_content", { ["active"]: showModalDelete })}  onClick={(e) => e.stopPropagation()}>
          <div className='modal_top'>
            <h3 style={{color:'darkorange'}}>{langEn ? 'Are you sure?' : "Вы уверены?"}</h3>
          </div>
          <div className='modal_btns_wrapper'>
            <button onClick={()=>{deleteMusicCard(track_id)}} className='modal_btn_warn'>{langEn ? 'Remove Track' : "Удалить трек"}</button>
            <button onClick={()=>{setShowModalDelete(false)}} className='modal_btn'>{langEn ? 'Cancel' : "Отмена"}</button>
        </div>
      </div>
  </div>
  )
}