import { useEffect, useState } from "react"
import {  useNavigate, useParams } from 'react-router-dom';
import { Backbutton } from "../../components/BackButton/BackButton";
import { useSelector } from 'react-redux';
export const UserPage = ({wsData}) => {
  const [user, setUser] = useState({})
  const id = useParams()
  const userID = id?.userID
  const langEn = useSelector((state) => state.langEn);
  
  const options = { 
    day: "numeric",
    month: "numeric",
    year: "numeric",
    timeZone: "Europe/Moscow",
    hour: "2-digit", 
    minute: "2-digit"
    }
  
  useEffect(()=> {
    fetch(`http://localhost:3020/user/${userID}`)
    .then((response)=>response.json())
    .then((user)=> setUser(user))
  },[])

  const navigate = useNavigate()
  
  const lastRefresh = new Date(wsData.lastRefreshTime).toLocaleString(options)
  return (
    <>
      <div>
      <div className='auth_main'>
        <div className="auth_container">
          <div onClick={()=>navigate(-1)} className="auth_backbtn"><Backbutton/>
          <h1>{ user.displayName}</h1>
          </div>
            <div className='auth_top'>

              <div className='auth_user_info'>
                  <img className='auth_user_avatar' src={user.photoURL}/>
                <div className='auth_user_info_name_wrapper'>
                  <div className='auth_user_info_name_top'>
                    <span>{wsData.checkOnlineStatus === 'online' ? 'Online' : 'Offline'}</span> 
                    {wsData.lastRefreshTime === '' &&
                    <span>{langEn ? 'Last seen' : "Был в сети " }{lastRefresh}</span>
                    }
                  
                  </div>
                </div>
              </div>
            
            </div>

          </div>
      </div>
    </div>
    </>
  )
}