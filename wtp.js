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

// Set up the basic stuff we need
let selectedWord = '';    // the Pokémon name (lowercase)
let selectedImage = '';    // the full path to its image
let wrongGuesses = 0;
let guessedWords = [];    // to prevent repeat guesses
const maxMistakes = 6;
let wins = 0;
let losses = 0;

