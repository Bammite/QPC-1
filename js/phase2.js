
document.querySelectorAll('.hexagon').forEach((hexagon) => {
    hexagon.addEventListener('click', function() {
        
        // Sélectionner le <rect> dans l'hexagone cliqué
        const rect = this.querySelector('rect');

        // Tu peux maintenant manipuler le <rect>, par exemple, changer sa couleur
        if (rect) {
            rect.setAttribute('fill', 'yellow'); // Change la couleur du fond à jaune
        }

        const currentScore = parseInt(document.querySelector('.score').textContent.split(': ')[1]);
        const hexagonScore = parseInt(this.querySelector('text').textContent);

        // Mettre à jour le score si le score du polygone est supérieur au score actuel
        if (hexagonScore > currentScore) {
            document.querySelector('.score').textContent = 'Score atteint: ' + hexagonScore;
        }

        // Retirer la classe 'selected' des autres polygones
        document.querySelectorAll('.hexagon').forEach(hex => {
            hex.classList.remove('selected');
        });

        // Ajouter la classe 'selected' à l'hexagone cliqué
        this.classList.add('selected');
    });
});

let timeRemaining = 60;   // Temps restant en secondes
let timerInterval;        // Référence à l'intervalle pour le compte à rebours
let isPaused = true;      // Indicateur si le timer est en pause
let hasStarted = false;   // Indicateur si le timer a déjà démarré

// Fonction pour formater le temps en minutes:secondes
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const secondsFormatted = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
    return `${minutes}:${secondsFormatted}`;
}

// Fonction pour démarrer ou reprendre le compte à rebours
function startTimer() {
    timerInterval = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            if(timeRemaining===10){
                document.querySelector('.timer').style.color='red'
            }
            document.querySelector('.timer').textContent = formatTime(timeRemaining);
        } else {
            clearInterval(timerInterval);  // Arrêter le compte à rebours à 0
        }
    }, 1000);
}

// Gestion du clic sur le timer pour démarrer/mettre en pause
document.querySelector('.timer').addEventListener('click', function() {
    if (!hasStarted) {
        // Démarrer le compte à rebours au premier clic
        startTimer();
        isPaused = false;
        hasStarted = true;
    } else if (isPaused) {
        // Reprendre le compte à rebours
        startTimer();
        isPaused = false;
    } else {
        // Mettre en pause le compte à rebours
        clearInterval(timerInterval);
        isPaused = true;
    }
});

// Initialiser l'affichage du temps sans démarrer le timer
document.querySelector('.timer').textContent = formatTime(timeRemaining);


document.querySelector('.score').addEventListener('click', function() {
    document.querySelector('.score').textContent = 'Score atteint: 0';
    
    
});



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////






// //phase.js pour le recepteur
// const socket = io();
// const allusersHtml = document.getElementById("camsDispo1");
// const localVideo = document.getElementById("localVideo");
// const video1 = document.getElementById("cam1");
// let currentUserId = null;
// let creerUser=0;
// let localStream= null;
// const tabrecepteur=["recepteur1","recepteur2","recepteur3","recepteur4"]
// const camsDispo=[allusersHtml];
// const btn1=document.getElementById('btnCam1');
// /////////////////////////////////////////select Box////////////////////////////////////

// // box1

// document.getElementById('btnCam1').addEventListener('click', function() {
//     document.getElementById('modal').style.display = 'flex';
    
// });

// document.querySelector('.close-button').addEventListener('click', function() {
//     document.getElementById('modal').style.display = 'none';
    
// });

// window.addEventListener('click', function(event) {
//     if (event.target == document.getElementById('modal')) {
//         document.getElementById('modal').style.display = 'none';
//     }
// });

// //box2


// ///////////////////////////////////////////////////////score/////////////////////////////////////////////


// /////////////////////////////////////////////////////////////different peer connetion//////////////////////


// const PeerConnection = (function(){
//     let peerConnection;
//     // alert('initialisation P');
//     const createPeerConnection = () => {
//         // alert('initialisation P1');
//         const config = {
//             iceServers: [
//                 {
//                     urls: 'stun:stun.l.google.com:19302'
//                 }
//             ]
//         };
//         // alert('initialisation P2');
//         peerConnection = new RTCPeerConnection(config);

//         // add local stream to peer connection
//         localStream.getTracks().forEach(track => {
//             peerConnection.addTrack(track, localStream);
//         })
//         // listen to remote stream and add to peer connection
//         // alert('initialisation P3');
//         peerConnection.ontrack = function(event) {
//             // alert('initialisation P3:1');
//             video1.srcObject = event.streams[0];
//         }
//         // listen for ice candidate
//         // alert('initialisation p4');
//         peerConnection.onicecandidate = function(event) {
//             if(event.candidate) {
//                 // alert('initialisation p4:1');
//                 socket.emit("icecandidate", event.candidate);
//             }
//         }
//         // alert('initialisation P5');
//         return peerConnection;
//     }

