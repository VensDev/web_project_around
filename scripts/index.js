// Seleciona o elemento do popup que será usado para editar o perfil
const popupElement = document.querySelector(".popup");

// Seleciona todos os botões de fechar dentro dos popups
const closeButtons = document.querySelectorAll(".popup__close-button");

// Seleciona o botão que abre o popup de edição do perfil
const editProfileButton = document.querySelector(".profile__edit-button");

// Adiciona um evento de clique ao botão de edição para exibir o popup
editProfileButton.addEventListener("click", function () {
  popupElement.classList.remove("display__none");
});

// Adiciona um evento de clique a cada botão de fechar para ocultar o popup correspondente
closeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const popupElement = button.closest(".popup");
    popupElement.classList.add("display__none");
  });
});

// Seleciona o formulário de edição do perfil
const profileForm = document.querySelector(".popup__form");

// Seleciona os campos de entrada do nome e da descrição do perfil
const profileNameInput = document.querySelector("#name");
const profileAboutInput = document.querySelector("#about");

// Seleciona o botão de salvar no formulário de edição do perfil
const saveProfileButton = document.querySelector(".popup__button");

// Seleciona os elementos onde o nome e a descrição do perfil são exibidos
const profileNameDisplay = document.querySelector(".profile__name");
const profileJobDisplay = document.querySelector(".profile__subtitle");

// Função que lida com o envio do formulário de edição do perfil
function submitProfileForm(evt) {
  evt.preventDefault(); // Impede o comportamento padrão de recarregar a página

  // Atualiza o nome e a descrição do perfil com os valores dos campos de entrada
  profileNameDisplay.textContent = profileNameInput.value;
  profileJobDisplay.textContent = profileAboutInput.value;

  // Fecha o popup após salvar as alterações
  popupElement.classList.add("display__none");
}

// Adiciona um evento de envio ao formulário de edição do perfil
profileForm.addEventListener("submit", submitProfileForm);

// Seleciona todos os campos de entrada e mensagens de erro nos popups
const inputFields = document.querySelectorAll(".popup__edit");
const errorMessages = document.querySelectorAll(".popup__error");
const inputFormImage = document.getElementById("title");
const inputFormUrl = document.getElementById("image-url");

// Função para exibir uma mensagem de erro em um campo específico
function showError(index) {
  errorMessages[index].style.visibility = "visible";
}

// Função para ocultar uma mensagem de erro em um campo específico
function hideError(index) {
  errorMessages[index].style.visibility = "hidden";
}

// Função para validar o campo de nome (deve ter pelo menos 3 caracteres)
function validateName() {
  if (inputFields[0].value.length < 3) {
    showError(0);
    return false;
  } else {
    hideError(0);
    return true;
  }
}

// Função para validar o campo de descrição (deve ter pelo menos 3 caracteres)
function validateAbout() {
  if (inputFields[1].value.length < 3) {
    showError(1);
    return false;
  } else {
    hideError(1);
    return true;
  }
}

// Função para validar o campo de título (deve ter pelo menos 3 caracteres)
function validateTitle() {
  if (inputFormImage.value.length < 3) {
    showError(2);
    return false;
  } else {
    hideError(2);
    return true;
  }
}

function validateUrl() {
  if (inputFormUrl.value.length < 3) {
    showError(3);
    return false;
  } else {
    hideError(3);
    return true;
  }
}

// Função para habilitar ou desabilitar o botão de salvar com base na validação dos campos
function updateSaveButtonState() {
  if (validateName() && validateAbout()) {
    document.getElementById("savebutton").disabled = false;
  } else {
    document.getElementById("savebutton").disabled = true;
  }
}
document
  .getElementById("name")
  .addEventListener("input", updateSaveButtonState);
document
  .getElementById("about")
  .addEventListener("input", updateSaveButtonState);

function updateImageSaveButtonState() {
  if (validateTitle() && validateUrl()) {
    document.getElementById("savebutton-image").disabled = false;
  } else {
    document.getElementById("savebutton-image").disabled = true;
  }
}
document
  .getElementById("title")
  .addEventListener("input", updateImageSaveButtonState);
document
  .getElementById("image-url")
  .addEventListener("input", updateImageSaveButtonState);

