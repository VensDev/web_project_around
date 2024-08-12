let popUp = document.querySelector(".popup");
let editProfile = document.querySelector(".profile__edit-button");
let closeEdit = document.querySelector(".popup__close-button")


function appearEditPopUp(){
    popUp.style.display = "block";
}
editProfile.addEventListener("click", appearEditPopUp);


function closeProfile(){
    popUp.style.display = "none";
}
closeEdit.addEventListener("click", closeProfile);


// document.getElementById('editButton').addEventListener('click', function() {
//     var formContainer = document.getElementById('formContainer');
//     formContainer.style.top = '50%';
//     formContainer.style.transform = 'translate(-50%, -50%)';
// });

