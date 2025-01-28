// validate.js

function showError(input, message) {
  console.log("Exibindo erro:", message); // Adicione esta linha
  const errorElement = document.createElement("span");
  errorElement.classList.add("popup__error", "popup__error_visible");
  errorElement.textContent = message;
  input.parentNode.insertBefore(errorElement, input.nextSibling);
}

function hideError(input) {
  console.log("Exibindo erro:", message);
  const errorElement = input.parentNode.querySelector(".popup__error");
  if (errorElement) {
    errorElement.remove();
  }
}

function checkInputValidity(input) {
  if (!input.validity.valid) {
    showError(input, "Está tudo errado, escreva certo");
    return false;
  } else {
    hideError(input);
    return true;
  }
}

function toggleButtonState(inputs, button) {
  const isFormValid = Array.from(inputs).every((input) => input.validity.valid);
  button.disabled = !isFormValid;
}

function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
}) {
  const forms = document.querySelectorAll(formSelector);
  forms.forEach((form) => {
    const inputs = form.querySelectorAll(inputSelector);
    const button = form.querySelector(submitButtonSelector);

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(input);
        toggleButtonState(inputs, button);
      });
    });

    toggleButtonState(inputs, button); // Inicializa o estado do botão
  });
}

// Exportar a função para uso em index.js
export { enableValidation };
