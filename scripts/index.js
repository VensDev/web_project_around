import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Api from "./Api.js";
import { validationConfig } from "./utils.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";

console.log("TESTE: JavaScript está executando!");

console.log("Iniciando aplicação...");

// Configuração da API
const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "7e32d889-9ae7-47a5-b570-ff70571ce30f",
    "Content-Type": "application/json",
  },
});

// Variável para armazenar o ID do usuário
let userId = null;

// Instância da classe UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar",
});

console.log("UserInfo criado");

// Instância do popup de imagem
const imagePopup = new PopupWithImage(".popup__show-image");
console.log("PopupWithImage criado");

imagePopup.setEventListeners();
console.log("Event listeners do popup de imagem configurados");

// Função para lidar com clique no card
function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

// Função para lidar com like no card
// Função para lidar com like no card
// Função para lidar com like no card
function handleLikeClick(card) {
  console.log("=== LIKE CLICADO ===");
  console.log("Card ID:", card.getId());
  console.log("Já curtido:", card.isLiked());

  if (card.isLiked()) {
    console.log("Removendo like...");
    // Remover like
    api
      .removeLike(card.getId())
      .then((result) => {
        console.log("Like removido - isLiked:", result.isLiked);
        // Passar o isLiked diretamente da API
        card.updateLikes([], result.isLiked);
      })
      .catch((err) => {
        console.log("Erro ao remover like:", err);
      });
  } else {
    console.log("Adicionando like...");
    // Adicionar like
    api
      .addLike(card.getId())
      .then((result) => {
        console.log("Like adicionado - isLiked:", result.isLiked);
        // Passar o isLiked diretamente da API
        card.updateLikes([], result.isLiked);
      })
      .catch((err) => {
        console.log("Erro ao adicionar like:", err);
      });
  }
}

// Popup de confirmação de delete
const confirmDeletePopup = new PopupWithConfirmation(".popup__confirm-delete");
confirmDeletePopup.setEventListeners();

// Variável para armazenar o card que será deletado
let cardToDelete = null;

// Função para lidar com delete do card
function handleDeleteClick(card) {
  console.log(
    "Delete clicado!",
    card.getId(),
    "Owner:",
    card._ownerId,
    "User:",
    userId
  );

  // Armazenar o card que será deletado
  cardToDelete = card;

  // Definir a ação que será executada quando confirmar
  confirmDeletePopup.setSubmitAction(() => {
    if (cardToDelete) {
      // Mostrar "Deletando..." no botão
      const submitButton = document.querySelector(
        ".popup__confirm-delete .popup__button"
      );
      const originalText = submitButton.textContent;
      submitButton.textContent = "Deletando...";

      api
        .deleteCard(cardToDelete.getId())
        .then(() => {
          console.log("Card deletado com sucesso");
          cardToDelete.deleteCard();
          cardToDelete = null; // Limpar a referência
        })
        .catch((err) => {
          console.log("Erro ao deletar card:", err);
        })
        .finally(() => {
          submitButton.textContent = originalText;
        });
    }
  });

  // Abrir o popup de confirmação
  confirmDeletePopup.open();
}

// Instância da Section para renderizar cards
const cardSection = new Section(
  {
    items: [],
    renderer: (cardData) => {
      const card = new Card(
        cardData,
        "#element-card",
        handleCardClick,
        handleDeleteClick,
        handleLikeClick,
        userId
      );
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement); // Adicionar diretamente aqui
    },
  },
  "#cards-container"
);

console.log("Section criada");

// Resto do código...
console.log("Aplicação iniciada com sucesso!");

// Popup de edição de perfil
const editProfilePopup = new PopupWithForm(".popup", (formData) => {
  const submitButton = document.querySelector(".popup .popup__button");
  const originalText = submitButton.textContent;
  submitButton.textContent = "Salvando...";

  api
    .editProfile(formData.name, formData.about)
    .then((result) => {
      userInfo.setUserInfo({
        name: result.name,
        job: result.about,
      });
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log("Erro ao editar perfil:", err);
    })
    .finally(() => {
      submitButton.textContent = originalText;
    });
});
editProfilePopup.setEventListeners();

