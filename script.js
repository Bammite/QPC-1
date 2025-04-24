
    // Game state
    const gameState = {
      teams: [],
      scores: {},
      currentQuestion: 0,
      pointValue: 1,
      timerEnabled: false,
      timerDuration: 5,
      timerInterval: null,
      timeRemaining: 0,
      questions: [
        "Quelle est la première capitale du Mexique ?",
        "Qui a écrit Les Misérables ?",
        "Quelle est la formule chimique de l'eau ?",
        "Quel est le plus grand océan du monde ?",
        "Quelle est la capitale de l'Australie ?",
        "Qui a peint la Joconde ?",
        "Quel est le symbole chimique de l'or ?",
        "Combien de continents y a-t-il sur Terre ?",
        "Quelle est la plus longue rivière d'Afrique ?",
        "Qui a découvert la pénicilline ?"
      ]
    };

    // DOM Elements
    const teamsContainer = document.getElementById('teamsContainer');
    const teamInputs = document.getElementById('teamInputs');
    const teamCountSelect = document.getElementById('teamCount');
    const settingsModal = document.getElementById('settingsModal');
    const settingsBtn = document.getElementById('settingsBtn');
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    const questionElement = document.getElementById('question');
    const pointValueInput = document.getElementById('pointValue');
    const enableTimerCheckbox = document.getElementById('enableTimer');
    const timerSettings = document.getElementById('timerSettings');
    const timerDurationInput = document.getElementById('timerDuration');
    const timerContainer = document.getElementById('timerContainer');
    const timerDisplay = document.getElementById('timerDisplay');
    const timerBtn = document.getElementById('timerBtn');
    const stopTimerBtn = document.getElementById('stopTimerBtn');
    const resetBtn = document.getElementById('resetBtn');

    // Initialize the game
    function initGame() {
      renderTeams();
      updateQuestion();
      
      // Load questions from localStorage if available
      const savedQuestions = localStorage.getItem('quizQuestions');
      if (savedQuestions) {
        try {
          gameState.questions = JSON.parse(savedQuestions);
        } catch (e) {
          console.error("Failed to parse saved questions", e);
        }
      }
    }

    // Render teams based on current count
    function renderTeams() {
      teamsContainer.innerHTML = '';
      
      for (let i = 0; i < gameState.teams.length; i++) {
        const team = gameState.teams[i];
        const score = gameState.scores[team.id] || 0;
        
        const teamCard = document.createElement('div');
        teamCard.className = 'team-card';
        teamCard.innerHTML = `
          <div class="team-name" id="name-${team.id}">${team.name}</div>
          <div class="score-display" id="score-${team.id}">${score}</div>
          <div class="score-controls">
            <button class="score-btn minus" onclick="changeScore('${team.id}', -1)">-</button>
            <button class="score-btn" onclick="changeScore('${team.id}', 1)">+</button>
          </div>
        `;
        
        teamsContainer.appendChild(teamCard);
      }
    }

    // Change score for a team
    function changeScore(teamId, change) {
      const actualChange = change * gameState.pointValue;
      gameState.scores[teamId] = (gameState.scores[teamId] || 0) + actualChange;
      document.getElementById(`score-${teamId}`).textContent = gameState.scores[teamId];
    }

    // Update to next question
    function nextQuestion() {
      gameState.currentQuestion = (gameState.currentQuestion + 1) % gameState.questions.length;
      updateQuestion();
    }

    // Update question display
    function updateQuestion() {
      questionElement.textContent = gameState.questions[gameState.currentQuestion];
    }

    // Show settings modal
    function showSettings() {
      // Update team inputs based on selected count
      updateTeamInputs();
      settingsModal.style.display = 'flex';
    }

    // Update team inputs when count changes
    function updateTeamInputs() {
      const count = parseInt(teamCountSelect.value);
      teamInputs.innerHTML = '';
      
      for (let i = 1; i <= count; i++) {
        const teamName = gameState.teams[i-1]?.name || '';
        const div = document.createElement('div');
        div.className = 'input-group';
        div.innerHTML = `
          <label for="team${i}">Équipe ${i}:</label>
          <input type="text" id="team${i}" placeholder="Nom de l'équipe ${i}" value="${teamName}">
        `;
        teamInputs.appendChild(div);
      }
    }

    // Save settings
    function saveSettings() {
      const count = parseInt(teamCountSelect.value);
      gameState.teams = [];
      gameState.scores = {};
      
      for (let i = 1; i <= count; i++) {
        const teamName = document.getElementById(`team${i}`).value || `Équipe ${i}`;
        gameState.teams.push({ id: `team${i}`, name: teamName });
        gameState.scores[`team${i}`] = 0;
      }
      
      gameState.pointValue = parseInt(pointValueInput.value) || 1;
      gameState.timerEnabled = enableTimerCheckbox.checked;
      gameState.timerDuration = parseInt(timerDurationInput.value) || 5;
      
      renderTeams();
      settingsModal.style.display = 'none';
      nextQuestionBtn.disabled = false;
    }

    // Start timer
    function startTimer() {
      if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
      }
      
      gameState.timeRemaining = gameState.timerDuration * 60;
      timerContainer.style.display = 'block';
      updateTimerDisplay();
      
      gameState.timerInterval = setInterval(() => {
        gameState.timeRemaining--;
        updateTimerDisplay();
        
        if (gameState.timeRemaining <= 0) {
          clearInterval(gameState.timerInterval);
          alert("Le temps est écoulé !");
        }
      }, 1000);
    }

    // Stop timer
    function stopTimer() {
      if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
      }
      timerContainer.style.display = 'none';
    }

    // Update timer display
    function updateTimerDisplay() {
      const minutes = Math.floor(gameState.timeRemaining / 60);
      const seconds = gameState.timeRemaining % 60;
      timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Reset game
    function resetGame() {
      if (confirm("Voulez-vous vraiment réinitialiser les scores ?")) {
        for (const teamId in gameState.scores) {
          gameState.scores[teamId] = 0;
        }
        renderTeams();
        gameState.currentQuestion = 0;
        updateQuestion();
        
        if (gameState.timerInterval) {
          clearInterval(gameState.timerInterval);
          gameState.timerInterval = null;
        }
        timerContainer.style.display = 'none';
      }
    }

    // Event listeners
    teamCountSelect.addEventListener('change', updateTeamInputs);
    settingsBtn.addEventListener('click', showSettings);
    saveSettingsBtn.addEventListener('click', saveSettings);
    nextQuestionBtn.addEventListener('click', nextQuestion);
    enableTimerCheckbox.addEventListener('change', function() {
      timerSettings.style.display = this.checked ? 'block' : 'none';
    });
    timerBtn.addEventListener('click', startTimer);
    stopTimerBtn.addEventListener('click', stopTimer);
    resetBtn.addEventListener('click', resetGame);

    // Initialize the game when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
      // Set default teams
      gameState.teams = [
        { id: 'team1', name: 'Équipe 1' },
        { id: 'team2', name: 'Équipe 2' }
      ];
      gameState.scores = {
        team1: 0,
        team2: 0
      };
      
      initGame();
      showSettings(); // Show settings modal first
    });

    // Allow adding custom questions from console for debugging
    window.addQuestion = function(question) {
      gameState.questions.push(question);
      localStorage.setItem('quizQuestions', JSON.stringify(gameState.questions));
      console.log(`Question added: "${question}"`);
    };
  