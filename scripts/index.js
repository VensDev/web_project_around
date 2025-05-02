import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  openPopup,
  closePopup,
  validationConfig,
  initialCards,
} from "./utils.js";

// Elementos DOM
const editProfileButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup");
const addCardButton = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup__add-image");
const popupImage = document.querySelector(".popup__show-image");
const cardsContainer = document.getElementById("cards-container");

// Elementos do formulário de perfil
const profileForm = document.getElementById("form-edit");
const profileNameInput = document.getElementById("name");
const profileAboutInput = document.getElementById("about");
const profileNameDisplay = document.querySelector(".profile__name");
const profileJobDisplay = document.querySelector(".profile__subtitle");

// Elementos do formulário de novo card
const addCardForm = document.getElementById("form-add");
const imageTitleInput = document.getElementById("title");
const imageUrlInput = document.getElementById("image_url");

// Inicialização dos validadores
const editFormValidator = new FormValidator(validationConfig, profileForm);
const addFormValidator = new FormValidator(validationConfig, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Função para abrir imagem grande
function handleCardClick(name, link) {
  const popupImg = popupImage.querySelector(".popup__big-image");
  const popupCaption = popupImage.querySelector(".popup__image_footer");

  popupImg.src = link;
  popupImg.alt = name;
  popupCaption.textContent = name;

  openPopup(popupImage);
}

// Event listeners para popups
editProfileButton.addEventListener("click", () => {
  profileNameInput.value = profileNameDisplay.textContent;
  profileAboutInput.value = profileJobDisplay.textContent;
  if (
    editFormValidator &&
    typeof editFormValidator.resetValidation === "function"
  ) {
    editFormValidator.resetValidation();
  }

  openPopup(popupEdit);
});

addCardButton.addEventListener("click", () => {
  addCardForm.reset();
  addFormValidator.resetValidation();
  openPopup(popupAdd);
});

// Fechar popups
document.querySelectorAll(".popup__close-button").forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closePopup(popup);
  });
});

// Fechar popup ao clicar fora
function setupPopupCloseOnOutsideClick() {
  document.addEventListener("click", (evt) => {
    const popups = document.querySelectorAll(".popup:not(.display__none)");

    popups.forEach((popup) => {
      // Fecha se clicou diretamente no overlay OU no body (quando popup não cobre 100%)
      if (
        evt.target === popup ||
        (evt.target === document.body && !popup.contains(evt.target))
      ) {
        closePopup(popup);
      }
    });
  });
}

setupPopupCloseOnOutsideClick();

// Manipulação de formulários
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameDisplay.textContent = profileNameInput.value;
  profileJobDisplay.textContent = profileAboutInput.value;
  closePopup(popupEdit);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: imageTitleInput.value,
    link: imageUrlInput.value,
  };

  const card = new Card(newCard, "#element-card", handleCardClick);
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);

  addCardForm.reset();
  closePopup(popupAdd);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// Renderizar cards iniciais
initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#element-card", handleCardClick);
  const cardElement = card.generateCard();
  cardsContainer.append(cardElement);
});
