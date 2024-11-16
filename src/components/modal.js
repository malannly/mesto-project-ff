import { createCard, deleteCard } from './card.js';

// Закрытие по кнопке esc
const handleEscKeyUp = (e) => {
    if (e.key === 'Escape') {
        const openPopup = document.querySelector('.popup_is-opened');
        if (openPopup) {
            closeModal(openPopup);
        }
    }
};

// Открытие по модального окна
export const openModal = (modal) => {

    if (modal) {
        modal.classList.add('popup_is-opened');
        document.addEventListener('keyup', handleEscKeyUp);

        if (modal === profilePopup) {
            nameInput.value = profileNameElement.textContent;
            jobInput.value = profileDescriptionElement.textContent;
        }
    }
};

// Закрытие модального окна
export const closeModal = (modal) => {
    if (modal) {
        modal.classList.remove('popup_is-opened');
        document.removeEventListener('keyup', handleEscKeyUp);
    }
};

export const addPopupListeners = (popupElement) => {
    if (!popupElement) return;

    const closeButton = popupElement.querySelector('.popup__close');
    if (closeButton) {
        closeButton.addEventListener('click', () => closeModal(popupElement));
    }

    popupElement.addEventListener('mousedown', (event) => {
        if (event.target.classList.contains('popup')) {
            closeModal(popupElement);
        }
    });
};

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

const popUpImage = document.querySelector(".card__image");
if (popUpImage) {
    popUpImage.addEventListener("click", () => openModal(imagePopup));
}

// Форма редактирования профиля
const profileFormElement = document.querySelector('.popup_type_edit .popup__form'); 
const nameInput = profileFormElement.querySelector('.popup__input_type_name'); 
const jobInput = profileFormElement.querySelector('.popup__input_type_description');
const profileNameElement = document.querySelector('.profile__title'); 
const profileDescriptionElement = document.querySelector('.profile__description');

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
const places_list = document.querySelector('.places__list');

// Обработчик для формы добавления карточки
function handleAddCardFormSubmit(evt) {
    evt.preventDefault();

    const nameValue = cardNameInput.value;
    const descriptionValue = cardDescriptionInput.value;

    const newCard = createCard(nameValue, descriptionValue, deleteCard, handleImageClick);
    places_list.prepend(newCard);

    closeModal(addCardPopup);
    addCardFormElement.reset();
}

const addCardFullElement = document.querySelector('.popup_type_image');
const cardFullImage = addCardFullElement.querySelector('.popup__image');
const cardFullCaption = addCardFullElement.querySelector('.popup__caption');

// Обработчик клика по изображению
export const handleImageClick = (name, link) => {
    const cardFullImage = document.querySelector('.popup__image');
    const cardFullCaption = document.querySelector('.popup__caption');

    cardFullImage.src = link;
    cardFullImage.alt = name;
    cardFullCaption.textContent = name;

    openModal(document.querySelector('.popup_type_image'));
};

// обработчики соответствующим формам
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
addCardFormElement.addEventListener('submit', handleAddCardFormSubmit);