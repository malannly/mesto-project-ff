import { handleImageClick } from './modal.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: DOM узлы
const cardAddButton = document.querySelector('.profile__add-button');
const places_list = document.querySelector('.places__list');
const profileAddButton = document.querySelector('.profile__edit-button');

// @todo: Функция создания карточки
export const createCard = function (name, link, deleteCard, handleImageClick) {
    const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');

    cardElement.querySelector('.card__title').textContent = name;
    cardImage.src = link;
    cardImage.alt = name;

    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', deleteCard);

    const cardLikeButton = cardElement.querySelector('.card__like-button');
    cardLikeButton.addEventListener('click', (event) => handleLikeClick(event));

    cardImage.addEventListener('click', () => handleImageClick(name, link));

    return cardElement;
}

// @todo: Функция удаления карточки
export const deleteCard = function(event) {
    const cardItem = event.target.closest('.card');
    cardItem.remove();
};

// функция лайка
const handleLikeClick = function (event) {
    const button = event.target;
    button.classList.toggle('card__like-button_is-active');
};

// функция расширения иображения
const imageFull = function (event) {
    const button = event.target;
    button.classList.toggle('popup__content_content_image');
};