// Popup de adição de card
// Popup de adição de card
const addCardPopup = new PopupWithForm(".popup__add-image", (formData) => {
  const submitButton = document.querySelector(
    ".popup__add-image .popup__button"
  );
  const originalText = submitButton.textContent;
  submitButton.textContent = "Salvando...";

  api
    .addCard(formData.title, formData.image_url)
    .then((result) => {
      const card = new Card(
        result,
        "#element-card",
        handleCardClick,
        handleDeleteClick,
        handleLikeClick,
        userId
      );
      const cardElement = card.generateCard();
      cardSection.prependItem(cardElement);
      addCardPopup.close();
    })
    .catch((err) => {
      console.log("Erro ao adicionar card:", err);
    })
    .finally(() => {
      submitButton.textContent = originalText;
    });
});
addCardPopup.setEventListeners();

// ⬇️ COLOQUE AQUI ⬇️
// Popup de alteração de avatar
// ⬇️ POPUP DE AVATAR (depois do addCardPopup) ⬇️
const changeAvatarPopup = new PopupWithForm(
  ".popup__change-avatar",
  (formData) => {
    const submitButton = document.querySelector(
      ".popup__change-avatar .popup__button"
    );
    const originalText = submitButton.textContent;
    submitButton.textContent = "Salvando...";

    api
      .updateAvatar(formData.avatar_url)
      .then((result) => {
        // Atualizar a imagem do avatar na tela
        const avatarImage = document.querySelector(".profile__avatar");
        avatarImage.src = result.avatar;

        changeAvatarPopup.close();
        console.log("Avatar atualizado com sucesso!");
      })
      .catch((err) => {
        console.log("Erro ao atualizar avatar:", err);
      })
      .finally(() => {
        submitButton.textContent = originalText;
      });
  }
);
changeAvatarPopup.setEventListeners();

// ⬇️ VALIDADORES (só uma vez!) ⬇️
const editFormValidator = new FormValidator(
  validationConfig,
  document.getElementById("form-edit")
);
const addFormValidator = new FormValidator(
  validationConfig,
  document.getElementById("form-add")
);
const avatarFormValidator = new FormValidator(
  validationConfig,
  document.getElementById("form-avatar")
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// Carregar dados iniciais do servidor
// Event listeners para botões
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const currentUserInfo = userInfo.getUserInfo();
    document.getElementById("name").value = currentUserInfo.name;
    document.getElementById("about").value = currentUserInfo.job;

    if (
      editFormValidator &&
      typeof editFormValidator.resetValidation === "function"
    ) {
      editFormValidator.resetValidation();
    }

    editProfilePopup.open();
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  addFormValidator.resetValidation();
  addCardPopup.open();
});
// Carregar dados iniciais do servidor
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userId = userData._id;

    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });

    cardSection.renderItems(cardsData);
    console.log("Dados carregados com sucesso!");
  })
  .catch((err) => {
    console.log("Erro ao carregar dados iniciais:", err);
  });

// ⬇️ SOLUÇÃO TEMPORÁRIA - ADICIONE NO FINAL ⬇️
setTimeout(() => {
  // Tentar tanto o avatar quanto o container
  const avatarElement =
    document.querySelector(".profile__avatar") ||
    document.querySelector(".profile__avatar-container") ||
    document.querySelector(".profile__avatar-edit-button");

  console.log("Procurando avatar element:", avatarElement);

  if (avatarElement) {
    avatarElement.onclick = function () {
      console.log("Avatar clicado via onclick!");

      if (
        avatarFormValidator &&
        typeof avatarFormValidator.resetValidation === "function"
      ) {
        avatarFormValidator.resetValidation();
      }

      changeAvatarPopup.open();
    };
    console.log("Event listener onclick adicionado!");
  } else {
    console.log("Avatar element não encontrado!");
  }
}, 1000);
