// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: DOM узлы
const cardAddButton = document.querySelector('.profile__add-button');
const places_list = document.querySelector('.places__list');

// @todo: Функция создания карточки
const cardAdd = function (name, link, alt) {
    const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
    
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;

    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', deleteButton);

    return cardElement;
}

// @todo: Функция удаления карточки
const deleteButton = function(event) {
    const cardItem = event.target.closest('.card');
    cardItem.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
    const itemElement = cardAdd(element.name, element.link, element.alt);
    places_list.append(itemElement);
});
