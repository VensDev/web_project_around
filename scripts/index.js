import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import { validationConfig, initialCards } from "./utils.js";

// Instância da classe UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__subtitle",
});

// Instância do popup de imagem
const imagePopup = new PopupWithImage(".popup__show-image");
imagePopup.setEventListeners();

// Função para lidar com clique no card
function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

// Instância da Section para renderizar cards
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, "#element-card", handleCardClick);
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    },
  },
  "#cards-container"
);

// Renderizar cards iniciais
cardSection.renderItems();

// Popup de edição de perfil
const editProfilePopup = new PopupWithForm(".popup", (formData) => {
  // Atualizar informações do usuário
  userInfo.setUserInfo({
    name: formData.name,
    job: formData.about,
  });
  // Fechar popup após salvar
  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

// Popup de adição de card
const addCardPopup = new PopupWithForm(".popup__add-image", (formData) => {
  // Criar novo card com os dados do formulário
  const newCardData = {
    name: formData.title,
    link: formData.image_url,
  };

  const card = new Card(newCardData, "#element-card", handleCardClick);
  const cardElement = card.generateCard();
  cardSection.prependItem(cardElement);

  // Fechar popup após adicionar
  addCardPopup.close();
});
addCardPopup.setEventListeners();

// Validadores de formulário
const editFormValidator = new FormValidator(
  validationConfig,
  document.getElementById("form-edit")
);
const addFormValidator = new FormValidator(
  validationConfig,
  document.getElementById("form-add")
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Event listeners para botões de abertura dos popups
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    // Preencher formulário com dados atuais
    const currentUserInfo = userInfo.getUserInfo();
    document.getElementById("name").value = currentUserInfo.name;
    document.getElementById("about").value = currentUserInfo.job;

    // Reset da validação
    if (
      editFormValidator &&
      typeof editFormValidator.resetValidation === "function"
    ) {
      editFormValidator.resetValidation();
    }

    editProfilePopup.open();
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  // Reset da validação
  addFormValidator.resetValidation();
  addCardPopup.open();
});
