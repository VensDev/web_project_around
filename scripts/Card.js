export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".element__template")
      .cloneNode(true);
  }

  _setEventListeners() {
    // Like button
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });

    // Delete button
    this._element
      .querySelector(".element__erase")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    // Image click - MOSTRAR IMAGEM GRANDE
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
  }

  _handleLikeClick() {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like-black");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector(".element__image");
    const cardTitle = this._element.querySelector(".element__title");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
