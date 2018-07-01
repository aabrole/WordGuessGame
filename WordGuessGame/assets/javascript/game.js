var guesswords = [
    "facebook",
    "twitter",
    "google",
    "instagram",
    "vine",
    "reddit",
    "yahoo",
    "wikipedia",
    "amazon",
    "netflix",
    "linkedin",
    "spotify"
];

var maxtries = 10; //tries
var guessedletters = []; //user guess
var currentword; //index current word
var guessword = []; //word build -> match
var remainingguess = 0; //tries left
var gamestart = false; // game start
var gameover = false; //press any key try again
var wins = 0; //wins

function resetgame() {
    remainingguess = maxtries;
    gamestart = false;

 currentword = Math.floor(Math.random() * (guesswords.length));

 guessedletters = [];
 guessword = [];

 document.getElementById("hangmanImage").src = "";

    for (var i = 0; i < guesswords[currentword].length; i++) {
        guessword.push("_");
    }

    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";

    updateDisplay();
};

function updateDisplay() {
document.getElementById("totalWins").innerText = wins;
document.getElementById("currentWord").innerText = "";
for (var i = 0; i < guessword.length; i++) {
    document.getElementById("currentWord").innerText += guessword[i];

}
    document.getElementById("remainingGuesses").innerText = remainingguess;
    document.getElementById("guessedLetters").innerText = guessedletters;

    if(remainingguess <= 0)
    {
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        gameover = true;

    }

}

document.onkeydown = function(event){
    if(gameover) {
        resetgame();
        gameover = false;
    } else {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }

}
}

function makeGuess(letter) {
    if (remainingguess > 0) {
        if (!gamestart) {
            gamestart = true;
        }

        if (guessedletters.indexOf(letter) === -1) {
            guessedletters.push(letter);
            evaluateGuess(letter);
        }
    }
    
    updateDisplay();
    checkWin();
};


function evaluateGuess(letter) {

    var positions = [];
    for (var i = 0; i < guesswords[currentword].length; i++) {
        if(guesswords[currentword][i] === letter) {
            positions.push(i);
        }
    }


    if (positions.length <= 0) {
        remainingguess--;
    } else {


        for(var i = 0; i < positions.length; i++) {
            guessword[positions[i]] = letter;
        }
    }
};

function checkWin() {
    if(guessword.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        gamestart = true;
    }
};







