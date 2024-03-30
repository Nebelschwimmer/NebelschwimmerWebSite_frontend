
const onResponse = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject('Error');
};

const baseURL = '185.180.230.199:3020'


export const addLikeById = (track_id, user_id) => {
  return fetch(`http://${baseURL}/music/likes/add`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "PATCH",
    body: JSON.stringify({_id: track_id, user_id: user_id})
  }).then((res) => onResponse(res));
}

export const getMusicList = (pageQuery, sortWay) => {
  return fetch(`http://${baseURL}/music?page=${pageQuery}&sort=${sortWay}`, {
    headers: {
      "Content-Type": "application/json"
    },
  }).then((res) => onResponse(res));
}

export const searchMusic = async (searchQuery) => {
  return fetch(`http://${baseURL}/music?search=${searchQuery}`, {
    headers: {
    "Content-Type": "application/json"
    }
  }
  ).then((res) => onResponse(res));
}

export const deleteMusicLikeById = (track_id, user_id) => {
  return fetch(`http://${baseURL}/music/likes/delete`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "DELETE",
    body: JSON.stringify({_id: track_id, user_id: user_id})
  }).then((res) => onResponse(res));
}



export const addNewTrack = (formData) => {
  return fetch(`http://${baseURL}/music/add`, {
    method: "POST",
    body: formData
    
  }).then((res) => onResponse(res));
}
export const updateTrack = (track_id, formData) => {
  return fetch(`http://${baseURL}/music/update`, {
    method: "PUT",
    body: formData
    
  }).then((res) => onResponse(res));
}


export const deleteTrackByID = (track_id, track_source) => {
  return fetch(`http://${baseURL}/music/delete`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "DELETE",
    body: JSON.stringify({_id: track_id, track_source: track_source})
    
  }).then((res) => onResponse(res));
}

export const getAuthorNameByID = (author_id) => {
  return fetch(`http://${baseURL}/music/getAuthorName`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "PATCH",
    body: JSON.stringify({track_author_id: author_id})
    
  }).then((res) => onResponse(res));
}






export const checkIfTrackFileExists = (track_id) => {
  return fetch(`http://${baseURL}/music/checkFile`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "PUT",
    body: JSON.stringify({_id: track_id})
    
  }).then((res) => onResponse(res));
}