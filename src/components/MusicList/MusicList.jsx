
import { addLikeById, deleteMusicLikeById } from '../../utils/api_music';
import {MusicCard} from '../MusicCard/MusicCard'
import { Spinner } from '../Spinner/Spinner';

import './music_track_list.css'



export const MusicList = ({user_id, setTrackList, currentUser, trackList, langEn}) => {









  return (
<div className='track_list_cards'>

      {trackList !== undefined || [] ? 
        trackList?.map((el) => {
        return (
          <MusicCard
            {...el}
            track={el}
            key={el._id}
          
            langEn={langEn}
            currentUser={currentUser}
            trackList={trackList}
            setTrackList={setTrackList}
            user_id={user_id}
          />
        );
      })
    :
    <Spinner/>
    }
  
</div>
  )
}