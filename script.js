// Initialisation des scores
let scores = {
    team1: 0,
    team2: 0,
  };
  
  // Mise à jour des scores
  function changeScore(team, value) {
    scores[team] += value;
    document.getElementById(`${team}Score`).textContent = scores[team];
  }
  
  // Gestion de la fenêtre modale
  document.getElementById('startButton').addEventListener('click', () => {
    const team1Name = document.getElementById('team1').value || 'Doctorants I';
    const team2Name = document.getElementById('team2').value || 'Master II';
  
    document.getElementById('team1Name').textContent = team1Name;
    document.getElementById('team2Name').textContent = team2Name;
  
    document.getElementById('modal').style.display = 'none';
  });
  
  // Changer la question (exemple de simulation)
  function nextQuestion() {
    const questions = [
      "Quelle est la première capitale du Mexique ?",
      "Qui a écrit Les Misérables ?",
      "Quelle est la formule chimique de l'eau ?",
      "Quelle est la formule chimique de l'eaXaxau ?",
      "Quelle est la formule chimique deaasaS Quelle est la formule chimique deaasaS l'eau ?",
    ];
    const randomIndex = Math.floor(Math.random() * questions.length);
    document.getElementById('question').textContent = questions[randomIndex];
  }