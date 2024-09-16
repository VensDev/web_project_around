

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

// popUp formulario editar profile

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


// popup de adicionar imagem

const addimage = document.querySelector(".profile__add-button");
const popupImage = document.querySelector(".popup__add-image");

addimage.addEventListener("click", function () {
    popupImage.classList.remove("display__none");
});

closeEdit.forEach(function(button) {
    button.addEventListener("click", function() {
        popupImage.classList.add("display__none");
    });
});

const initialCards = [
    {
      name: "Vale de Yosemite",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
    },
    {
      name: "Lago Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
    },
    {
      name: "Montanhas Carecas",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
    },
    {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
    },
    {
      name: "Parque Nacional da Vanoise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
    },
    {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
    }
  ];

// Iterar pelos objetos do array

// Criar cada cartão (criar elemento HTML - template)
function card(card) {
  // Pegar o template;
  const cardTemplate = document.querySelector("#element-card").content;
  // Faz a cópia;
  const cardElement = cardTemplate.querySelector(".element__template").cloneNode(true);
  // Pegar os elementos de dentro da cópia;
 
  const cardImage = cardElement.querySelector(".element__image");
  const cardButtonErase = cardElement.querySelector(".element__erase");
  const cardTitle = cardElement.querySelector(".element__title");
 
  // Popular os sub-elementos com as informações do objeto;

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  cardButtonErase.addEventListener("click", function () {
    cardButtonErase.parentNode.remove();
  });

  // botao de like
  const like = cardElement.querySelector(".element__like");
  if (like) {
    function buttonLike() {
      if (like.classList.contains("element__like")) {
        like.classList.remove("element__like");  // Remove a classe antiga
        like.classList.add("element__like-black");  // Adiciona a nova classe
      } else {
        like.classList.remove("element__like-black");  // Remove a nova classe, se já tiver sido adicionada
        like.classList.add("element__like");  // Adiciona de volta a classe antiga
      }
    }
    like.addEventListener("click", buttonLike);
  }
  const addImage = document.querySelector(".popup__image-test");
  const showImage = document.querySelector(".popup__show-image");
  const footerImage = document.querySelector(".popup__image_footer");
  cardImage.addEventListener("click", function(){
    showImage.classList.remove("display__none");
    addImage.setAttribute("src", card.link);
    addImage.setAttribute("alt", card.name);
    footerImage.textContent = card.name;
  });

  closeEdit.forEach(function(button) {
    button.addEventListener("click", function() {
        showImage.classList.add("display__none");
    });
});
  
  
  
  
  // Adicionar cardElement no HTML;
  // Pegar a lista
  const cardList = document.querySelector(".element");
  cardList.prepend(cardElement);
  
}

initialCards.forEach(card);


