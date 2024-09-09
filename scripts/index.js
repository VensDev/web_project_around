
// <<pop up appears
const popUpTemplate = document.querySelector(".popup")
const popUp = document.querySelector(".popup__content");
const closeEdit = document.querySelector(".popup__close-button")
const editButton = document.querySelector(".profile__edit-button");
// >>

// << pop Up edit profile
const form = document.querySelector(".popup__form");
const nameInput = document.querySelector('#name');
const job = document.querySelector('#job');
const saveProfile = document.querySelector(".popup__button");
const profileName = document.querySelector(".profile__name");
const subJob = document.querySelector(".profile__subtitle");
// >>

editButton.addEventListener("click", function () {
    popUpTemplate.classList.remove("display__none");

});

closeEdit.addEventListener("click", function () {
    popUpTemplate.classList.add("display__none");
});

// <<pop up appears
// function appearEditPopUp(){

//     popUp.style.display = "block";
//     popUpTemplate.style.display = "block";

// }
// editButton.addEventListener("click", appearEditPopUp);


// function closePopUp(){

//     popUp.style.display = "none";
//     popUpTemplate.style.display = "none";

// }
// closeEdit.addEventListener("click", closePopUp);
// >>

// << pop Up edit profile

// verificar como remover apos salvar sem o sistema de style.display

function handleProfileFormSubmit(evt) {
    evt.preventDefault();  

    profileName.textContent = nameInput.value;
    subJob.textContent = job.value;

    popUpTemplate.classList.add("display__none");
}
 form.addEventListener("submit", handleProfileFormSubmit);
// >>

// << botão do coração
const like = document.querySelectorAll(".element__like");
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
