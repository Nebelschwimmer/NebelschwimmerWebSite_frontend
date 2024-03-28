import { Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { useState, useEffect } from 'react';
import { getPublisherInfoByID } from '../../utils/api_texts';

export const TextLink = ({link, langEn}) => {

  const options = { 
    day: "numeric",
    month: "numeric",
    year: "numeric",
    }


    const [userInfo, setUserInfo] = useState({});
    const publisherID = link.publisher_id
  
  useEffect(()=>{
    getPublisherInfoByID(publisherID).then(res => {
    if (res.message === 'Success')
    setUserInfo(()=>({...res}))
    else setUserInfo({publisher_name: 'Deleted / Удаленный', publisher_avatar: 'https://cdn-icons-png.freepik.com/512/3519/3519212.png'})
  })
  },[])

  return (
    <>
      <Link to={`/texts/${link._id}`} className='texts__page__text__info__container'>
                  
                  <div className='texts__page__text__main__info__wrapper'>
                    <h4>{langEn ? link.name_en : link.name_ru}</h4>
                    <div>
                      {/* <em>{langEn ? 'Author' : "Автор"}</em> */}
                      <em>{langEn ? link.author_en : link.author_ru}</em>
                    </div>
                  </div>
                  <div className='texts__page__text__add__info'>
                    <div>
                      <span>{langEn ? 'Published': "Опубликовал"}</span>
                      <span>{userInfo.publisher_name}</span>
                      <img alt='avatar' src={userInfo.publisher_avatar}></img>
                      <span>{new Date (link.createdAt).toLocaleString("ru-RU", options)}</span>
                    </div>
                    <div>
                      {link.likes.length !== 0 &&
                      <div>
                        <span>{langEn ? 'Likes:': "Понравилось:"}</span>
                        <span>{link.likes.length}</span>
                        <FavoriteIcon fontSize=''/>
                      </div>
                      }
                      {link.comments.length !== 0 &&
                      <div>
                        <span>{langEn ? 'Comments:': "Комментарии:"}</span>  
                        <span>{link.comments.length}</span>
                        <CommentIcon fontSize=''/>
                      </div>
                      }
                    </div>
                  </div>
            
            </Link>
    </>
  )
}