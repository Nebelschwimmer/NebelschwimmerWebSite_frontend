import {MusicCard} from '../MusicCard/MusicCard'
import { Spinner } from '../Spinner/Spinner';
import './music_track_list.scss'
import { useState, createRef, useCallback, useRef } from 'react';
import useSound from "use-sound";

export const MusicList = ({user_id, setTrackList, currentUser, trackList, langEn}) => {
  
  const [checkPlaying, setCheckPlaying] = useState('')

  
  
  const checkTrackPlaying = (check) => {
    setCheckPlaying(check)
  }

  return (
<div className='track__list'>

      <div className='track__list__cards'>
        {trackList  ?
          trackList.map((el) => {
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
              checkTrackPlaying={checkTrackPlaying}
              checkPlaying={checkPlaying}
              
            />
          );
        })
            :
            <Spinner/>
            }
      </div>
</div>
  )
}