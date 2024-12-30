import './pages/index.css';
import { openModal, closeModal, addPopupListeners } from './components/modal.js';
import { createCard, deleteCard, handleLikeClick } from './components/card.js';
import { enableValidation, clearValidation } from './components/validation.js';

import { getAllCards, getUserData, profileEdit, cardAdd, editAvatar } from './api.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const placesList = document.querySelector('.places__list');

// Обработчик клика по изображению 
const handleImageClick = (name, link) => { 
    const cardFullImage = document.querySelector('.popup__image'); 
    const cardFullCaption = document.querySelector('.popup__caption'); 

    cardFullImage.src = link; 
    cardFullImage.alt = name; 
    cardFullCaption.textContent = name; 

    const imagePopup = document.querySelector('.popup_type_image');
    openModal(imagePopup);
};

const profilePopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const avatarPopup = document.querySelector(".popup_type_edit-avatar")

addPopupListeners(profilePopup);
addPopupListeners(addCardPopup);
addPopupListeners(imagePopup);
addPopupListeners(avatarPopup);

const buttonProfileAddImage = document.querySelector(".profile__add-button");
if (buttonProfileAddImage) {
    buttonProfileAddImage.addEventListener("click", () => {
        clearValidation(addCardFormElement, validationConfig);
        openModal(addCardPopup);
    });
}

// Форма редактирования профиля
const profileFormElement = document.querySelector('.popup_type_edit .popup__form'); 
const nameInput = profileFormElement.querySelector('.popup__input_type_name'); 
const jobInput = profileFormElement.querySelector('.popup__input_type_description');
const profileNameElement = document.querySelector('.profile__title'); 
const profileDescriptionElement = document.querySelector('.profile__description');

const editProfileButton = document.querySelector('.profile__edit-button');
editProfileButton.addEventListener('click', () => {
    clearValidation(profileFormElement, validationConfig);
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

    const submitButton = profileFormElement.querySelector('.popup__button');
    const originalButtonText = submitButton.textContent;

    submitButton.textContent = 'Сохранение...';
    submitButton.disabled = true;

    const userInfo = {
        name: nameInput.value,
        about: jobInput.value,
    };

    profileEdit(userInfo)
        .then((user) => {
            profileNameElement.textContent = user.name;
            profileDescriptionElement.textContent = user.about;
            closeModal(profilePopup);
        })
        .catch((err) => {
            console.error('Ошибка:', err);
        })
        .finally(() => {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
}


// Форма добавления карточки
const addCardFormElement = document.querySelector('.popup_type_new-card .popup__form'); 
const cardNameInput = addCardFormElement.querySelector('.popup__input_type_card-name'); 
const cardDescriptionInput = addCardFormElement.querySelector('.popup__input_type_url');

// Обработчик для формы добавления карточки
function handleAddCardFormSubmit(evt) {
    evt.preventDefault();

    const submitButton = addCardFormElement.querySelector('.popup__button');
    const originalButtonText = submitButton.textContent;

    submitButton.textContent = 'Сохранение...';
    submitButton.disabled = true;

    const cardInfo = {
        name: cardNameInput.value.trim(),
        link: cardDescriptionInput.value.trim(),
    };

    if (!cardInfo.name || !cardInfo.link) {
        console.error('Ошибка', cardInfo);
        return;
    }

    cardAdd(cardInfo)
        .then((card) => {
            if (card && card.name && card.link) {
                const newCard = createCard(card, userId, handleLikeClick, deleteCard, handleImageClick);
                placesList.prepend(newCard);
                closeModal(addCardPopup);
                addCardFormElement.reset();
            } else {
                console.error('Ошибка: некорректный ответ сервера', card);
            }
        })
        .catch((err) => {
            console.error('Ошибка:', err);
        })
        .finally(() => {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
}

// обработчики соответствующим формам
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
addCardFormElement.addEventListener('submit', handleAddCardFormSubmit);

enableValidation(validationConfig);

let userId = null;

Promise.all([getUserData(), getAllCards()])
    .then(([userData, cards]) => {
        
        userId = userData._id;

        profileNameElement.textContent = userData.name;
        profileDescriptionElement.textContent = userData.about;
        profileImage.style.backgroundImage = `url(${userData.avatar})`;

        cards.forEach((card) => {
            const cardElement = createCard(card, userId, handleLikeClick, deleteCard, handleImageClick);
            placesList.append(cardElement);
        });
    })
    .catch((err) => {
        console.error(`Ошибка: ${err}`);
    });

// редактирование аватара профиля
const avatarEditButton = document.querySelector('.button__edit-avatar');
const avatarForm = avatarPopup.querySelector('.popup_type_edit-avatar .popup__form');
const avatarInput = avatarPopup.querySelector('.popup__input_type_url-avatar');
const profileImage = document.querySelector('.profile__image');

avatarEditButton.addEventListener('click', () => {
    clearValidation(avatarForm, validationConfig);
    openModal(avatarPopup);
});

avatarForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const submitButton = avatarForm.querySelector('.popup__button');
    const originalButtonText = submitButton.textContent;

    submitButton.textContent = 'Сохранение...';
    submitButton.disabled = true;

    const avatarLink = avatarInput.value.trim();

    if (!avatarLink) {
        console.error('Ошибка: пустая ссылка');
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        return;
    }

    editAvatar(avatarLink)
        .then(() => {
            return getUserData();
        })
        .then((userData) => {
            profileImage.style.backgroundImage = `url(${userData.avatar})`;
            closeModal(avatarPopup);
            avatarForm.reset();
        })
        .catch((err) => {
            console.error(`Ошибка: ${err}`);
        })
        .finally(() => {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
});