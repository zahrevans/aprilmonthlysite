// easy: Tinkaton, scyther, Gimmora, skarmory, Heatran
//hard: Absol, Infernape, froslass, Hatterene, Zeraora

// List of images for the game
const easyImageList = [
    'images/heatran.png',
    'images/skarmory.png',
    'images/tinkaton.png',
    'images/scyther.png',
    'images/glimmora.png',
]
const hardImageList = [
    'images/absol.png',
    'images/zeraora.png',
    'images/froslass.png',
    'images/infernape.png',
    'images/hatterene.png',
]

// Set up the basic stuff i need
let selectedWord = '';    // the Pokémon name (lowercase)
let selectedImage = '';    // the full path to its image
let wrongGuesses = 0;
let guessedWords = [];    // to prevent repeat guesses
const maxMistakes = 6;
let wins = 0;
let losses = 0;

// === update the score badges ===
function updateScoreDisplay() {
    document.querySelector('.wins').textContent = `Wins: ${wins}`;
    document.querySelector('.losses').textContent = `Losses: ${losses}`;
}

// === update the difficulty banner ===
function updateDifficultyDisplay(level) {
    const box = document.getElementById('difficultyBox');
    box.className = 'mt-3 p-3 fw-bold'; // reset classes
    if (level === 'easy') {
        box.textContent = 'Difficulty: Easy 🍀';
        box.classList.add('easy');
    } else {
        box.textContent = 'Difficulty: Hard 💀';
        box.classList.add('hard');
    }
}

// === start a new round ===
function startGame(level) {
    // reset state
    wrongGuesses = 0;
    guessedWords = [];
    document.getElementById('livesImage').src = 'img/6-gold-coins.jpeg';
    document.getElementById('wrongLetters').textContent = 'Wrong Guesses:';

    // prep input for full name guess
    const input = document.getElementById('letterInput');
    input.removeAttribute('maxlength');
    input.placeholder = 'Enter full Pokémon name';
    input.value = '';

    // update Guess button text
    document.getElementById('guessBtn').textContent = 'Submit';

    // pick random image & derive name
    const pool = (level === 'easy') ? easyImageList : hardImageList;
    selectedImage = pool[Math.floor(Math.random() * pool.length)];
    selectedWord = selectedImage
        .split('/').pop()
        .replace('.png', '')
        .toLowerCase();

    // display the image
    document.getElementById('wordDisplay').innerHTML = `
        <img id="pokemonImage" 
             src="${selectedImage}" 
             class="img-fluid mb-3" 
             alt="Who's that Pokémon?">
    `;

    // show/hide sections
    document.getElementById('difficultySelection').classList.add('d-none');
    document.getElementById('difficultyBox').classList.remove('d-none');
    document.getElementById('gameArea').classList.remove('d-none');

    input.focus();
    updateDifficultyDisplay(level);
}
function guessLetter() {
    const input = document.getElementById('letterInput');
    const guess = input.value.trim().toLowerCase();
    input.value = '';

    if (!guess) {
        alert('Please enter a Pokémon name!');
        return;
    }
    if (guessedWords.includes(guess)) {
        alert(`You already tried "${guess}"!`);
        return;
    }
    guessedWords.push(guess);

    if (guess === selectedWord) {
        handleWin();
    } else {
        handleMiss(guess);
    }
}

// === wrong guess logic ===
function handleMiss(guess) {
    new Audio('Wrong.mp3').play();
    wrongGuesses++;
    document.getElementById('wrongLetters').textContent += ` ${guess}`;

    const remaining = maxMistakes - wrongGuesses;
    document.getElementById('livesImage').src = `img/${remaining + 1}-gold-coins.jpeg`;

    if (wrongGuesses >= maxMistakes) {
        endGame(false);
    }
}

// === correct guess logic ===
function handleWin() {
    new Audio('Correct.mp3').play();
    endGame(true);
}
function endGame(won) {
    if (won) {
        wins++;
        showMessage('🎉 Congratulations! You caught it!', 'success');
    } else {
        losses++;
        showMessage(`❌ Game Over! It was "${selectedWord}".`, 'danger');
    }
    updateScoreDisplay();
    setTimeout(restartGame, 2000);
}


function showMessage(text, type) {
    const msg = document.createElement('div');
    msg.className = `alert alert-${type} mt-3`;
    msg.textContent = text;
    msg.style.opacity = '0';
    msg.style.transition = 'opacity 0.5s ease';
    document.getElementById('gameArea').appendChild(msg);
    requestAnimationFrame(() => {
        msg.style.opacity = '1';
    });
}


function restartGame() {

    document.querySelectorAll('#gameArea .alert')
        .forEach(alert => alert.remove());


    document.getElementById('wordDisplay').textContent = '';
    document.getElementById('wrongLetters').textContent = 'Wrong Guesses:';
    document.getElementById('livesImage').src = 'img/6-gold-coins.jpeg';

    document.getElementById('difficultySelection').classList.remove('d-none');
    document.getElementById('difficultyBox').classList.add('d-none');
    document.getElementById('gameArea').classList.add('d-none');
}

document.getElementById('letterInput')
    .addEventListener('keypress', (e) => {
        if (e.key === 'Enter') guessLetter();
    });