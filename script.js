let randomNumber = Math.ceil(Math.random() * 10);

const userInput = document.querySelector('#textbox');
const submitBtn = document.getElementById('submit');
const guessSlot = document.getElementById('prevGuesses');
const guessRemaining = document.getElementById('remainingGuesses');
const display = document.getElementById('ending');
const result = document.getElementById('content');

let prevGuess = [];
let numGuess = 3;
let playGame = true;
if (playGame) {
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let input = parseInt(userInput.value);
        validateInput(input);
    });
} else {
    endGame();
}
function validateInput(input) {
    if (input <= 0 || input > 10 || isNaN(input)) {
        displayMsg('Please enter a number from 1 to 10');
    } else {
        prevGuess.push(input);
        if (numGuess === 1) {
            displayResult(input);
            displayMsg(`Game Over. Random number was ${randomNumber}`);
            endGame();
        } else {
            displayResult(input);
            checkInput(input);
        }
    }
}
function checkInput(input) {
    if (input < randomNumber) {
        displayMsg('Your value is lower than the hidden number');
    } else if (input > randomNumber) {
        displayMsg('Your value is higher than the hidden number');
    } else {
        displayMsg("Bravo! You guessed it right!!")
        endGame();
    }
}
function displayResult(input) {
    userInput.value = '';
    guessSlot.innerHTML += `${input}  `;
    --numGuess;
    guessRemaining.innerHTML = `${numGuess}`;
}
function displayMsg(message) {
    display.style.visibility = 'visible';
    display.style.cursor = 'pointer';
    display.innerHTML = message;
}
function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', "");
    playGame = false;
    setTimeout(() => {
        display.innerHTML = 'Start new Game';
    }, 3000);
    newGame();
}
function newGame() {
    display.addEventListener('click', () => {
        randomNumber = Math.ceil(Math.random() * 10);
        prevGuess = [];
        numGuess = 3;
        guessSlot.innerHTML = '';
        guessRemaining.innerHTML = `${numGuess}`;
        userInput.removeAttribute('disabled');
        display.innerHTML = '';
        display.style.visibility = 'hidden';
        playGame = true;
    })
}
