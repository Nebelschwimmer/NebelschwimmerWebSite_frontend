const onResponse = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject('Error');
};

export const getTextsList = async () => {
  return fetch('http://localhost:3020/texts', {
    headers: {
    "Content-Type": "application/json"
    }
  }
  ).then((res) => onResponse(res));
}

export const getTextByID = async (textID) => {
  return fetch(`http://localhost:3020/texts/${textID}`, {
    headers: {
    "Content-Type": "application/json"
    }
  }
  ).then((res) => onResponse(res));
}

export const addNewText = async (body) => {
  return fetch('http://localhost:3020/texts/add', {
    headers: {
    "Content-Type": "application/json"
    },
    method: 'POST',
    body: JSON.stringify(body)
  }
  ).then((res) => onResponse(res));
}

export const deleteTextFromItsPage = async (textID) => {
  return fetch(`http://localhost:3020/texts/delete/${textID}`, {
    headers: {
    "Content-Type": "application/json"
    },
    method: 'DELETE'
  }
  ).then((res) => onResponse(res));
}

export const updateEnTextById = async (textID, content) => {
  return fetch(`http://localhost:3020/texts/update/en/${textID}`, {
    headers: {
    "Content-Type": "application/json"
    },
    method: 'PUT',
    body: JSON.stringify(content)
  }
  ).then((res) => onResponse(res));
}
  
export const updateRuTextById = async (textID, content) => {
    return fetch(`http://localhost:3020/texts/update/ru/${textID}`, {
      headers: {
      "Content-Type": "application/json"
      },
      method: 'PUT',
      body: JSON.stringify(content)
    }
    ).then((res) => onResponse(res));
}

export const addTextToFavourites =  (textID, user_id) => {
 
  return fetch(`http://localhost:3020/texts/likes/add/${textID}`, {
    headers: {
    "Content-Type": "application/json"
    },
    method: 'PATCH',
    body: JSON.stringify(user_id)
  }
  ).then((res) => onResponse(res));
}

export const removeTextFromFavourites =  (textID, user_id) => {
  return fetch(`http://localhost:3020/texts/likes/delete/${textID}`, {
    headers: {
    "Content-Type": "application/json"
    },
    method: 'DELETE',
    body: JSON.stringify(user_id)
  }
  ).then((res) => onResponse(res));
}

export const addCommentToText =  (textID, userID, user_displayName, user_photoURL, comment_body) => {
  return fetch(`http://localhost:3020/texts/comments/${textID}`, {
    headers: {
    "Content-Type": "application/json"
    },
    method: 'POST',
    body: JSON.stringify(
      {
        user_id: userID,
        user_displayName: user_displayName,
        user_photoURL: user_photoURL,
        comment_body: comment_body

      }
    )
  }
  ).then((res) => onResponse(res));
}

export const removeCommentFromTextByCommentId =  (textID, commentID) => {
  return fetch(`http://localhost:3020/texts/comments/${textID}`, {
    headers: {
    "Content-Type": "application/json"
    },
    method: 'DELETE',
    body: JSON.stringify({comment_id: commentID})
  }
  ).then((res) => onResponse(res));
}