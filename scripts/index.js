// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: DOM узлы
const cardAddButton = document.querySelector('.profile__add-button');
const places_list = document.querySelector('.places__list');

// @todo: Функция создания карточки
const createCard = function (name, link, deleteCard) {
    const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');

    cardElement.querySelector('.card__title').textContent = name;
    cardImage.src = link;
    cardImage.alt = name;

    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', deleteCard);

    return cardElement;
}

// @todo: Функция удаления карточки
const deleteCard = function(event) {
    const cardItem = event.target.closest('.card');
    cardItem.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
    const itemElement = createCard(element.name, element.link, deleteCard);
    places_list.append(itemElement);
});
