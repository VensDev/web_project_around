
let popUp = document.querySelector(".popup__content");
let editButton = document.querySelector(".profile__edit-button");
let closeEdit = document.querySelector(".popup__close-button")
let popUpTemplate = document.querySelector(".popup")

let saveProfile = document.querySelector(".popup__button");
let nameInput = document.querySelector('#name');
let job = document.querySelector('#job');
let profileName = document.querySelector(".profile__name");
let subJob = document.querySelector(".profile__subtitle");

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

function handleProfileFormSubmit(evt) {
    evt.preventDefault();  

    profileName.textContent = nameInput.value;
    subJob.textContent = job.value;

    closePopUp();
}   
 saveProfile.addEventListener("click", handleProfileFormSubmit);


