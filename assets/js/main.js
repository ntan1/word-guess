var game = {
    remaining: 12,
    wins: 0,
    won: false,
    startGame: false,
    words: ["zeus", "achilles", "sisyphus"], // array of words to use
    activeWord: "", // current selected word from words[]
    correctltrsArr: [], // letters guessed that are correct
    guessedltrsArr: [], // all guessed letters
    resultText: "",
    audio: {
        lightning: new Audio("assets/sounds/lightning2.mp3")

    },
    selectWord() {
        this.activeWord = this.words[Math.floor(Math.random() * this.words.length)];
    },
    removeWord(word=this.activeWord) {
        var index = this.words.indexOf(word);
        if (index > -1) {
            this.words.splice(index, 1);
        }
    },
    checkLetter(letter) {
        if (this.activeWord.includes(letter)) {
            for (var i = 0; i < this.activeWord.length; i++) {
                if (this.activeWord.charAt(i) === letter) {
                    this.correctltrsArr[i] = letter;
                }
            }
            this.audio.lightning.play();
            this.audio.lightning.currentTime = 0;
        }
        this.resultText = "";
    },
    resetBlank() {
        this.correctltrsArr = [];
        this.guessedltrsArr = [];
        for (var i = 0; i < this.activeWord.length; i++) {
            this.correctltrsArr[i] = "_";
        }
    },
    getWordSoFar() {
        return this.correctltrsArr.join("");
    },
    getGuessedLtrs() {
        return this.guessedltrsArr.join("");
    },
    checkWin() {
        var won = false;
        if (!this.correctltrsArr.includes("_")) {
            this.wins++;
            won = true;
            this.resultText = "You have won! The word was " + this.activeWord;
        }
        return won;
    }
};

// regex to check key press is a letter
var re = /[a-z]/;

// get reference to document elements
var boardWord = document.getElementById("theWord");
var boardWins = document.getElementById("wins");
var boardRemaining = document.getElementById("remainingGuesses");
var boardGuessed = document.getElementById("guessedLetters");
var wonLost = document.getElementById("won-lost");
var pressKey = document.getElementById("pressKey");
var board = document.getElementById("board");

//board.style.height = window.innerHeight + "px";

boardWord.focus();

// generate first word
game.selectWord();
game.resetBlank();
displayBoard();

// display game board
function displayBoard() {
    boardWord.textContent = game.getWordSoFar();
    boardWins.textContent = game.wins;
    boardRemaining.textContent = game.remaining;
    boardGuessed.textContent = game.getGuessedLtrs();
    wonLost.textContent = game.resultText;
}

document.onkeyup = function (event) {
    if (game.remaining > 0 && game.startGame && !game.won) {
        doKeyThings(event.key);
    } else if (!game.startGame) {
        game.startGame = true;
        pressKey.textContent = "";
    }
}

function doKeyThings(key) {
    key = key.toLowerCase();
    if (re.test(key) && key.length === 1) { // check input is valid letter
        if (!game.guessedltrsArr.includes(key)) { // check if key has been pressed before
            game.remaining--;
            game.guessedltrsArr.push(key);
            game.checkLetter(key);
            if (game.checkWin()) {
                resetBoard();
            } else if (game.remaining === 0) {
                game.resultText = "You have lost! The word was " + game.activeWord;
                pressKey.textContent = "Refresh the page to try again"
            }
            displayBoard();
        }
    }
}

// reset board after win
function resetBoard() {
    if (game.words.length > 1) { // next word
        game.remaining = 12;
        game.removeWord();
        game.selectWord();
        game.resetBlank();
        displayBoard();
    } else { // player has won
        game.resultText = "Congratulations! You have solved all the words!"
        game.won = true;
        displayBoard();
    }
}