import { useEffect, useState } from "react"; 
import useSound from "use-sound";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import './music_card.scss';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DownloadIcon from '@mui/icons-material/Download';
import cn from 'classnames'
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { deleteTrackByID } from "../../utils/api_music";
import { MusicEditForm } from "./MusicEditForm/MusicEditForm";
import { MusicDeleteModal } from "./MusicDeleteModal/MusicDeleteModal";
import { deleteMusicLikeById } from "../../utils/api_music";
import { addLikeById } from "../../utils/api_music";

export const MusicCard = ({track_name, track, langEn, setTrackList, 
  currentUser, track_image, track_source, user_id}) => {
  // Стейт для лайков
  const [musicIsLiked, setMusicIsLiked] = useState(false)
  // Стейт для попапа о том, что нужно авторизоваться
  const [showPopoverNotAuth, setShowPopoverNotAuth] = useState(false)
  // Стейт для изменения класса кнопки с редактированием
  const [copied, setCopied] = useState(false)
  // Cтейт для модального окна при удалении
    const [showModalDelete, setShowModalDelete] = useState(false)
  // Cтейт для модального окна при редактировании
  const [showModalEdit, setShowModalEdit] = useState(false)




const track_id = track._id
const track_likes = track?.track_likes

const [isPlaying, setIsPlaying] = useState(false)  
const [play, { pause, duration, sound}] = useSound(track_source, {interrupt: false});
const [currentTime, setCurrentTime] = useState({
  min: "",
  sec: "",
});
const [seconds, setSeconds] = useState(0);



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

useEffect(()=>{
  if (showPopoverNotAuth)
    setTimeout(()=>{
    setShowPopoverNotAuth(false)
    }, 5000)
},[currentUser, showPopoverNotAuth])





  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } 
    else {
      play();
      setIsPlaying(true);
    }
  };

// useEffect(()=>{
//   if (!isPlaying) setIsPlaying(false)
// }, [isPlaying])

// Время 
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


// Для удаления карточки
const deleteMusicCard = async (track_id) => {
  await deleteTrackByID(track_id).then((newTrackList)=>{
    setTrackList(newTrackList);
    setIsPlaying(false) 
  })
  
}





  return (
  <div className="music__card" >
    <div className="music__card__container">
        <div className="music__card__img__wrapper">
          <img src={track_image}/>
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
                <button onClick={()=>{setShowModalEdit(true)}} className="music__card__left__top__controls__edit__btn"
                  title={langEn ? 'Edit' : 'Редактировать'}><EditIcon fontSize="small"/>
                </button>
                {showModalEdit && (
                  <div className={cn("modal", { ["active"]: showModalEdit })} onClick={()=>{setShowModalEdit(false)}}>
                    <div className={cn("modal_content", { ["active"]: showModalEdit })}  onClick={(e) => e.stopPropagation()}>
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
            </div>

              <div className="music__card__left__bottom__container">
                <small>{langEn ? 'Published by' : 'Опубликовал'} <span>{track.track_author}</span></small>
                <div className="music__card__left__bottom___like__btn__wrapper">
                  <button onClick={()=>{handleLikeClick()}}  
                    className={cn("music__card__left__bottom__like__btn", { ["music__card__left__bottom__like__btn__Active"]: musicIsLiked })} 
                    title={langEn ? 'Like' : 'Нравится'}>
                    <FavoriteIcon fontSize="small"/>
                    <span >{track_likes.length}</span>
                  </button>                  
                </div>
              </div>

          <div className="music__card__left__player">
            {!isPlaying ? (
              <button className="music__card__left__player__btn" onClick={()=>{playingButton()}}>
                  <PlayArrowIcon fontSize=""/>
              </button>
            ) : (
              <button className="music__card__left__player__btn" onClick={()=>{playingButton()}}>
                  <PauseIcon fontSize=""/>
              </button>
            )}           
            <div className="music__card__left__player__running__wrapper">
              <div className="music__card__left__player__running__time">
                  {isPlaying &&
                  <span>
                    {currentTime.min}{':'}{currentTime.sec}
                  </span>
                  }
                  <div>
              </div>
                  <span className="duration">
                    {time.min}:{time.sec}
                  </span>
              </div>
              <input
                type="range"
                min="0"
                max={duration / 1000}
                default="0"
                value={seconds}
                className="music_page_player_range_timeline"
                onChange={(e) => {
                  sound.seek([e.target.value]);
                }}
              />
            </div>
        </div>
      </div>
    </div>
  </div>
  )
}