// Todo: safe key press checking
// Todo: round end (win and lose)

// Game Settings
var remaining = 12;
var wins = 0;

var words = ["zeus", "achilles"];
var activeWord = "";
var guessedLetters = [];
var wordSoFar = ""; // for letters in activeWord

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
    console.log(event.keyCode);
    if(event.keyCode >= 65 && event.keyCode <= 90)  {
        remaining--;
        guessedLetters = checkLetter(event.key, activeWord, guessedLetters);
        wordSoFar = guessedLetters.join('');
        boardRemaining.textContent = remaining;
        boardWord.textContent = displayBoard(guessedLetters);
        boardGuessed.textContent += event.key + " ";
        boardWins.textContent = wins;
    }
    if(wordSoFar.replace(" ", "") === activeWord) {
        wins++;
        words = removeWord(activeWord, words);
        activeWord = selectWord(words);
        guessedLetters = [];
        guessedLetters = resetWord(activeWord, guessedLetters);
        boardWord.textContent = displayBoard(guessedLetters);
        boardGuessed.textContent = "";
    }
}
