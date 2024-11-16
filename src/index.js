import './pages/index.css';

import { openModal, closeModal, addPopupListeners, handleImageClick } from './components/modal.js';
import { createCard, deleteCard } from './components/card.js';
import { initialCards } from './scripts/cards.js';

const places_list = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
    const itemElement = createCard(element.name, element.link, deleteCard, handleImageClick); // передаем handleImageClick сюда
    places_list.append(itemElement);
});