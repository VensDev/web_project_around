
// <<pop up appears
let popUpTemplate = document.querySelector(".popup")
let popUp = document.querySelector(".popup__content");
let closeEdit = document.querySelector(".popup__close-button")
let editButton = document.querySelector(".profile__edit-button");
// >>

// << pop Up edit profile
let form = document.querySelector(".popup__form");
let nameInput = document.querySelector('#name');
let job = document.querySelector('#job');
let saveProfile = document.querySelector(".popup__button");
let profileName = document.querySelector(".profile__name");
let subJob = document.querySelector(".profile__subtitle");
// >>

// << botão do coração
let like = document.querySelectorAll(".element__like");
// >>

// <<pop up appears
function appearEditPopUp(){

    popUp.style.display = "block";
    popUpTemplate.style.display = "block";

}
editButton.addEventListener("click", appearEditPopUp);


function closePopUp(){

    popUp.style.display = "none";
    popUpTemplate.style.display = "none";

}
closeEdit.addEventListener("click", closePopUp);
// >>
// << pop Up edit profile
function handleProfileFormSubmit(evt) {
    evt.preventDefault();  

    profileName.textContent = nameInput.value;
    subJob.textContent = job.value;

    closePopUp();
}
 form.addEventListener("submit", handleProfileFormSubmit);
// >>
// << botão do coração
function clickLike(event){
    let like = event.target;
    if (like.classList.contains("element__like")) {
        like.classList.remove("element__like");
        like.classList.add("element__like-black");
      } else {
        like.classList.remove("element__like-black");
        like.classList.add("element__like");
      }
}
like.forEach((like) => like.addEventListener("click", clickLike));
// >>
