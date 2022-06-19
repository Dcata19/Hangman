//global variables
let idOfHiddenWord = 1;
let lives = 15;
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

//get the input word
function getInputWord() {
    return document.getElementById('word').value;
}

//start the game
function start() {
    updateLife();
    createKeyboard();
    for (let i = 1; i <= getInputWord().length; ++i) {
        creatHiddenWord();
    }
}

//create the hidden word
function creatHiddenWord() {
    let container = document.getElementById('censored');
    var char = document.createElement('span');
    char.className = "m-1 p-3 badge text-bg-warning";
    char.innerText = "_";
    char.id = idOfHiddenWord;
    container.appendChild(char);
    ++idOfHiddenWord;
}

function updateLife() {
    document.getElementById('life').innerText = 'Life: ' + lives;
}

//create a key
function creatKey(i) {
    let keyContainer = document.getElementById('keys');
    let button = document.createElement('button');
    button.className = "m-2 btn btn-dark btn-lg";
    button.id = alphabet[i];
    button.innerText = alphabet[i];
    keyContainer.appendChild(button);
    //check that the selected letter is on the entered word
    button.onclick = function checkCharacter() {
        if (getInputWord().indexOf(button.id) > -1) {
            for(let i = 0; i < getInputWord().length; ++i) {
                if (getInputWord()[i] == button.id) {
                    document.getElementById(i + 1).innerText = button.id;
                }
            }
            button.remove();
        }
        else {
            button.remove();
            --lives;
            updateLife();
        }
        if(checkTheWinner() == 1) {
            document.getElementById('winningStatus').innerText = 'You win!';
            document.getElementById('keys').remove();
        } else if(lives == 0) {
            document.getElementById('winningStatus').innerText = 'You lose! ' + '"The word: ' + getInputWord() + '"';
            document.getElementById('keys').remove();
        }
    }
}

//create the keyboard
function createKeyboard() {
    for (let i = 0; i < alphabet.length; ++i) {
        creatKey(i);
    }
}

//check if the player has won or not
function checkTheWinner() {
    for(let i = 1; i < idOfHiddenWord; ++i) {
        if(document.getElementById(i).innerText == '_') {
            return 0;
        }
    }
    return 1;
}