

const popUpTemplate = document.querySelector(".popup")
const closeEdit = document.querySelectorAll(".popup__close-button")
const editButton = document.querySelector(".profile__edit-button");

editButton.addEventListener("click", function () {
    popUpTemplate.classList.remove("display__none");
    
});

closeEdit.forEach(function(button) {
    button.addEventListener("click", function() {
        const popUpTemplate = button.closest(".popup");
        popUpTemplate.classList.add("display__none");
    });
});


const form = document.querySelector(".popup__form");
const nameInput = document.querySelector('#name');
const job = document.querySelector('#job');
const saveProfile = document.querySelector(".popup__button");
const profileName = document.querySelector(".profile__name");
const subJob = document.querySelector(".profile__subtitle");

function handleProfileFormSubmit(evt) {
    evt.preventDefault();  
    
    profileName.textContent = nameInput.value;
    subJob.textContent = job.value;
    
    popUpTemplate.classList.add("display__none");
}
form.addEventListener("submit", handleProfileFormSubmit);



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


const erase = document.querySelectorAll(".element__erase");
erase.forEach(function(button) {
    button.addEventListener("click", function() {
        const elementTemp = button.closest(".element__template");
        elementTemp.classList.add("display__none");
    });
});


const addimage = document.querySelector(".profile__add-button");
const popupImage = document.querySelector(".popup__image");

addimage.addEventListener("click", function () {
    popupImage.classList.remove("display__none");
});

closeEdit.forEach(function(button) {
    button.addEventListener("click", function() {
        const popupImage = button.closest(".popup__image");
        popupImage.classList.add("display__none");
    });
});