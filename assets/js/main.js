// Game Settings
var remaining = 12;
var wins = 0;
var startGame = false;

// regex to check key press is a letter
var re = /[a-z]/;

var words = ["zeus", "achilles", "sisyphus"]; // array of words to use
var activeWord = ""; // current selected word from words[]
var correctltrsArr = []; // letters guessed that are correct
var guessedltrsArr = []; // all guessed letters
var wordSoFar = ""; // string to show correct letters guessed
var ltrsGuessedStr = ""; // string to show all guessed letters
var result = ""; // won/lost/beat game

// get reference to document elements
var boardWord = document.getElementById("theWord");
var boardWins = document.getElementById("wins");
var boardRemaining = document.getElementById("remainingGuesses");
var boardGuessed = document.getElementById("guessedLetters");
var wonLost = document.getElementById("won-lost");
var pressKey = document.getElementById("pressKey");

boardWord.focus();

// generate first word
if (words.length > 0) {
    activeWord = selectWord(words);
    correctltrsArr = resetWord(activeWord, correctltrsArr); //for guessed letters
    wordSoFar = correctltrsArr.join('');
    displayBoard();
}

document.onkeyup = function (event) {
    if (remaining > 0 && startGame) {
        doKeyThings(event.key);
    } else if (!startGame) {
        startGame = true;
        pressKey.textContent = "";
    }
}

function doKeyThings(key) {
    var key = key.toLowerCase();
    if (re.test(key) && key.length === 1 && startGame) { // check input is valid key
        if (!guessedltrsArr.includes(key)) { // check if key has been pressed before
            remaining--;
            guessedltrsArr.push(key);
            correctltrsArr = checkLetter(key, activeWord, correctltrsArr);
            wordSoFar = correctltrsArr.join('');
            ltrsGuessedStr = guessedltrsArr.join('');
            displayBoard();
            if (checkWin()) {
                resetBoard();
            } else if (remaining === 0) {
                wordSoFar = activeWord;
                result = "You have lost! The word was " + activeWord;
                pressKey.textContent = "Refresh the page to try again"
                displayBoard();
            }
        }
    }
}

// display game board
function displayBoard() {
    boardWord.textContent = wordSoFar;
    boardWins.textContent = wins;
    boardRemaining.textContent = remaining;
    boardGuessed.textContent = ltrsGuessedStr;
    wonLost.textContent = result;
}

// check win condition
function checkWin() {
    var won = false;
    if (!correctltrsArr.includes("_")) {
        wins++;
        won = true;
        result = "You have won! The word was " + activeWord;
    }
    return won;
}

// reset board after win
function resetBoard() {
    if (words.length > 1) {
        remaining = 12;
        guessedltrsArr = [];
        words = removeWord(activeWord, words);
        activeWord = selectWord(words);
        correctltrsArr = resetWord(activeWord, correctltrsArr);
        wordSoFar = correctltrsArr.join("");
        ltrsGuessedStr = ""
        displayBoard();
    } else {
        result = "Congratulations! You have solved all the words!"
        displayBoard();
    }
}