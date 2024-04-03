import { useEffect, useRef, useState } from "react"; 
import useSound from "use-sound";
import './music_card.scss';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DownloadIcon from '@mui/icons-material/Download';
import cn from 'classnames'
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { checkIfTrackFileExists, deleteTrackByID, getAuthorNameByID } from "../../utils/api_music";
import { MusicEditForm } from "./MusicEditForm/MusicEditForm";
import { MusicDeleteModal } from "./MusicDeleteModal/MusicDeleteModal";
import { deleteMusicLikeById } from "../../utils/api_music";
import { addLikeById } from "../../utils/api_music";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import { Spinner } from "../Spinner/Spinner";




export const MusicCard = ({track_name, track, langEn, setTrackList, 
  currentUser, track_image, track_source, user_id, checkPlaying, checkTrackPlaying}) => {
  
  //-------------СТЕЙТЫ-----------
    // для лайков
  const [musicIsLiked, setMusicIsLiked] = useState(false);
  // для попапа о том, что нужно авторизоваться
  const [showPopoverNotAuth, setShowPopoverNotAuth] = useState(false);
  // для модального окна при удалении
    const [showModalDelete, setShowModalDelete] = useState(false);
  // для модального окна при редактировании
  const [showModalEdit, setShowModalEdit] = useState(false);
    // если проблема с доступностью трека на серверве
  const [loading, setLoading] = useState(false);
  // смотрим, чтобы пользователь мог редактировать и удалять только свои карточки
  const [checkCurrentUser, setCheckCurrentUser] = useState(false);
  // отображаем имя пользователя по запросу
  const [authorName, setAuthorName] = useState('');

  const [missingFile, setMissingFile] = useState(false)
// Служебные переменные
const navigate = useNavigate()

const track_id = track._id
const track_likes = track?.track_likes
const author_id = track?.track_author_id

const options = { 
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Moscow",
  }

const createdAtDateEn = new Date (track.createdAt).toLocaleString("en-US", options);
const createdAtDateRu = new Date (track.createdAt).toLocaleString("ru-RU", options);
// Функция для лайков
const handleMusicLike = async (track_id, user_id) =>{
  const trackIsLiked = track_likes.some((s) => s === user_id);
  console.log(trackIsLiked)
  try {
  if (trackIsLiked) {
      await  deleteMusicLikeById(track_id, user_id )
      .then((newTrackList)=>
      setTrackList(newTrackList));
      }
    else {
      await addLikeById(track_id, user_id)
      .then((newTrackList)=>
      setTrackList(newTrackList));
      }
    }
    catch(err) {
      console.log(err)
    }
  }

  // Чтобы отлайканные актуальный юзером карточки меняли цвет лайка на оранжевый, а при снятии лайка - обратно становились белыми  
  useEffect(()=> {
    if (track_likes?.some((s) => s === currentUser.uid))
      setMusicIsLiked(true);
    else setMusicIsLiked(false);
  }, [track_likes, currentUser])
  

// Кнопка при нажатии на лайк
const handleLikeClick = () => {
  if (currentUser !== '') {
    handleMusicLike(track_id, user_id);
    setShowPopoverNotAuth(false)
    }
  else setShowPopoverNotAuth(true)
  } 


// Функция для скачивания

  const downloadTrack = (blob, fileName = track_name) => {
    const href = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), {
      href,
      style: "display: none",
      download: `${fileName}.mp3`,
      type:'audio/mpeg'
    
    });
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(href);
    a.remove();
  }


// // Фетч для скачивания
  const downloadOnClick = (track_source) => {
  fetch(track_source,  {
    headers: {
    "Content-Type": "audio/mpeg",
    "Content-Disposition": "attachment"},
  })
  .then((res) => res.blob())
  .then((blob) => {
    downloadTrack(blob)
  });
}
//--------------ЛОГИКА ДЛЯ ПЛЕЕРА------------
// Стейты
const [isPlaying, setIsPlaying] = useState(false)  
// UseSound
const [play, { pause, duration, stop,  sound}] = useSound(track_source, {interrupt: false, onend : () => setIsPlaying(false)});

