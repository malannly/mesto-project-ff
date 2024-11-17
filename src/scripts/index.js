import { createCard, deleteCard } from '../components/card.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: DOM узлы
const cardAddButton = document.querySelector('.profile__add-button');
const placesList = document.querySelector('.places__list');
const profileAddButton = document.querySelector('.profile__edit-button');

// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
    const itemElement = createCard(element.name, element.link, deleteCard);
    placesList.append(itemElement);
});
