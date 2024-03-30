import { getCommentAuthorInfoByID, removeCommentFromTextByCommentId } from "../../../utils/api_texts";
import { useState, useEffect } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';



export const SingleComment = ({comment, textID, user_id, setSingleText, options}) => {
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const commentCreationDate = new Date (comment.createdAt).toLocaleString("ru-RU", options);
  const commentID = comment._id;
  const commentAuthorID = comment.user_id
  
  const removeComment = async (textID, commentID) => {
    try {
    await removeCommentFromTextByCommentId(textID, commentID)
    .then(res => setSingleText(()=>({...res})))
    }
    catch(err)
    {console.log(err)}
  }

useEffect(()=>{
getCommentAuthorInfoByID(commentAuthorID).then(res => {
  if (res.message === 'Success')
  setUserInfo(()=>({...res}))
  else setUserInfo({author_name: 'Deleted / Удаленный', author_avatar: 'https://cdn-icons-png.freepik.com/512/3519/3519212.png'})
})
},[])



  useEffect(()=>{
    if (comment.user_id === user_id)
    setShowDeleteBtn(true);
    else
    setShowDeleteBtn(false);
  }, [])
  
  return(
    <>
    <div className='single__text__comments__section__array'>
          <div className='single__text__comments__section__array__userInfo'>
            <div className='single__text__comments__section__array__userInfo__left'>
              <img src={userInfo.author_avatar ?? 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'}></img>
              <div className='single__text__comments__section__array__userInfo__name'>{userInfo.author_name}</div>
              <small>{commentCreationDate}</small>
            </div>
            <div>
            {showDeleteBtn &&
              <small className='single__text__comments__section__array__userInfo__deleteICON' onClick={()=> removeComment(textID, commentID)}><DeleteForeverIcon fontSize='small'/></small>
            }
              </div>
          </div>
          <div>{comment.comment_body}</div>
        </div>
    </>
  )
}