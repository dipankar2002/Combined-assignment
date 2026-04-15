// Flashcard Data
const flashcardData = {
    capitals: [
        { question: "What is the capital of France?", answer: "Paris" },
        { question: "What is the capital of Japan?", answer: "Tokyo" },
        { question: "What is the capital of Australia?", answer: "Canberra" },
        { question: "What is the capital of Brazil?", answer: "Brasília" },
        { question: "What is the capital of Canada?", answer: "Ottawa" },
        { question: "What is the capital of Germany?", answer: "Berlin" },
        { question: "What is the capital of India?", answer: "New Delhi" },
        { question: "What is the capital of Mexico?", answer: "Mexico City" },
        { question: "What is the capital of Egypt?", answer: "Cairo" },
        { question: "What is the capital of South Africa?", answer: "Pretoria" },
        { question: "What is the capital of Russia?", answer: "Moscow" },
        { question: "What is the capital of Thailand?", answer: "Bangkok" },
        { question: "What is the capital of Greece?", answer: "Athens" },
        { question: "What is the capital of Sweden?", answer: "Stockholm" },
        { question: "What is the capital of Portugal?", answer: "Lisbon" },
        { question: "What is the capital of Netherlands?", answer: "Amsterdam" },
        { question: "What is the capital of Norway?", answer: "Oslo" },
        { question: "What is the capital of Switzerland?", answer: "Bern" },
        { question: "What is the capital of Belgium?", answer: "Brussels" },
        { question: "What is the capital of Spain?", answer: "Madrid" }
    ],
    math: [
        { question: "What is 15 + 27?", answer: "42" },
        { question: "What is 100 - 45?", answer: "55" },
        { question: "What is 12 × 8?", answer: "96" },
        { question: "What is 144 ÷ 12?", answer: "12" },
        { question: "What is the square root of 64?", answer: "8" },
        { question: "What is 5³?", answer: "125" },
        { question: "What is the next prime number after 19?", answer: "23" },
        { question: "What is 25% of 200?", answer: "50" },
        { question: "What is 7 × 9?", answer: "63" },
        { question: "What is the GCD of 24 and 36?", answer: "12" },
        { question: "What is 2⁹?", answer: "512" },
        { question: "What is 50 + 50 × 2?", answer: "150" },
        { question: "What is the area of a circle with radius 5?", answer: "78.5 or 25π" },
        { question: "What is 33⅓% of 90?", answer: "30" },
        { question: "What is 15² - 10²?", answer: "125" }
    ],
    science: [
        { question: "What is the chemical symbol for Gold?", answer: "Au" },
        { question: "How many bones are in the adult human body?", answer: "206" },
        { question: "What is the largest planet in our solar system?", answer: "Jupiter" },
        { question: "What is the speed of light?", answer: "299,792,458 m/s" },
        { question: "What gas do plants absorb from the atmosphere?", answer: "Carbon Dioxide (CO₂)" },
        { question: "What is the smallest unit of life?", answer: "Cell" },
        { question: "How many sides does a DNA helix have?", answer: "2" },
        { question: "What is the most abundant gas in Earth's atmosphere?", answer: "Nitrogen (N₂)" },
        { question: "What element has atomic number 1?", answer: "Hydrogen" },
        { question: "What is the process by which plants make food?", answer: "Photosynthesis" },
        { question: "How many chambers does a human heart have?", answer: "4" },
        { question: "What is the fastest land animal?", answer: "Cheetah" },
        { question: "What is the hardest natural substance on Earth?", answer: "Diamond" },
        { question: "How many planets are in our solar system?", answer: "8" },
        { question: "What does DNA stand for?", answer: "Deoxyribonucleic Acid" }
    ],
    history: [
        { question: "In what year did World War II end?", answer: "1945" },
        { question: "Who was the first President of the United States?", answer: "George Washington" },
        { question: "In what year did the Titanic sink?", answer: "1912" },
        { question: "Who invented the printing press?", answer: "Johannes Gutenberg" },
        { question: "In what year did the Berlin Wall fall?", answer: "1989" },
        { question: "Who was the first Emperor of Rome?", answer: "Augustus" },
        { question: "What civilization built the Pyramids?", answer: "Ancient Egypt" },
        { question: "In what year did Columbus reach America?", answer: "1492" },
        { question: "Who signed the Declaration of Independence?", answer: "56 delegates" },
        { question: "What year did the Industrial Revolution begin?", answer: "1760s" },
        { question: "Who was Napoleon Bonaparte?", answer: "French military leader and Emperor" },
        { question: "When did the Renaissance occur?", answer: "14th-17th century" },
        { question: "Who was the first human in space?", answer: "Yuri Gagarin" },
        { question: "What year was the internet created?", answer: "1989" },
        { question: "Who discovered penicillin?", answer: "Alexander Fleming" }
    ],
    languages: [
        { question: "How do you say 'thank you' in Spanish?", answer: "Gracias" },
        { question: "How do you say 'hello' in French?", answer: "Bonjour" },
        { question: "How do you say 'good morning' in German?", answer: "Guten Morgen" },
        { question: "How do you say 'I love you' in Italian?", answer: "Ti amo" },
        { question: "How do you say 'excuse me' in Portuguese?", answer: "Com licença" },
        { question: "How do you say 'yes' in Japanese?", answer: "Hai" },
        { question: "How do you say 'no' in Mandarin Chinese?", answer: "Bu (不) or Mei you (没有)" },
        { question: "How do you say 'please' in Korean?", answer: "Juseyo" },
        { question: "How do you say 'water' in Arabic?", answer: "Maaa" },
        { question: "How do you say 'goodbye' in Russian?", answer: "Do Svidaniya" },
        { question: "How do you say 'friend' in Dutch?", answer: "Vriend" },
        { question: "How do you say 'beautiful' in Swedish?", answer: "Vacker" },
        { question: "How do you say 'love' in Polish?", answer: "Milosc" },
        { question: "How do you say 'welcome' in Turkish?", answer: "Hoş geldiniz" },
        { question: "How do you say 'happy' in Thai?", answer: "Sawasdee" }
    ]
};

