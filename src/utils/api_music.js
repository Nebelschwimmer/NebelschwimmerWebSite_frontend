
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

export const getMusicList = () => {
  return fetch('http://localhost:3020/music/', {
    headers: {
      "Content-Type": "application/json"
    },
  }).then((res) => onResponse(res));
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
    // headers: {
    //   "Content-Type": "multipart/form-data"
    // },
    method: "POST",
    body: formData
    
  }).then((res) => onResponse(res));
}
export const updateTrack = (track_id, body) => {
  return fetch('http://localhost:3020/music/update', {
    headers: {
      "Content-Type": "application/json"
    },
    method: "PUT",
    body: JSON.stringify({track_id, ...body})
    
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

export const downloadOnClick = (track_source) => {
  fetch(track_source,  {
    headers: {
    "Content-Type": "audio/mpeg",
    "Content-Disposition": "attachment"},
  })
  .then( res => res.blob() )
  
}