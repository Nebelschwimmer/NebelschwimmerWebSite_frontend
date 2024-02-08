
import {MusicCard} from '../MusicCard/MusicCard'
import './music_track_list.css'



export const MusicList = ({handleMusicLike, setTrackList, currentUser, trackList, langEn}) => {


  return (
<div className='track_list_cards'>

{trackList?.map((el) => {
        return (
          <MusicCard
            {...el}
            track={el}
            key={el.track_id}
            handleMusicLike={handleMusicLike}
            langEn={langEn}
            currentUser={currentUser}
            trackList={trackList}
            setTrackList={setTrackList}
          />
        );
      })}
  
</div>
  )
}