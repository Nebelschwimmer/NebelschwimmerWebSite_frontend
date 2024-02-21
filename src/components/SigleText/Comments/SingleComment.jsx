import { removeCommentFromTextByCommentId } from "../../../utils/api_texts";
import { useState, useEffect } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {getAuth, getUser} from 'firebase/auth'


export const SingleComment = ({ currentUser, comment, textID, user_id, setSingleText, options}) => {
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  
  const commentCreationDate = new Date (comment.createdAt).toLocaleString("ru-RU", options);
  const commentID = comment._id;
 
  
  const removeComment = async (textID, commentID) => {
    try {
    await removeCommentFromTextByCommentId(textID, commentID)
    .then(res => setSingleText(()=>({...res})))
    }
    catch(err)
    {console.log(err)}
  }



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
              <img src={comment.user_photoURL ?? 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'}></img>
              <div className='single__text__comments__section__array__userInfo__name'>{comment.user_displayName}</div>
            </div>
              <small>{commentCreationDate}</small>
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