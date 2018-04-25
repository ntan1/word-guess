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

function checkLetter(letter, word, guessedArr) {
    if(word.includes(letter)) {
        for(var i=0; i<word.length; i++) {
            if(word.charAt(i) === letter) {
                guessedArr[i] = letter;
            }
        }
    }
    return guessedArr;
}

function resetWord(word, guessedArr) {
    guessedArr = [];
    for(var i=0; i<word.length; i++) {
        guessedArr[i] = "_";
    }
    return guessedArr;
}