// Кнопка для воспроизведения и паузы
  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
      
    } 
    else {
      play();
      setIsPlaying(!isPlaying);
      checkTrackPlaying(track_id)
    }
  };

  
  useEffect(()=>{
    if (checkPlaying !== track_id) {
      setIsPlaying(false);
      stop();
    }
      
    }, [checkPlaying])
    // Время
const [currentTime, setCurrentTime] = useState({
  min: "",
  sec: "",
});
const [seconds, setSeconds] = useState(0);
  
let sec = duration / 1000;

const min = Math.floor(sec / 60);
const secRemain = Math.floor(sec % 60);
let time = {
  min: min,
  sec: secRemain
}
if (time.sec < 10) {time.sec = '0' + time.sec}
  
useEffect(() => {
  const interval = setInterval(() => {
    if (sound) {
      setSeconds(sound.seek([]));
      const min = Math.floor(sound.seek([]) / 60);
      let sec = Math.floor(sound.seek([]) % 60);
      if (sec < 10) {sec = '0' + sec};
      setCurrentTime({
        min,
        sec,
      });
    }
  }, 1000);
  return () => clearInterval(interval);
}, [sound]);



// Во время загрузки
useEffect(()=> {
  if (duration === null ) {
    setLoading(true);
      }

}, [duration])

// Смотрим, чтобы юзер мог редактировать и удалять только свои карточки
useEffect(()=> {
  if (currentUser !== '' && currentUser.uid === author_id )
  setCheckCurrentUser(true);
  else setCheckCurrentUser(false);
}, [currentUser])


useEffect(()=>{
  if (currentUser.uid === "EdMxJTASeEU1PYZqNJqJfrsE8p93")
  setCheckCurrentUser(true)

}, [checkCurrentUser])


// Достаем имя юзера по запросу
useEffect(()=> {
  getAuthorNameByID(author_id).then(res => {
    if (res.message === "Success")
    setAuthorName(res.authorName);
    if (res.message === 'User Not Found')
    setAuthorName(langEn ? 'Deleted User' : "Удаленный");  
  }
    ) 
}, [])

