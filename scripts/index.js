import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Api from "./Api.js";
import { validationConfig } from "./utils.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";



// Configuração da API
const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "7e32d889-9ae7-47a5-b570-ff70571ce30f",
    "Content-Type": "application/json",
  },
});

let userId = null;
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar",
});

const imagePopup = new PopupWithImage(".popup__show-image");
imagePopup.setEventListeners();
function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

function handleLikeClick(card) {
  if (card.isLiked()) {
    api
      .removeLike(card.getId())
      .then(() => {
        card.updateLikes([], false);
      })
      .catch((err) => {
        console.log("Erro ao remover like:", err);
      });
  } else {
    api
      .addLike(card.getId())
      .then(() => {
        card.updateLikes([], true);
      })
      .catch((err) => {
        console.log("Erro ao adicionar like:", err);
      });
  }
}

const confirmDeletePopup = new PopupWithConfirmation(".popup__confirm-delete");
confirmDeletePopup.setEventListeners();

let cardToDelete = null;
function handleDeleteClick(card) {
  cardToDelete = card;
  confirmDeletePopup.setSubmitAction(() => {
    if (cardToDelete) {
      const submitButton = document.querySelector(
        ".popup__confirm-delete .popup__button"
      );
      const originalText = submitButton.textContent;
      submitButton.textContent = "Deletando...";

      api
        .deleteCard(cardToDelete.getId())
        .then(() => {
          cardToDelete.deleteCard();
          cardToDelete = null;
        })
        .catch((err) => {
          console.log("Erro ao deletar card:", err);
        })
        .finally(() => {
          submitButton.textContent = originalText;
        });
    }
  });

  confirmDeletePopup.open();
}


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
      cardSection.addItem(cardElement);
    },
  },
  "#cards-container"
);


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

// Popup de alteração de avatar
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
        // Usar UserInfo para atualizar avatar
        userInfo.setUserInfo({
          name: userInfo.getUserInfo().name,
          job: userInfo.getUserInfo().job,
          avatar: result.avatar,
        });

        changeAvatarPopup.close();
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

// Validadores
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

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userId = userData._id;

    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });

    const userCards = cardsData.filter(card => {
      const cardOwnerId = card.owner._id || card.owner;
      return cardOwnerId === userId;
    });
    
    cardSection.renderItems(userCards);
  })
  .catch((err) => {
    console.log("Erro ao carregar dados iniciais:", err);
    userId = "user123";
  });


document
  .querySelector(".profile__avatar-container")
  .addEventListener("click", () => {
    if (
      avatarFormValidator &&
      typeof avatarFormValidator.resetValidation === "function"
    ) {
      avatarFormValidator.resetValidation();
    }
    changeAvatarPopup.open();
  });
