import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._submitAction = null;
  }

  setSubmitAction(action) {
    this._submitAction = action;
  }

  setEventListeners() {
    super.setEventListeners();
    
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (this._submitAction) {
        this._submitAction();
        this.close();
      }
    });
  }
}
