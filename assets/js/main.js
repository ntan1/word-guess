var words = ["spoon", "fork", "axe"];
var activeWord = selectWord(words);

var replace = document.getElementById("replace");

document.onkeyup = function(event) {
    console.log(event.key);
    replace.textContent += event.key;
}

words = removeWord(selectWord(words), words);
words = removeWord(selectWord(words), words);
words = removeWord(selectWord(words), words);
words = removeWord(selectWord(words), words);

