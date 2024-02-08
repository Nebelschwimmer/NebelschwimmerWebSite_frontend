import cn from 'classnames'

export const MusicDeleteModal = ({showModalDelete, deleteMusicCard, track_id, setShowModalDelete}) => {

  return (
    <div className={cn("modal", { ["active"]: showModalDelete })} onClick={()=>{setShowModalDelete(false)}}>
      <div className={cn("modal_content", { ["active"]: showModalDelete })}  onClick={(e) => e.stopPropagation()}>
          <div className='modal_top'>
            <h3 style={{color:'darkorange'}}>Are you sure?</h3>
          </div>
          <div className='modal_btns_wrapper'>
            <button onClick={()=>{deleteMusicCard(track_id)}} className='modal_btn_warn'>Delete Track</button>
            <button onClick={()=>{setShowModalDelete(false)}} className='modal_btn'>Cancel</button>
        </div>
      </div>
  </div>
  )
}