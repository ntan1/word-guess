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

function checkLetter(letter, word, guessed) {
    if(word.includes(letter)) {
        for(var i=0; i<word.length; i++) {
            if(word.charAt(i) === letter) {
                guessed[i] = letter;
            }
        }
    }
    console.log(guessed);
    return guessed;
}

function resetWord(word, guessed) {
    guessed = [];
    for(var i=0; i<word.length; i++) {
        guessed[i] = "_";
    }
    return guessed;
}

function formatWord(guessed) {
    var wordSoFar = "";
    for(var i=0; i<guessed.length; i++) {
        wordSoFar += guessed[i] + " ";
    }
    return wordSoFar;
}