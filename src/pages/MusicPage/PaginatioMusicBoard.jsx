import { useState, useEffect } from "react"
import cn from 'classnames'




export const PaginationMusicBoard = ({pageMusicQuery, setPageMusicQuery, currentMusicPage}) => {
  const [activePage, setActivePage] = useState(true)
        useEffect(()=>{ 
        if (pageMusicQuery == currentMusicPage)
        setActivePage(true)
        else setActivePage(false)
        }, [pageMusicQuery, currentMusicPage])
  return (
    <>
          <div onClick={()=>{setPageMusicQuery(currentMusicPage)}} 
          className={cn("texts__page__pagination__card", { ["texts__page__pagination__card__Active"]: activePage })} 
          >
            {currentMusicPage}
          </div>
  </>
)
}