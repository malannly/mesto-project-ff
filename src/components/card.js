import { openModal } from './modal.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// Функция создания карточки
export const createCard = function (name, link, deleteCard, handleLikeClick, handleImageClick) {
    const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');

    cardElement.querySelector('.card__title').textContent = name;
    cardImage.src = link;
    cardImage.alt = name;

    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', deleteCard);

    const cardLikeButton = cardElement.querySelector('.card__like-button');
    cardLikeButton.addEventListener('click', handleLikeClick);

    cardImage.addEventListener('click', () => handleImageClick(name, link));

    return cardElement;
};


// Функция удаления карточки
export const deleteCard = function(event) {
    const cardItem = event.target.closest('.card');
    cardItem.remove();
};

// Функция лайка
export const handleLikeClick = function (event) { 
    const button = event.target;

    if (button.classList.contains('card__like-button')) {
        button.classList.toggle('card__like-button_is-active'); 
    }
};


// Обработчик клика по изображению 
export const handleImageClick = (name, link) => { 
    const cardFullImage = document.querySelector('.popup__image'); 
    const cardFullCaption = document.querySelector('.popup__caption'); 

    cardFullImage.src = link; 
    cardFullImage.alt = name; 
    cardFullCaption.textContent = name; 

    const imagePopup = document.querySelector('.popup_type_image');
    openModal(imagePopup);
};