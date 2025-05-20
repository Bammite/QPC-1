document.addEventListener('DOMContentLoaded', function() {
    const formOverlay = document.getElementById('form-overlay');
    const playerForm = document.getElementById('player-form');
    const playerType = document.getElementById('player-type');
    const pointsGroup = document.getElementById('points-group');
    const imageFileInput = document.getElementById('player-image-file');
    const imagePreview = document.getElementById('image-preview');
    
    // Éléments d'affichage
    const playerImage = document.getElementById('player-image');
    const playerName = document.getElementById('player-name');
    const playerTitle = document.getElementById('player-title');
    const playerPoints = document.getElementById('player-points');
    const playerDescription = document.getElementById('player-description');
    const pointsContainer = document.getElementById('points-container');

    // Gestion du type de joueur
    playerType.addEventListener('change', function() {
        pointsGroup.style.display = this.value === 'mvp' ? 'block' : 'none';
        if (this.value === 'mvp') {
            document.getElementById('player-points-input').setAttribute('required', '');
        } else {
            document.getElementById('player-points-input').removeAttribute('required');
        }
    });

    // Prévisualisation de l'image
    imageFileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            }
            reader.readAsDataURL(file);
        }
    });

    // Soumission du formulaire
    playerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupération des données
        const name = document.getElementById('player-name-input').value;
        const description = document.getElementById('player-description-input').value;
        const type = playerType.value;
        const points = document.getElementById('player-points-input').value;
        const file = imageFileInput.files[0];

        // Mise à jour de l'affichage
        playerName.textContent = name;
        playerDescription.textContent = description;
        playerTitle.textContent = type === 'mvp' ? 'MVP' : 'Meilleur Plaideur';
        
        if (type === 'mvp') {
            pointsContainer.style.display = 'block';
            playerPoints.textContent = `${points} points`;
        } else {
            pointsContainer.style.display = 'none';
        }

        // Chargement de l'image
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                playerImage.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }

        // Masquer le formulaire
        formOverlay.style.display = 'none';
    });
});