//     return {
//         getInstance: () => {
//             if(!peerConnection){
//                 peerConnection = createPeerConnection();
//             }
//             // alert('initialisation P6');
//             return peerConnection;
//         }
//     }
// })();





// ////////////////////////////////////////////////////////////differantes fonctions socket///////////////////////////////////////////////////////////

// socket.on("offer", async ({from, to, offer}) => {



//     // alert('initialisation B');
//     const pc = PeerConnection.getInstance();
//     // set remote description

//     await pc.setRemoteDescription(offer);
//     const answer = await pc.createAnswer();
//     await pc.setLocalDescription(answer);
    
//     socket.emit("answer", {from, to, answer: pc.localDescription});
//     // alert('Fin initialisation B');
//     caller = [from, to];
// });


// socket.on("answer", async ({from, to, answer}) => {
//     // alert('initialisation A');
//     const pc = PeerConnection.getInstance();
//     console.log(answer);
//     await pc.setRemoteDescription(answer);
//     // show end call button
//     // endCallBtn.style.display = 'block';
//     // alert('transmition initialisé');
//     socket.emit("end-call", {from, to});
//     // alert('Fin initialisation A');
//     caller = [from, to];
// });



// socket.on("icecandidate", async candidate => {
//     // alert('initialisation I');
//     console.log({ candidate });
//     const pc = PeerConnection.getInstance();
//     await pc.addIceCandidate(new RTCIceCandidate(candidate));
//     // alert('initialisation Fin procesuse I');
// });



// //cam2

// /////////////////////////////// Fonction pour créer l'affichage des utilisateurs ////////////////////////
// const createUsersHtml = (allusers) => {
    
//     for (let i=0; i<1; i++) {
//         camsDispo[i].innerHTML="";
//         for(const user in allusers) {
//             if (tabrecepteur.includes(user)) {
                
//             }
//             else{
//                 const li = document.createElement("button");

//             li.textContent = `${user}`;
//             const button = document.createElement("button");
//             button.classList.add("call-btn");
//             button.addEventListener("click", (e) => {
//                 startTransmision(user,i);
//             });
//             li.appendChild(button);
//             camsDispo[i].appendChild(li);
//             }
            
//         }
//     }

// }

// // Écoute l'événement "joined" dès la connexion au serveur
// socket.on("joined", (allusers) => {
//     console.log({ allusers });
//     createUsersHtml(allusers);
// });



// const startTransmision= async (user,box) =>{
//     switch (box) {
//         case 0:
//             console.log("lancement de la transmision avec:", { user })
//             const pc = PeerConnection.getInstance();
           
//             const offer = await pc.createOffer();
//             console.log({ offer })
//             await pc.setLocalDescription(offer);
//             console.log("etape 1");
//             socket.emit("offer", {from: "recepteur1", to: user, offer: pc.localDescription});
//             console.log(pc.localDescription);
//             btn1.innerHTML="";
//             btn1.textContent=`${user}`;
//             break;
//         case 1:
//             console.log("lancement de la transmision avec:", { user })
//             const pc2 = PeerConnection2.getInstance();
//             const offer2 = await pc2.createOffer();
//             console.log({ offer2 })
//             await pc2.setLocalDescription(offer2);
//             console.log("etape 2");
//             socket.emit("offer2", {from: "recepteur2", to: user, offer: pc2.localDescription});
//             console.log(pc2.localDescription);
//             btn2.innerHTML="";
//             btn2.textContent=`${user}`;
//             break;
//         case 2:
//             const pc3 = PeerConnection3.getInstance();
//             const offer3 = await pc3.createOffer();
//             console.log({ offer3 })
//             await pc3.setLocalDescription(offer3);
//             console.log("etape 3");
//             socket.emit("offer3", {from: "recepteur3", to: user, offer: pc3.localDescription});
//             console.log(pc3.localDescription);
//             btn3.innerHTML="";
//             btn3.textContent=`${user}`;
//             break;
//         case 3:
//             const pc4 = PeerConnection4.getInstance();
//             const offer4 = await pc4.createOffer();
//             console.log({ offer4 })
//             await pc4.setLocalDescription(offer4);
//             console.log("etape 4");
//             socket.emit("offer4", {from: "recepteur4", to: user, offer: pc4.localDescription});
//             console.log(pc4.localDescription);
//             btn4.innerHTML="";
//             btn4.textContent=`${user}`;
//             break;
//         default:
//             break;
//     }
    
// };



// const Recepter=async ()=>{
//     if (creerUser===0){
//         try {
//             console.log("MAAAAAADE");
//             socket.emit("join-user", "recepteur1");
//         } catch(error) {
//             console.error('Erreur lors de l\'accès aux périphériques :', error);
//         }
//     }
// }

// Recepter();


// const startMyVideo = async () => {
//     try {
//         const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
//         localStream = stream;
//     } catch(error) {}
// }

// startMyVideo();

