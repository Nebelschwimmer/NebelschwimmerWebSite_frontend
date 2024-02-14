import './commentsForm.scss'
import { useForm } from "react-hook-form";
import { addCommentToText } from '../../../utils/api_texts';


export const CommentsForm = ({textID, setShowComments, setSingleText, currentUser, user_id, langEn}) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user_displayName = currentUser.displayName;
  const user_photoURL = currentUser.photoURL;

  const sendNewComment = async (data) => {
    console.log(data)
    try {
      await addCommentToText(textID, user_id, user_displayName, user_photoURL, data.comment_body)
      .then(res => setSingleText(()=>({...res})));
      setShowComments(false)
    }
    catch(err) {
      console.log(err)
    }

  }

  return(
    <>
    <form onSubmit={handleSubmit(sendNewComment)}>
      <textarea {...register("comment_body")}
      placeholder={langEn ? 'Add comment here' : 'Оставьте комментарий'}>
      </textarea>
      <button className='add__text__sumbit_btn' type="submit">{langEn ? "Send" : "Отправить"}</button>
    </form>
    </>
  )
}