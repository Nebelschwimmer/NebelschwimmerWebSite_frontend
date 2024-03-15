import { useState, useEffect } from "react"
import cn from 'classnames'




export const PaginationBoard = ({pageQuery, setPageQuery, currentPage}) => {
  const [activePage, setActivePage] = useState(true)
        useEffect(()=>{ 
        if (pageQuery == currentPage)
        setActivePage(true)
        else setActivePage(false)
        }, [pageQuery, currentPage])
  return (
    <>
          <div onClick={()=>{setPageQuery(currentPage)}} 
          className={cn("texts__page__pagination__card", { ["texts__page__pagination__card__Active"]: activePage })} 
          >
            {currentPage}
          </div>
  </>
)
}