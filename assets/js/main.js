// Todo: safe key press checking
// Todo: round end (win and lose)

// Game Settings
var remaining = 12;
var wins = 0;

var words = ["spoon", "fork", "axe"];
var activeWord = "";
var guessedLetters = [];
var wordSoFar = []; // for letters in activeWord

// get reference to document elements
var boardWord = document.getElementById("theWord"); 
var boardWins = document.getElementById("wins");
var boardRemaining = document.getElementById("remainingGuesses");
var boardGuessed = document.getElementById("guessedLetters");

// test word generation and display
if(words.length > 0) {
    activeWord = selectWord(words);
    guessedLetters = resetWord(activeWord, guessedLetters); //for guessed letters
    console.log(guessedLetters);
}

boardWord.textContent = displayBoard(guessedLetters);
boardWins.textContent = wins;
boardRemaining.textContent = remaining;

document.onkeyup = function(event) {
    console.log(event.key);
    remaining--;
    guessedLetters = checkLetter(event.key, activeWord, guessedLetters);
    boardRemaining.textContent = remaining;
    boardWord.textContent = displayBoard(guessedLetters); 
    boardGuessed.textContent += event.key + " ";
}

