const onResponse = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject('Error');
};
export const getTextsList = async (pageQuery) => {
  return fetch(`http://localhost:3020/texts?page=${pageQuery}`, {
    headers: {
    "Content-Type": "application/json"
    }
  }
  ).then((res) => onResponse(res));
}
export const searchText = async (searchQuery) => {
  return fetch(`http://localhost:3020/texts?search=${searchQuery}`, {
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
export const addNewText = async (body, user_displayName, author_id) => {
  console.log(author_id)
  return fetch('http://localhost:3020/texts/add', {
    headers: {
    "Content-Type": "application/json"
    },
    method: 'POST',
    body: JSON.stringify({...body, user_displayName, author_id})
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
export const updateTextNameEn = async (textID, name) => {
  return fetch(`http://localhost:3020/texts/update/name_en/${textID}`, {
    headers: {
    "Content-Type": "application/json"
    },
    method: 'PUT',
    body: JSON.stringify(name)
  }
  ).then((res) => onResponse(res));
}
export const updateTextNameRu = async (textID, name) => {
  return fetch(`http://localhost:3020/texts/update/name_ru/${textID}`, {
    headers: {
    "Content-Type": "application/json"
    },
    method: 'PUT',
    body: JSON.stringify(name)
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

export const getCommentAuthorInfoByID = (commentAuthorID) => {
  return fetch('http://localhost:3020/texts/comments/getAuthorName', {
    headers: {
      "Content-Type": "application/json"
    },
    method: "PATCH",
    body: JSON.stringify({user_id: commentAuthorID})
    
  }).then((res) => onResponse(res));
}