// App State
let appState = {
    selectedTopic: '',
    questionCount: 5,
    currentCardIndex: 0,
    cards: [],
    correctCount: 0,
    incorrectCount: 0,
    isFlipped: false
};

// DOM Elements
const setupScreen = document.getElementById('setupScreen');
const flashcardScreen = document.getElementById('flashcardScreen');
const resultsScreen = document.getElementById('resultsScreen');

const topicSelect = document.getElementById('topicSelect');
const questionCountInput = document.getElementById('questionCount');
const decreaseBtn = document.getElementById('decreaseBtn');
const increaseBtn = document.getElementById('increaseBtn');
const startBtn = document.getElementById('startBtn');
const quitBtn = document.getElementById('quitBtn');

const flashcard = document.getElementById('flashcard');
const questionText = document.getElementById('questionText');
const answerText = document.getElementById('answerText');
const correctBtn = document.getElementById('correctBtn');
const incorrectBtn = document.getElementById('incorrectBtn');

const currentCardSpan = document.getElementById('currentCard');
const totalCardsSpan = document.getElementById('totalCards');
const progressFill = document.getElementById('progressFill');

const finalScore = document.getElementById('finalScore');
const finalTotal = document.getElementById('finalTotal');
const scorePercentage = document.getElementById('scorePercentage');
const performanceMessage = document.getElementById('performanceMessage');
const correctCount = document.getElementById('correctCount');
const incorrectCount = document.getElementById('incorrectCount');

const retryBtn = document.getElementById('retryBtn');
const changeTopicBtn = document.getElementById('changeTopicBtn');

// Event Listeners - Setup Screen
decreaseBtn.addEventListener('click', () => {
    const count = parseInt(questionCountInput.value);
    if (count > 1) {
        questionCountInput.value = count - 1;
    }
});

increaseBtn.addEventListener('click', () => {
    const count = parseInt(questionCountInput.value);
    if (count < 20) {
        questionCountInput.value = count + 1;
    }
});

startBtn.addEventListener('click', startQuiz);

// Event Listeners - Flashcard Screen
flashcard.addEventListener('click', flipCard);
correctBtn.addEventListener('click', () => markAnswer(true));
incorrectBtn.addEventListener('click', () => markAnswer(false));
quitBtn.addEventListener('click', quitQuiz);

// Event Listeners - Results Screen
retryBtn.addEventListener('click', retryQuiz);
changeTopicBtn.addEventListener('click', changeTopicAndRetry);