// Для удаления карточки
const deleteMusicCard = async () => {
  await deleteTrackByID(track_id, track_source).then((newTrackList)=>{
    setTrackList(newTrackList);
    setIsPlaying(false);
    navigate('/music?page=1') 
  })
  
}


  return (
  <>
  {loading ?
  <div className="music__card">
    <div className="music__card__container">
        <div className="music__card__img__wrapper">
          <img 
            alt='Thumbnail' 
            src={track_image}
            onError={(e) => {
            if (e.target.onerror === null) {
              e.target.src =
                "https://img.freepik.com/premium-photo/neon-flat-musical-note-icon-3d-rendering-ui-ux-interface-element-dark-glowing-symbol_187882-2481.jpg?size=626&ext=jpg"
                }
              }
            }
            />
        </div>

        <div className="music__card__left__container">
          <div className="music__card__left__top__container">
            <h3>{track_name}</h3>
              <div className="music__card__left__top__controls" >
                <button 
                  className="music__card__left__top__controls__edit__btn"
                  onClick={()=>{downloadOnClick(track_source)}} title={langEn ? 'Download' : 'Скачать'} >
                  <DownloadIcon fontSize="small"/>
                </button>
                {checkCurrentUser &&  
                <div>
                  <button onClick={()=>{setShowModalEdit(true)}} className="music__card__left__top__controls__edit__btn"
                    title={langEn ? 'Edit' : 'Редактировать'}><EditIcon fontSize="small"/>
                  </button>
                  
                  {showModalEdit && (
                    <div className={cn("modal", { ["active"]: showModalEdit })} onClick={()=>{setShowModalEdit(false)}}>
                      
                      <div className={cn("modal_content", { ["active"]: showModalEdit })}  onClick={(e) => e.stopPropagation()}>
                      <span className='modal__close' onClick={()=>{setShowModalEdit(false)}}><CloseIcon/></span>
                        <MusicEditForm track={track} track_id={track_id} setTrackList={setTrackList} langEn={langEn} setShowModalEdit={setShowModalEdit}/>
                      </div>
                    </div>
                  )}
                  
                    <span className="music__card__left__top__controls__delete__icon"
                      onClick={()=>{setShowModalDelete(true)}} title="Delete"><DeleteOutlineIcon fontSize="small"/>
                    </span>
                  
                    {showModalDelete &&
                      <MusicDeleteModal showModalDelete={showModalDelete} track_id={track_id} deleteMusicCard={deleteMusicCard} setShowModalDelete={setShowModalDelete}/>
                    }
                </div>
                }
              </div>
            
            {showPopoverNotAuth &&
            <div className="music__card__popover">
              <span onClick={()=>{navigate('/sign-in')}}>{langEn ? 'Sign in to add track to favorites' : 
            'Войдите в аккаунт, чтобы ставить лайки'}</span>
            <span onClick={()=>{setShowPopoverNotAuth(false)}}>
              <CloseIcon fontSize=""/>
            </span></div>
            }
            </div>

            <div className="music__card__left__bottom__container">
              <small>{langEn ? 'Published by' : 'Опубликовал'} <span>{authorName} </span>
              <span> {langEn ? createdAtDateEn : createdAtDateRu}</span>
              </small>
              <div className="music__card__left__bottom___like__btn__wrapper">
                <button onClick={()=>{handleLikeClick()}}  
                  className={cn("music__card__left__bottom__like__btn", { ["music__card__left__bottom__like__btn__Active"]: musicIsLiked })} 
                  title={langEn ? 'Like' : 'Нравится'}>
                  <FavoriteIcon fontSize=""/>
                  <span >{track_likes.length}</span>
                </button>                  
              </div>
            </div>


            <div  className="music__card__left__player">
              

            <div className="music__card__left__player__running__wrapper">
              <div className="music__card__left__player__running__time">
                {currentTime.sec !== "00" || currentTime.min > 0  ?
                <span>
                  {currentTime.min + ' :'}{currentTime.sec}
                </span>
                :
                <span></span>
                }
                  <span className="duration">
                    {time.min}:{time.sec}
                  </span>
              </div>
              <div className="music__card__left__player__btn__input">
                {!isPlaying ? (
                  <button  className="music__card__left__player__btn" onClick={()=>{playingButton()}}>
                      <PlayArrowIcon fontSize=""/>
                  </button>
                ) : (
                  <button  className="music__card__left__player__btn" onClick={()=>{playingButton()}}>
                      <PauseIcon fontSize=""/>
                  </button>
                )}
                <input
                  type="range"
                  min="0"
                  max={duration / 1000}
                  default="0"
                  value={seconds}
                  className="music_page_player_range_timeline"
                  onChange={(e) => {
                    sound.seek([e.target.value]);
                  }}/>
              </div>
          </div>
        </div> 
      </div>
    </div>
  </div>
  
  :

  <div className="music__card">
  {missingFile &&
  <div className="music__card__container">
        <div className="music__card__img__wrapper">
        <img src={'https://img.freepik.com/premium-photo/neon-flat-musical-note-icon-3d-rendering-ui-ux-interface-element-dark-glowing-symbol_187882-2481.jpg?size=626&ext=jpg'}></img>
        </div>
        <div className="music__card__error">{langEn? 'Unfortunately, track is unavailable' : "К сожалению, трек не доступен"}
        {checkCurrentUser &&
        <span className="music__card__error__delete__icon" 
            onClick={()=>{deleteMusicCard(track_id)}} title={langEn ? 'Delete' : "Удалить"}><DeleteOutlineIcon />
        </span>
        }
        </div>
  </div>
  }
  {!missingFile &&
  <div className="music__card__loading">
    <Spinner/>
  </div>
  }
  </div>
  }
  
  </>
  )
}
