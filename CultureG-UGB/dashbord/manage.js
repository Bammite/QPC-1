document.addEventListener('DOMContentLoaded', () => {
    // Sélection des éléments
    const buttons = document.querySelectorAll('.option');
    const sections = document.querySelectorAll('.section');
    const backButton = document.getElementById('backButton');
    const sectionBouton = document.querySelector('.sectionBouton');

    // Gestion de la navigation
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-target');
            showSection(target);
        });
    });

    backButton.addEventListener('click', () => {
        hideAllSections();
        sectionBouton.style.display = 'flex';
        backButton.style.display = 'none';
    });

    // Fonction pour afficher une section
    function showSection(sectionId) {
        hideAllSections();
        const section = document.getElementById(sectionId);
        section.classList.add('active');
        
        // Réinitialiser le formulaire et l'affichage
        const form = section.querySelector('form');
        const display = section.querySelector('.display-section');
        if (form && display) {
            form.style.display = 'block';
            form.reset();
            display.innerHTML = '';
        }
        
        sectionBouton.style.display = 'none';
        backButton.style.display = 'block';
    }

    function hideAllSections() {
        sections.forEach(section => section.classList.remove('active'));
    }

    // Gestion du Mode Solo
    const soloForm = document.getElementById('soloForm');
    const soloDisplay = document.getElementById('soloDisplay');
    let soloTimer;

    // Modifier les gestionnaires de formulaires
    function handleFormSubmit(form, displaySection, callback) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.style.display = 'none'; // Cacher le formulaire après soumission
            callback(e);
        });
    }

    handleFormSubmit(soloForm, soloDisplay, (e) => {
        const photo = document.getElementById('soloPhoto').files[0];
        const problematique = document.getElementById('soloProblematique').value;
        const temps = document.getElementById('soloTemps').value;

        startSoloMode(photo, problematique, temps);
    });

    function startSoloMode(photo, problematique, temps) {
        const reader = new FileReader();
        reader.onload = (e) => {
            soloDisplay.innerHTML = `
                <div class="participant-display">
                    <img src="${e.target.result}" alt="Participant">
                    <h3>Problématique:</h3>
                    <p>${problematique}</p>
                    <div class="timer">Temps restant: ${temps}:00</div>
                </div>
            `;
            startTimer(temps * 60, soloDisplay.querySelector('.timer'));
        };
        reader.readAsDataURL(photo);
    }

    // Gestion du Mode Affrontement
    const affrontementForm = document.getElementById('affrontementForm');
    const participantsContainer = document.getElementById('participantsContainer');
    const affrontementDisplay = document.getElementById('affrontementDisplay');

    document.getElementById('nbParticipants').addEventListener('change', (e) => {
        const count = e.target.value;
        generateParticipantFields(count);
    });

    function generateParticipantFields(count) {
        participantsContainer.innerHTML = '';
        for (let i = 1; i <= count; i++) {
            participantsContainer.innerHTML += `
                <div class="form-group">
                    <h3>Participant ${i}</h3>
                    <label for="participant${i}Name">Nom</label>
                    <input type="text" id="participant${i}Name" required>
                    <label for="participant${i}Photo">Photo</label>
                    <input type="file" id="participant${i}Photo" accept="image/*" required>
                </div>
            `;
        }
    }

    // Gestion de la Présentation Candidat
    const presentationForm = document.getElementById('presentationForm');
    const presentationDisplay = document.getElementById('presentationDisplay');
    let currentPhotoIndex = 0;
    let photos = [];

    handleFormSubmit(presentationForm, presentationDisplay, (e) => {
        const name = document.getElementById('candidatName').value;
        const description = document.getElementById('candidatDesc').value;
        const photoFiles = document.getElementById('candidatPhotos').files;
        
        startPresentation(name, description, photoFiles);
    });

    function startPresentation(name, description, photoFiles) {
        photos = Array.from(photoFiles);
        let currentIndex = 0;

        function showNextPhoto() {
            if (photos.length === 0) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                presentationDisplay.innerHTML = `
                    <div class="presentation-container">
                        <h3>${name}</h3>
                        <img src="${e.target.result}" alt="Candidat">
                        <p>${description}</p>
                        <div class="controls">
                            <button onclick="previousPhoto()">Précédent</button>
                            <button onclick="nextPhoto()">Suivant</button>
                        </div>
                    </div>
                `;
            };
            reader.readAsDataURL(photos[currentIndex]);
        }

        window.nextPhoto = () => {
            currentIndex = (currentIndex + 1) % photos.length;
            showNextPhoto();
        };

        window.previousPhoto = () => {
            currentIndex = (currentIndex - 1 + photos.length) % photos.length;
            showNextPhoto();
        };

        showNextPhoto();
    }

    // Gestion du Jury
    const juryForm = document.getElementById('juryForm');
    const juryDisplay = document.getElementById('juryDisplay');

    handleFormSubmit(juryForm, juryDisplay, (e) => {
        const nomJury = document.getElementById('nomJury').value;
        const photoJury = document.getElementById('photoJury').files[0];

        const reader = new FileReader();
        reader.onload = (e) => {
            juryDisplay.innerHTML = `
                <div class="jury-display">
                    <img src="${e.target.result}" alt="Membre du Jury">
                    <h3>${nomJury}</h3>
                </div>
            `;
        };
        reader.readAsDataURL(photoJury);
    });

    // Utilitaire pour le timer
    function startTimer(duration, display) {
        let timer = duration;
        const countdown = setInterval(() => {
            const minutes = parseInt(timer / 60, 10);
            const seconds = parseInt(timer % 60, 10);

            display.textContent = `Temps restant: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            if (--timer < 0) {
                clearInterval(countdown);
                display.textContent = 'Temps écoulé!';
                display.style.color = 'red';
            }
        }, 1000);

        return countdown;
    }

    // Gestion améliorée du Mode Affrontement
    handleFormSubmit(affrontementForm, affrontementDisplay, (e) => {
        const nbParticipants = document.getElementById('nbParticipants').value;
        const pointsParQuestion = document.getElementById('pointsParQuestion').value;
        const participants = [];

        for (let i = 1; i <= nbParticipants; i++) {
            participants.push({
                name: document.getElementById(`participant${i}Name`).value,
                photo: document.getElementById(`participant${i}Photo`).files[0],
                score: 0
            });
        }

        startAffrontement(participants, pointsParQuestion);
    });

    function startAffrontement(participants, pointsParQuestion) {
        const scoresContainer = affrontementDisplay.querySelector('.scores-container');
        scoresContainer.innerHTML = participants.map(p => `
            <div class="participant-score">
                <h3>${p.name}</h3>
                <p class="score">Score: ${p.score}</p>
                <button onclick="addPoints('${p.name}', ${pointsParQuestion})">+${pointsParQuestion}</button>
                <button onclick="removePoints('${p.name}', ${pointsParQuestion})">-${pointsParQuestion}</button>
            </div>
        `).join('');

        window.addPoints = (name, points) => {
            const participant = participants.find(p => p.name === name);
            participant.score += parseInt(points);
            updateScores();
        };

        window.removePoints = (name, points) => {
            const participant = participants.find(p => p.name === name);
            participant.score = Math.max(0, participant.score - parseInt(points));
            updateScores();
        };

        function updateScores() {
            const scoreElements = scoresContainer.querySelectorAll('.score');
            participants.forEach((p, i) => {
                scoreElements[i].textContent = `Score: ${p.score}`;
            });
        }
    }

    // Gestion du Jury
    document.getElementById('nbJury').addEventListener('change', (e) => {
        const count = e.target.value;
        generateJuryFields(count);
    });

    function generateJuryFields(count) {
        const container = document.getElementById('juryMembersContainer');
        container.innerHTML = '';
        for (let i = 1; i <= count; i++) {
            container.innerHTML += `
                <div class="form-group jury-member">
                    <h3>Membre ${i}</h3>
                    <label for="jury${i}Name">Nom</label>
                    <input type="text" id="jury${i}Name" required>
                    <label for="jury${i}Photo">Photo</label>
                    <input type="file" id="jury${i}Photo" accept="image/*" required>
                    <label for="jury${i}Description">Description</label>
                    <textarea id="jury${i}Description" required></textarea>
                </div>
            `;
        }
    }

    handleFormSubmit(document.getElementById('juryForm'), document.getElementById('juryDisplay'), (e) => {
        const nbJury = document.getElementById('nbJury').value;
        const juryMembers = [];
        
        for (let i = 1; i <= nbJury; i++) {
            juryMembers.push({
                name: document.getElementById(`jury${i}Name`).value,
                photo: document.getElementById(`jury${i}Photo`).files[0],
                description: document.getElementById(`jury${i}Description`).value
            });
        }
        
        startJuryPresentation(juryMembers);
    });

    function startJuryPresentation(members) {
        let currentIndex = 0;
        const juryDisplay = document.getElementById('juryDisplay');

        function showJuryMember() {
            const member = members[currentIndex];
            const reader = new FileReader();
            reader.onload = (e) => {
                juryDisplay.innerHTML = `
                    <div class="jury-member-display">
                        <img src="${e.target.result}" alt="Membre du jury">
                        <h3>${member.name}</h3>
                        <p>${member.description}</p>
                        <div class="controls">
                            <button onclick="previousJury()">Précédent</button>
                            <button onclick="nextJury()">Suivant</button>
                        </div>
                    </div>
                `;
            };
            reader.readAsDataURL(member.photo);
        }

        window.nextJury = () => {
            currentIndex = (currentIndex + 1) % members.length;
            showJuryMember();
        };

        window.previousJury = () => {
            currentIndex = (currentIndex - 1 + members.length) % members.length;
            showJuryMember();
        };

        showJuryMember();
    }

    // Gestion du Podium
    handleFormSubmit(document.getElementById('podiumForm'), document.getElementById('podiumDisplay'), (e) => {
        const winners = [
            {
                place: 1,
                name: document.getElementById('firstPlace').value,
                photo: document.getElementById('firstPlacePhoto').files[0]
            },
            {
                place: 2,
                name: document.getElementById('secondPlace').value,
                photo: document.getElementById('secondPlacePhoto').files[0]
            },
            {
                place: 3,
                name: document.getElementById('thirdPlace').value,
                photo: document.getElementById('thirdPlacePhoto').files[0]
            }
        ];

        displayPodium(winners);
    });

    function displayPodium(winners) {
        const podiumDisplay = document.getElementById('podiumDisplay');
        const positions = ['second', 'first', 'third'];
        
        Promise.all(winners.map(winner => 
            new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve({
                    ...winner,
                    photoUrl: e.target.result
                });
                reader.readAsDataURL(winner.photo);
            })
        )).then(winnersWithPhotos => {
            podiumDisplay.innerHTML = `
                <div class="podium">
                    ${positions.map((pos, i) => `
                        <div class="podium-place ${pos}">
                            <img src="${winnersWithPhotos[i].photoUrl}" alt="${winnersWithPhotos[i].name}">
                            <div class="winner-name">${winnersWithPhotos[i].name}</div>
                            <div class="place">${i + 1}</div>
                        </div>
                    `).join('')}
                </div>
            `;
        });
    }
});