// Todo: safe key press checking
// Todo: round end (win and lose)

// Game Settings
var remaining = 12;
var wins = 0;

var re = /[a-z]/;

var words = ["zeus", "achilles", "sisyphus"];
var activeWord = "";
var correctLettersArr = [];
var guessedLettersArr = [];
var wordSoFar = ""; // for letters in activeWord

// get reference to document elements
var boardWord = document.getElementById("theWord");
var boardWins = document.getElementById("wins");
var boardRemaining = document.getElementById("remainingGuesses");
var boardGuessed = document.getElementById("guessedLetters");

// test word generation and display
if (words.length > 0) {
    activeWord = selectWord(words);
    correctLettersArr = resetWord(activeWord, correctLettersArr); //for guessed letters
    console.log(correctLettersArr);
}

boardWord.textContent = formatWord(correctLettersArr);
boardWins.textContent = wins;
boardRemaining.textContent = remaining;

document.onkeyup = function (event) {
    if (remaining > 0) {
        doKeyThings(event.key);
    }
}

function doKeyThings(key) {
    var key = key.toLowerCase();
    if (re.test(key) && key.length === 1) {
        if (!guessedLettersArr.includes(key)) {
            remaining--;
            guessedLettersArr.push(key);
            correctLettersArr = checkLetter(key, activeWord, correctLettersArr);
            displayBoard();
            if(checkWin()){
                resetBoard();
            }
        }
    }
}

function displayBoard() {
    wordSoFar = correctLettersArr.join(' ');
    lettersGuessedString = guessedLettersArr.join(' ');
    boardRemaining.textContent = remaining;
    boardWord.textContent = wordSoFar;
    boardGuessed.textContent = lettersGuessedString;
    boardWins.textContent = wins;
}

function checkWin() {
    var won = false;
    if (!correctLettersArr.includes("_")) {
        wins++;
        won = true;
    }
    return won;
}

function resetBoard() {
    remaining = 12;
    guessedLettersArr = [];
    words = removeWord(activeWord, words);
    activeWord = selectWord(words);
    correctLettersArr = resetWord(activeWord, correctLettersArr);
    displayBoard();
    console.log("it has been reset");
}