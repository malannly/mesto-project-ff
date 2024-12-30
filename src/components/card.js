import { addLike, deleteLike, cardDelete } from '../api.js';
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// Функция создания карточки
export const createCard = function (cardData, userId, handleLikeClick, deleteCard, handleImageClick) {
    if (!cardData || !cardData.name || !cardData.link) {
        console.error('Invalid card data:', cardData);
        return;
    }

    const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeCounter = cardElement.querySelector('.card__like-counter');

    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    // удаляем карточки владельца если надо
    if (cardData.owner._id === userId) {
        deleteButton.addEventListener('click', () => deleteCard(cardData._id, cardElement));
    } else {
        deleteButton.remove();
    }

    // лайки карточек
    likeCounter.textContent = cardData.likes.length;

    const isLiked = cardData.likes.some((like) => like._id === userId);
    if (isLiked) {
        likeButton.classList.add('card__like-button_is-active');
    }

    likeButton.addEventListener('click', () => handleLikeClick(cardData._id, likeButton, likeCounter));
    cardImage.addEventListener('click', () => handleImageClick(cardData.name, cardData.link));

    return cardElement;
};

// Функция удаления карточки
export const deleteCard = (cardId, cardElement) => {
    cardDelete(cardId)
        .then(() => {
            cardElement.remove();
        })
        .catch((err) => {
            console.error(`Ошибка: ${err}`);
        });
};

// Функция лайка
export const handleLikeClick = function (cardId, likeButton, likeCountElement) { 
    const isLiked = likeButton.classList.contains('card__like-button_is-active');

    let likeRequest;

    if (isLiked) {
      
        likeRequest = deleteLike(cardId);
    } else {
     
        likeRequest = addLike(cardId);
    }

    likeRequest
        .then((updatedCard) => {
            likeCountElement.textContent = updatedCard.likes.length;
            likeButton.classList.toggle('card__like-button_is-active');
        })
        .catch((err) => {
            console.error(`Ошибка: ${err}`);
        });
};