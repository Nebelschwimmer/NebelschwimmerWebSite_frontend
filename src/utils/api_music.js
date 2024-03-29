
const onResponse = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject('Error');
};


export const addLikeById = (track_id, user_id) => {
  return fetch('http://localhost:3020/music/likes/add', {
    headers: {
      "Content-Type": "application/json"
    },
    method: "PATCH",
    body: JSON.stringify({_id: track_id, user_id: user_id})
  }).then((res) => onResponse(res));
}

export const getMusicList = (pageQuery) => {
  return fetch(`http://localhost:3020/music?page=${pageQuery}`, {
    headers: {
      "Content-Type": "application/json"
    },
  }).then((res) => onResponse(res));
}

export const searchMusic = async (searchQuery) => {
  return fetch(`http://localhost:3020/music?search=${searchQuery}`, {
    headers: {
    "Content-Type": "application/json"
    }
  }
  ).then((res) => onResponse(res));
}

export const deleteMusicLikeById = (track_id, user_id) => {
  return fetch('http://localhost:3020/music/likes/delete', {
    headers: {
      "Content-Type": "application/json"
    },
    method: "DELETE",
    body: JSON.stringify({_id: track_id, user_id: user_id})
  }).then((res) => onResponse(res));
}



export const addNewTrack = (formData) => {
  return fetch('http://localhost:3020/music/add', {
    method: "POST",
    body: formData
    
  }).then((res) => onResponse(res));
}
export const updateTrack = (track_id, formData) => {
  return fetch('http://localhost:3020/music/update', {
    method: "PUT",
    body: formData
    
  }).then((res) => onResponse(res));
}


export const deleteTrackByID = (track_id) => {
  return fetch('http://localhost:3020/music/delete', {
    headers: {
      "Content-Type": "application/json"
    },
    method: "DELETE",
    body: JSON.stringify({_id: track_id})
    
  }).then((res) => onResponse(res));
}

export const getAuthorNameByID = (author_id) => {
  return fetch('http://localhost:3020/music/getAuthorName', {
    headers: {
      "Content-Type": "application/json"
    },
    method: "PATCH",
    body: JSON.stringify({track_author_id: author_id})
    
  }).then((res) => onResponse(res));
}


export const downloadOnClick = (track_source) => {
  fetch(track_source,  {
    headers: {
    "Content-Type": "audio/mpeg",
    "Content-Disposition": "attachment"},
  })
  .then( res => res.blob() )
  
}