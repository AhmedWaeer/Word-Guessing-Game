let start = document.querySelector(".start-button");
let reset = document.querySelector(".reset-button");
let input = document.querySelector(".input");
let wins = document.querySelector("#Wins");
let losses = document.querySelector("#Losses");
let display = document.querySelector(".display");
let counter = document.querySelector("#counter");
let count;
let chosenWord = "";
let blankWord = 0;
let winCounter = 0;
let loseCounter = 0;
let isWin = false;
let words = ["english", "portuguese", "japanese", "turkish", "german", "french", "spanish",
    "russian", "bengali", "america", "africa", "europe", "actor",
    "checker", "attack", "chessman", "stake", "speculation", "hangman"
];
let blanks = [];
let letterInWord = [];


function startGame() {
    isWin = false;
    count = 10;
    start.disabled = true;
    renderBlanks();
    startTimer();
}

function startTimer() {
    let timeInterval = setInterval(function() {
        count--;
        counter.textContent = count;
        if (count === 0) {
            clearInterval(timeInterval);
            loseGame();
        }
        if (count >= 0) {
            if (isWin && count > 0) {
                clearInterval(timeInterval);
                winGame();
            }
        }
    }, 1000);

}


function renderBlanks() {

    chosenWord = words[Math.floor(Math.random() * words.length)];
    letterInWord = chosenWord.split("");
    blankWord = letterInWord.length;
    blanks = []
    for (var i = 0; i < blankWord; i++) {
        blanks.push("_");
    }
    input.textContent = blanks.join(" ")
}

function checkletters(letter) {
    for (var i = 0; i < letterInWord.length; i++) {
        if (letterInWord[i] === letter) {
            blanks[i] = letter;
            input.textContent = blanks.join(" ");
        }
    }
}


function winGame() {
    winCounter++;
    wins.textContent = winCounter;
    input.textContent = "YAHO!! YOU WON!!!🏆"
    start.disabled = false;
    setWin();

}

function loseGame() {
    loseCounter++;
    losses.textContent = loseCounter;
    input.textContent = "Game Over";
    start.disabled = false;
    setlose();
}

function checkLetters() {
    if (chosenWord === blanks.join("")) {
        isWin = true;
    }
}

function setWin() {
    wins.textContent = winCounter;
    localStorage.setItem("winCounter", winCounter);
}

function setlose() {
    losses.textContent = loseCounter;
    localStorage.setItem("loseCounter", loseCounter);
}

function getWins() {
    storedValue = localStorage.getItem("winCounter");
    if (storedValue === null) {
        winCounter = 0;
    } else {
        winCounter = storedValue;
    }
    wins.textContent = winCounter;
}

function getlosses() {
    storedValue = localStorage.getItem("loseCounter");
    if (storedValue === null) {
        loseCounter = 0;
    } else {
        loseCounter = storedValue;
    }
    losses.textContent = loseCounter;
}


function init() {
    getWins();
    getlosses();
}

start.addEventListener("click", startGame);
init();

document.addEventListener("keypress", (event) => {
    if (count === 0 || isWin) {
        return;
    }
    var insertedletter = event.key;
    checkletters(insertedletter);
    checkLetters();
});

reset.addEventListener("click", () => {
    winCounter = 0;
    loseCounter = 0;
    setWin();
    setlose();

});