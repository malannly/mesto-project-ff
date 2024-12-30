const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
    headers: {
      authorization: '26243637-5058-4bba-8fc9-6d279ab2d335',
      'Content-Type': 'application/json'
    }
  }

// функция проверки сервера
const checkServer = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };  

// функция, чтобы получить карточки с сервера
// загружает карточки с сервера
export const getAllCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers,
        })
        .then(checkServer);
    };
  
// функция, чтобы получить информацию о пользователе
// загружает данные пользователя
export const getUserData = () => {
 return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers,
    })
    .then(checkServer);
};

// функция, чтобы получить данные о пользователе при обновлении
export const profileEdit = (userInfo) => {
    return fetch(`${config.baseUrl}/users/me`, {
       method: 'PATCH',
       headers: config.headers,
       body: JSON.stringify({
         name: userInfo.name,
         about: userInfo.about,
       }),
     })
     .then(checkServer);
};

// функция добавления карточки
export const cardAdd = (card) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
       body: JSON.stringify({
         name: card.name,
         link: card.link
       })
     })
     .then(checkServer);
};

// функция постановки лайка
export const addLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then(checkServer);
};

// функция снятия лайка
export const deleteLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(checkServer);
};

// функция удаления карточки
export const cardDelete = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(checkServer);
};

// функция редактирования профиля
export const editAvatar = (avatarImage) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarImage,
        }),
    })
    .then(checkServer);
};