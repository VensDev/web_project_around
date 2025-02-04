// Função para exibir uma mensagem de erro em um campo específico
export function showError(index) {
  const errorMessages = document.querySelectorAll(".popup__error");
  errorMessages[index].style.visibility = "visible";
}

// Função para ocultar uma mensagem de erro em um campo específico
export function hideError(index) {
  const errorMessages = document.querySelectorAll(".popup__error");
  errorMessages[index].style.visibility = "hidden";
}

// Função para validar o campo de nome (deve ter pelo menos 3 caracteres)
export function validateName() {
  const inputFields = document.querySelectorAll(".popup__edit");
  if (inputFields[0].value.length < 3) {
    showError(0);
    return false;
  } else {
    hideError(0);
    return true;
  }
}

// Função para validar o campo de descrição (deve ter pelo menos 3 caracteres)
export function validateAbout() {
  const inputFields = document.querySelectorAll(".popup__edit");
  if (inputFields[1].value.length < 3) {
    showError(1);
    return false;
  } else {
    hideError(1);
    return true;
  }
}

// Função para validar o campo de título (deve ter pelo menos 3 caracteres)
export function validateTitle() {
  const inputFormImage = document.getElementById("title");
  if (inputFormImage.value.length < 3) {
    showError(2);
    return false;
  } else {
    hideError(2);
    return true;
  }
}

// Função para validar o campo de URL (deve ter pelo menos 3 caracteres)
export function validateUrl() {
  const inputFormUrl = document.getElementById("image-url");
  const urlRegex =
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

  if (!urlRegex.test(inputFormUrl.value)) {
    showError(3); // Mostra a mensagem de erro
    return false;
  } else {
    hideError(3); // Oculta a mensagem de erro
    return true;
  }
}

// Função para habilitar ou desabilitar o botão de salvar com base na validação dos campos
export function updateSaveButtonState() {
  if (validateName() && validateAbout()) {
    document.getElementById("savebutton").disabled = false;
  } else {
    document.getElementById("savebutton").disabled = true;
  }
}

// Função para habilitar ou desabilitar o botão de salvar do formulário de imagem
export function updateImageSaveButtonState() {
  if (validateTitle() && validateUrl()) {
    document.getElementById("savebutton-image").disabled = false;
  } else {
    document.getElementById("savebutton-image").disabled = true;
  }
}

// Função para resetar a validação do formulário
export function resetValidation() {
  const errorMessages = document.querySelectorAll(".popup__error");
  errorMessages.forEach((errorMessage) => {
    errorMessage.style.visibility = "hidden";
  });

  const inputFields = document.querySelectorAll(".popup__edit");
  inputFields.forEach((inputField) => {
    inputField.value = "";
  });

  document.getElementById("savebutton").disabled = true;
  document.getElementById("savebutton-image").disabled = true;
}
