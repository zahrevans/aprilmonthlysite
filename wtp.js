// easy: Tinkaton, scyther, Gimmora, skarmory, Heatran, hootoot, Flygon, Rookidee, skorupi, snorunt
//hard: Absol, Infernape, froslass, Hatterene, Zeraora swablu wigglytuff magmar capsakid

// List of images for the game
// double checked easy 
const easyImageList = [
    'images/heatran.png',
    'images/skarmory.png',
    'images/tinkaton.png',
    'images/scyther.png',
    'images/glimmora.png',
    'images/hoothoot.png',
    'images/skorupi.png',
    'images/rookidee.png',
    'images/snorunt.png',
    'images/flygon.png',
]
// Double checked capitallizations

const hardImageList = [
    'images/absol.png',
    'images/zeraora.png',
    'images/froslass.png',
    'images/infernape.png',
    'images/hatterene.png',
    'images/swablu.png',
    'images/wigglytuff.png',
    'images/magmar.png',
    'images/capsakid.png',
    'images/braviary.png',
]

// Set up the basic stuff i need
let selectedWord = '';    // the Pokémon name (lowercase)
let selectedImage = '';    // the full path to its image
let wrongGuesses = 0;
let guessedWords = [];    // to prevent repeat guesses
const maxMistakes = 3;    // Changed from 6 to 3
let wins = 0;
let losses = 0;
let livesImages = ['pikalife.png', 'pikalife.png', 'pikalife.png']; // Array of life images

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
    livesImages = ['pikalife.png', 'pikalife.png', 'pikalife.png']; // Reset lives
    updateLivesDisplay(); // Show all 3 lives at start
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

function updateLivesDisplay() {
    const livesContainer = document.createElement('div');
    livesContainer.id = 'livesContainer';
    livesContainer.className = 'd-flex justify-content-center my-3';

    const oldContainer = document.getElementById('livesContainer');
    if (oldContainer) {
        oldContainer.remove();
    }

    livesImages.forEach((image, index) => {
        if (image) {
            const lifeImg = document.createElement('img');
            lifeImg.src = image;
            lifeImg.className = 'mx-1';
            lifeImg.style.width = '50px';
            lifeImg.alt = `Life ${index + 1}`;
            livesContainer.appendChild(lifeImg);
        }
    });

    const wrongLetters = document.getElementById('wrongLetters');
    wrongLetters.after(livesContainer);
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

    // Remove one life
    livesImages[livesImages.length - wrongGuesses] = null;
    updateLivesDisplay();

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

    // Reset lives
    livesImages = ['pikalife.png', 'pikalife.png', 'pikalife.png'];

    // Remove lives container
    const livesContainer = document.getElementById('livesContainer');
    if (livesContainer) {
        livesContainer.remove();
    }

    document.getElementById('difficultySelection').classList.remove('d-none');
    document.getElementById('difficultyBox').classList.add('d-none');
    document.getElementById('gameArea').classList.add('d-none');
}

document.getElementById('letterInput')
    .addEventListener('keypress', (e) => {
        if (e.key === 'Enter') guessLetter();
    });