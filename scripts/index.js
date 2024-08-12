let popUp = document.querySelector(".popup__content");
let editProfile = document.querySelector(".profile__edit-button");
let closeEdit = document.querySelector(".popup__close-button")
let popUpTemplate = document.querySelector(".popup")

function appearEditPopUp(){
    popUp.style.display = "block";
    popUpTemplate.style.display = "block"
}
editProfile.addEventListener("click", appearEditPopUp);


function closeProfile(){
    popUp.style.display = "none";
    popUpTemplate.style.display = "none"
}
closeEdit.addEventListener("click", closeProfile);



