// script.js
document.addEventListener('DOMContentLoaded', () => {
    const editBtn = document.getElementById('editBtn');
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('closePopup');
    const editForm = document.getElementById('editForm');
    const profileName = document.getElementById('profileName');

    // Abrir o Pop-up
    editBtn.addEventListener('click', () => {
        popup.style.display = 'flex';
    });

    // Fechar o Pop-up
    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Salvar o novo nome
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newName = document.getElementById('name').value;
        profileName.textContent = newName;
        popup.style.display = 'none';
    });

    // Fechar o pop-up se clicar fora dele
    window.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
});