// Functions
function startQuiz() {
    appState.selectedTopic = topicSelect.value;
    appState.questionCount = parseInt(questionCountInput.value);

    if (!appState.selectedTopic) {
        alert('Please select a topic!');
        return;
    }

    // Get shuffled cards
    const topicCards = flashcardData[appState.selectedTopic];
    appState.cards = shuffleArray([...topicCards]).slice(0, appState.questionCount);
    
    // Reset state
    appState.currentCardIndex = 0;
    appState.correctCount = 0;
    appState.incorrectCount = 0;
    appState.isFlipped = false;

    // Update UI
    totalCardsSpan.textContent = appState.questionCount;
    updateProgressBar();
    displayCard();

    // Switch screen
    switchScreen('flashcard');
}

function displayCard() {
    const card = appState.cards[appState.currentCardIndex];
    
    if (card) {
        questionText.textContent = card.question;
        answerText.textContent = card.answer;
        currentCardSpan.textContent = appState.currentCardIndex + 1;
        
        // Reset flip state
        appState.isFlipped = false;
        flashcard.classList.remove('flipped');
    }
}

function flipCard() {
    appState.isFlipped = !appState.isFlipped;
    flashcard.classList.toggle('flipped');
}

function markAnswer(isCorrect) {
    if (isCorrect) {
        appState.correctCount++;
    } else {
        appState.incorrectCount++;
    }

    appState.currentCardIndex++;
    
    if (appState.currentCardIndex < appState.cards.length) {
        updateProgressBar();
        displayCard();
    } else {
        showResults();
    }
}

function updateProgressBar() {
    const progress = ((appState.currentCardIndex + 1) / appState.questionCount) * 100;
    progressFill.style.width = progress + '%';
}

function showResults() {
    const totalCards = appState.correctCount + appState.incorrectCount;
    const percentage = Math.round((appState.correctCount / totalCards) * 100);

    finalScore.textContent = appState.correctCount;
    finalTotal.textContent = totalCards;
    scorePercentage.textContent = percentage + '%';
    correctCount.textContent = appState.correctCount;
    incorrectCount.textContent = appState.incorrectCount;

    // Set performance message
    if (percentage >= 90) {
        performanceMessage.textContent = '🌟 Outstanding! You\'re a flashcard master!';
        performanceMessage.style.color = '#4caf50';
    } else if (percentage >= 80) {
        performanceMessage.textContent = '🎉 Great job! You did very well!';
        performanceMessage.style.color = '#4caf50';
    } else if (percentage >= 70) {
        performanceMessage.textContent = '👍 Good effort! You\'re on the right track!';
        performanceMessage.style.color = '#667eea';
    } else if (percentage >= 60) {
        performanceMessage.textContent = '📚 You\'re getting there! Keep studying!';
        performanceMessage.style.color = '#ff9800';
    } else {
        performanceMessage.textContent = '💪 Keep practicing! You\'ll improve!';
        performanceMessage.style.color = '#f44336';
    }

    switchScreen('results');
}

function quitQuiz() {
    if (confirm('Are you sure you want to quit the quiz?')) {
        switchScreen('setup');
        resetSetupForm();
    }
}

function retryQuiz() {
    // Restart with same topic and question count
    appState.cards = [];
    appState.currentCardIndex = 0;
    appState.correctCount = 0;
    appState.incorrectCount = 0;
    appState.isFlipped = false;

    const topicCards = flashcardData[appState.selectedTopic];
    appState.cards = shuffleArray([...topicCards]).slice(0, appState.questionCount);

    updateProgressBar();
    displayCard();

    switchScreen('flashcard');
}

function changeTopicAndRetry() {
    switchScreen('setup');
    resetSetupForm();
}

function resetSetupForm() {
    topicSelect.value = '';
    questionCountInput.value = 5;
}

function switchScreen(screenName) {
    // Hide all screens
    setupScreen.classList.remove('active');
    flashcardScreen.classList.remove('active');
    resultsScreen.classList.remove('active');

    // Show selected screen
    if (screenName === 'setup') {
        setupScreen.classList.add('active');
    } else if (screenName === 'flashcard') {
        flashcardScreen.classList.add('active');
    } else if (screenName === 'results') {
        resultsScreen.classList.add('active');
    }
}

// Helper function to shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Initialize - Show setup screen on load
setupScreen.classList.add('active');