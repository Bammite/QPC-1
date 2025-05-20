document.addEventListener('DOMContentLoaded', function() {
    // Récupérer l'ID de l'événement depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');

    // Base de données des événements
    const events = {
        'qpc': {
            title: 'Question pour un champion UGB',
            date: '15 Mai 2024',
            location: 'Amphi A - UGB',
            mainMedia: {
                type: 'image',
                url: '../assets/quesitionpourChampion.jpg'
            },
            gallery: [
                '../assets/final.jpg',
                '../assets/DSC_0032.jpg',
                '../assets/IMG_1692.jpg'
            ],
            description: `
                <h2>Une compétition intellectuelle exceptionnelle</h2>
                <p>La finale de Question pour un champion UGB a réuni 32 équipes dans une compétition intense et passionnante. Cette édition a marqué les esprits par son niveau exceptionnellement élevé et l'enthousiasme des participants.</p>
                
                <h3>Déroulement de la compétition</h3>
                <p>La compétition s'est déroulée en plusieurs phases :</p>
                <ul>
                    <li>Phase de groupes avec 8 poules de 4 équipes</li>
                    <li>Huitièmes de finale à élimination directe</li>
                    <li>Quarts de finale intenses</li>
                    <li>Demi-finales spectaculaires</li>
                    <li>Une finale mémorable</li>
                </ul>

                <h3>Les moments forts</h3>
                <p>La soirée a été marquée par des moments particulièrement intenses, notamment lors des face-à-face décisifs et des questions de rapidité qui ont tenu le public en haleine.</p>
                
                <h3>Impact et perspectives</h3>
                <p>Cet événement a démontré une fois de plus l'importance de la culture générale dans notre université et a renforcé les liens entre les différentes facultés participantes.</p>`
        },
        'langaa': {
            title: 'LANGAA BURI - Première édition',
            date: '20 Avril 2024',
            location: 'Campus UGB',
            mainMedia: {
                type: 'image',
                url: '../assets/course.jpeg'
            },
            gallery: [
                // Ajouter les chemins des images de la galerie
            ],
            description: `
                <h2>LANGAA BURI : Une célébration de la culture et du sport</h2>
                <p>La première édition du LANGAA BURI a été un véritable succès, mêlant activités sportives et culturelles dans une ambiance festive et conviviale.</p>
                
                // Ajouter plus de contenu détaillé...`
        },
        // Ajouter d'autres événements...
    };

    // Afficher les détails de l'événement
    function displayEvent(eventData) {
        document.getElementById('event-title').textContent = eventData.title;
        document.getElementById('event-date').innerHTML = `<i class="far fa-calendar"></i> ${eventData.date}`;
        document.getElementById('event-location').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${eventData.location}`;

        // Afficher le média principal
        const mainMediaContainer = document.getElementById('main-media');
        if (eventData.mainMedia.type === 'video') {
            mainMediaContainer.innerHTML = `
                <video controls>
                    <source src="${eventData.mainMedia.url}" type="video/mp4">
                    Votre navigateur ne supporte pas la lecture de vidéos.
                </video>`;
        } else {
            mainMediaContainer.innerHTML = `<img src="${eventData.mainMedia.url}" alt="${eventData.title}">`;
        }

        // Afficher la galerie
        const galleryContainer = document.getElementById('media-gallery');
        galleryContainer.innerHTML = eventData.gallery.map(img => `
            <div class="gallery-item">
                <img src="${img}" alt="Image de l'événement" onclick="showFullscreen(this.src)">
            </div>
        `).join('');

        // Afficher la description
        document.getElementById('event-description').innerHTML = eventData.description;
    }

    // Si un ID d'événement est fourni, afficher les détails correspondants
    if (eventId && events[eventId]) {
        displayEvent(events[eventId]);
    } else {
        // Rediriger vers la page d'accueil si l'événement n'existe pas
        window.location.href = '../index.html';
    }
});

// Fonction pour afficher une image en plein écran
function showFullscreen(src) {
    const overlay = document.createElement('div');
    overlay.className = 'fullscreen-overlay';
    overlay.innerHTML = `
        <img src="${src}" alt="Image en plein écran">
        <button class="close-btn">&times;</button>
    `;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target.className === 'close-btn') {
            overlay.remove();
        }
    });
}