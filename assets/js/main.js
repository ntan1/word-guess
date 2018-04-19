var words = ["spoon", "fork", "axe"];
var activeWord = selectWord(words);

function selectWord(arr) {
    var word = arr[Math.floor(Math.random() * arr.length)];
    console.log(word);
    return word;
}

function removeWord(word, arr) {
    var index = arr.indexOf(word);
    if(index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

document.onkeyup = function(event) {
    console.log(event.key);
}

words = removeWord(selectWord(words), words);
words = removeWord(selectWord(words), words);
words = removeWord(selectWord(words), words);
words = removeWord(selectWord(words), words);

