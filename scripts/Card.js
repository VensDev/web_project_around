export default class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick, userId) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._ownerId = data.owner._id || data.owner;
    this._isLiked = data.likes ? data.likes.some(like => like._id === userId || like === userId) : false;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._userId = userId;
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
        this._handleLikeClick(this);
      });

    // Delete button - só mostrar se o card for do usuário
    const deleteButton = this._element.querySelector(".element__erase");
    if (this._ownerId === this._userId) {
      deleteButton.addEventListener("click", () => {
        this._handleDeleteClick(this);
      });
    } else {
      deleteButton.style.display = "none";
    }

    // Image click - MOSTRAR IMAGEM GRANDE
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
  }

  // Métodos para API
  getId() {
    return this._id;
  }

  isLiked() {
    return this._isLiked;
  }

  updateLikes(likes, isLiked) {
    this._isLiked = isLiked;
    // Procurar o botão like (pode ter qualquer uma das classes)
    const likeButton = this._element.querySelector(".element__like, .element__like-black");
    
    if (isLiked) {
      likeButton.classList.add("element__like-black");
      likeButton.classList.remove("element__like");
    } else {
      likeButton.classList.remove("element__like-black");
      likeButton.classList.add("element__like");
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector(".element__image");
    const cardTitle = this._element.querySelector(".element__title");
    const likeButton = this._element.querySelector(".element__like");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    // Configurar estado inicial do like
    if (this._isLiked) {
      likeButton.classList.add("element__like-black");
      likeButton.classList.remove("element__like");
    }

    this._setEventListeners();

    return this._element;
  }
}