// Função para fechar popups ao clicar fora
function closePopupOnClickOutside(evt) {
  const activePopups = document.querySelectorAll(".popup:not(.display__none)");

  activePopups.forEach(function (popup) {
    const popupContent = popup.querySelector(".popup__content");

    // Verifica se o clique foi fora do conteúdo do popup e não no botão que abre o popup
    if (
      !popupContent.contains(evt.target) &&
      !evt.target.closest(".profile__edit-button") &&
      !evt.target.closest(".profile__add-button")
    ) {
      popup.classList.add("display__none");
    }
  });
}

document.addEventListener("click", closePopupOnClickOutside);

// Adiciona um evento de teclado para fechar o popup ao pressionar a tecla "Escape"
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const activePopup = document.querySelector(".popup:not(.display__none)");
    if (activePopup) {
      activePopup.classList.add("display__none");
    }
  }
});

// Seleciona o botão que abre o popup de adicionar imagem
const addImageButton = document.querySelector(".profile__add-button");

// Seleciona o popup de adicionar imagem
const imagePopup = document.querySelector(".popup__add-image");

// Adiciona um evento de clique ao botão de adicionar imagem para exibir o popup
addImageButton.addEventListener("click", function () {
  imagePopup.classList.remove("display__none");
});

// Adiciona um evento de clique aos botões de fechar para ocultar o popup de adicionar imagem
closeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    imagePopup.classList.add("display__none");
  });
});

// Array de objetos contendo os dados iniciais dos cartões
const cardData = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// Função para criar um novo cartão com base nos dados fornecidos
function createCard(card) {
  // Seleciona o template do cartão e faz uma cópia
  const cardTemplateElement = document.querySelector("#element-card").content;
  const newCardElement = cardTemplateElement
    .querySelector(".element__template")
    .cloneNode(true);

  // Seleciona os elementos internos do cartão (imagem, botão de deletar e título)
  const cardImageElement = newCardElement.querySelector(".element__image");
  const cardDeleteButton = newCardElement.querySelector(".element__erase");
  const cardTitleElement = newCardElement.querySelector(".element__title");

  // Define a imagem, o texto alternativo e o título do cartão
  cardImageElement.src = card.link;
  cardImageElement.alt = card.name;
  cardTitleElement.textContent = card.name;

  // Adiciona um evento de clique ao botão de deletar para remover o cartão
  cardDeleteButton.addEventListener("click", function () {
    cardDeleteButton.parentNode.remove();
  });

  // Seleciona o botão de "curtir" e adiciona um evento de clique para alternar o estado
  const likeButton = newCardElement.querySelector(".element__like");
  if (likeButton) {
    likeButton.addEventListener("click", function () {
      likeButton.classList.toggle("element__like-black");
    });
  }

  // Seleciona os elementos do popup de imagem ampliada
  const popupImageElement = document.querySelector(".popup__big-image");
  const imagePopupElement = document.querySelector(".popup__show-image");
  const imagePopupFooter = document.querySelector(".popup__image_footer");

  // Adiciona um evento de clique à imagem do cartão para exibi-la em tamanho maior
  cardImageElement.addEventListener("click", function () {
    imagePopupElement.classList.remove("display__none");
    popupImageElement.setAttribute("src", card.link);
    popupImageElement.setAttribute("alt", card.name);
    imagePopupFooter.textContent = card.name;
  });

  // Adiciona um evento de clique aos botões de fechar para ocultar o popup de imagem ampliada
  closeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      imagePopupElement.classList.add("display__none");
    });
  });

  // Seleciona o contêiner onde os cartões serão exibidos e adiciona o novo cartão
  const cardContainer = document.querySelector(".element");
  cardContainer.prepend(newCardElement);
}

// Cria um cartão para cada item no array de dados iniciais
cardData.forEach(createCard);

// Seleciona os campos de entrada do formulário de adicionar imagem
const imageTitleInput = document.querySelector("#title");
const imageUrlInput = document.querySelector("#image-url");

// Seleciona o formulário de adicionar imagem
const addCardForm = document.querySelector(".popup__form-add-form");

// Função que lida com o envio do formulário de adicionar imagem
function handleAddCardFormSubmit(evt) {
  evt.preventDefault(); // Impede o comportamento padrão de recarregar a página

  // Cria um objeto com os dados da nova imagem
  const cardObj = {
    name: imageTitleInput.value,
    link: imageUrlInput.value,
  };

  // Cria um novo cartão com os dados fornecidos
  createCard(cardObj);

  // Fecha o popup de adicionar imagem e limpa o formulário
  imagePopup.classList.add("display__none");
  addCardForm.reset();
}

// Adiciona um evento de envio ao formulário de adicionar imagem
addCardForm.addEventListener("submit", handleAddCardFormSubmit);
