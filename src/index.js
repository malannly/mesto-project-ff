import './pages/index.css';
import { openModal, closeModal, addPopupListeners } from './components/modal.js';
import { createCard, deleteCard, handleLikeClick, handleImageClick } from './components/card.js';
import { initialCards } from './scripts/cards.js';

const placesList = document.querySelector('.places__list');

// Выводим карточки на страницу
initialCards.forEach((element) => {
    const itemElement = createCard(element.name, element.link, deleteCard, handleLikeClick, handleImageClick);
    placesList.append(itemElement);
});

const profilePopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

addPopupListeners(profilePopup);
addPopupListeners(addCardPopup);
addPopupListeners(imagePopup);

const buttonProfilePopup = document.querySelector(".profile__edit-button");
if (buttonProfilePopup) {
    buttonProfilePopup.addEventListener("click", () => openModal(profilePopup));
}

const buttonProfileAddImage = document.querySelector(".profile__add-button");
if (buttonProfileAddImage) {
    buttonProfileAddImage.addEventListener("click", () => openModal(addCardPopup));
}

// Форма редактирования профиля
const profileFormElement = document.querySelector('.popup_type_edit .popup__form'); 
const nameInput = profileFormElement.querySelector('.popup__input_type_name'); 
const jobInput = profileFormElement.querySelector('.popup__input_type_description');
const profileNameElement = document.querySelector('.profile__title'); 
const profileDescriptionElement = document.querySelector('.profile__description');

const editProfileButton = document.querySelector('.profile__edit-button');
editProfileButton.addEventListener('click', () => {
    openModal(profilePopup);
    fillProfileForm();
});

function fillProfileForm() {
    const nameValue = profileNameElement.textContent;
    const descriptionValue = profileDescriptionElement.textContent;

    nameInput.value = nameValue;
    jobInput.value = descriptionValue;
}

// Обработчик для формы профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const nameValue = nameInput.value;
    const descriptionValue = jobInput.value;

    profileNameElement.textContent = nameValue;
    profileDescriptionElement.textContent = descriptionValue;

    closeModal(profilePopup);
}

// Форма добавления карточки
const addCardFormElement = document.querySelector('.popup_type_new-card .popup__form'); 
const cardNameInput = addCardFormElement.querySelector('.popup__input_type_card-name'); 
const cardDescriptionInput = addCardFormElement.querySelector('.popup__input_type_url');

// Обработчик для формы добавления карточки
function handleAddCardFormSubmit(evt) {
    evt.preventDefault();

    const nameValue = cardNameInput.value;
    const descriptionValue = cardDescriptionInput.value;

    const newCard = createCard(nameValue, descriptionValue, deleteCard, handleLikeClick, handleImageClick);
    placesList.prepend(newCard);

    closeModal(addCardPopup);
    addCardFormElement.reset();
}

// обработчики соответствующим формам
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
addCardFormElement.addEventListener('submit', handleAddCardFormSubmit);