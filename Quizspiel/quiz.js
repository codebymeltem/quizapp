// Globale Variablen nur einmal deklarieren
let questions = [];
let canProceedToNext = false;
const timerBar = document.querySelector('.timer-bar');
let currentQuestion = 0;

// Fragen laden
async function loadQuestions() {
    try {
        console.log('Starte Laden der Fragen...');
        const response = await fetch('./religion-questions.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Geladene Daten:', data);
        questions = data.questions;
        showQuestion(currentQuestion);
    } catch (error) {
        console.error('Fehler beim Laden der Fragen:', error);
    }
}

function showQuestion(index) {
    const question = questions[index];
    console.log('Zeige Frage:', question);
    
    const questionText = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers-container');
    
    
    const questionDiv = document.createElement('div');
    questionDiv.style.width = '100%';
    questionDiv.style.textAlign = 'center';
    questionDiv.textContent = question.frage;
    
    
    questionText.innerHTML = '';
    questionText.appendChild(questionDiv);
    
    answersContainer.innerHTML = '';
    
    question.antworten.forEach(answer => {
        const button = document.createElement('button');
        button.className = 'answer-button';
        button.textContent = answer;
        answersContainer.appendChild(button);
    });

    addButtonListeners();
    resetTimer();
}

function addButtonListeners() {
    const buttons = document.querySelectorAll('.answer-button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            timerBar.style.animationPlayState = 'paused';
            
            buttons.forEach(btn => {
                btn.classList.remove('correct', 'incorrect');
            });

            if (this.textContent === questions[currentQuestion].richtigeAntwort) {
                this.classList.add('correct');
            } else {
                this.classList.add('incorrect');
                buttons.forEach(btn => {
                    if (btn.textContent === questions[currentQuestion].richtigeAntwort) {
                        btn.classList.add('correct');
                    }
                });
            }

            canProceedToNext = true;
        });
    });
}

function resetTimer() {
    timerBar.style.animation = 'none';
    timerBar.offsetHeight; // Trigger reflow
    timerBar.style.animation = 'countdown 12s linear forwards';
    timerBar.style.animationPlayState = 'running';
}

// Quiz starten
loadQuestions();