
import { SingleComment } from "./SingleComment";

export const Comments = ({singleText, currentUser, user_id, options, setSingleText, textID}) => {

return (
      <>
        { singleText.comments?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((e) => {
          
          return (
          <SingleComment
            {...e}
            textID={textID}
            comment={e}
            key={e._id}
            options={options}
            user_id={user_id}
            setSingleText={setSingleText}
            currentUser={currentUser}
          />
          )
          })
        }
        </>
        )
  
}