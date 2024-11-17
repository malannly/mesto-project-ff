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
