export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    this._buttonElement = formElement.querySelector(
      config.submitButtonSelector
    );
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.popup__form-error_type_${inputElement.id.replace("-", "_")}`
    );
    if (!errorElement) return;

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add("active");
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.popup__form-error_type_${inputElement.id.replace("-", "_")}`
    );

    if (!errorElement) return;

    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove("active");
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    // Mostra erro imediatamente para campos vazios
    if (inputElement.value.length === 0) {
      this._showInputError(inputElement, "Preencha este campo");
      return false;
    }

    // Mostra erro para campos com menos de 3 caracteres
    if (inputElement.value.length < 3) {
      this._showInputError(inputElement, "Mínimo 3 caracteres");
      return false;
    }

    // Validação especial para URL

    // if (inputElement.id === "image-url") {
    //   if (inputElement.value.length < 10) {
    //     // Mínimo razoável para URL
    //     this._showInputError(inputElement, "URL muito curta");
    //     return false;
    //   }
    //   if (!this._validateUrl(inputElement.value)) {
    //     this._showInputError(inputElement, "Insira uma URL válida");
    //     return false;
    //   }
    // }
    if (inputElement.id === "image_url") {
      if (inputElement.value.length === 0) {
        this._showInputError(inputElement, "Preencha este campo");
        return false;
      }

      // Verificação básica que funciona na prática
      if (
        !inputElement.value.includes("http") ||
        !inputElement.value.includes(".")
      ) {
        this._showInputError(
          inputElement,
          "Digite uma URL válida (ex: http://site.com)"
        );
        return false;
      }
    }
    // Se passou todas as validações, esconde o erro
    this._hideInputError(inputElement);
    return true;
  }

  // _validateUrl(url) {
  //   const urlRegex =
  //     /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  //   return urlRegex.test(url);
  // }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !this._checkInputValidity(inputElement);
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  }

  _setEventListeners() {
    // Mostra mensagem imediatamente ao perder o foco (blur)
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("blur", () => {
        this._checkInputValidity(inputElement);
      });

      // Valida durante a digitação
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

    this._toggleButtonState(); // Estado inicial
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      // Valida todos os campos ao submeter
      this._inputList.forEach((inputElement) => {
        this._checkInputValidity(inputElement);
      });
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }
}
