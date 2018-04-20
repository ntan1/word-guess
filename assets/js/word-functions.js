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

function checkLetter(letter, word) {

}