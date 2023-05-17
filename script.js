// Array of GIF URLs
var gifs = [
    "https://media.giphy.com/media/j9mqKgQvkNOziGICfd/giphy.gif",
    "https://media.giphy.com/media/XR9Dp54ZC4dji/giphy.gif",
    "https://media.giphy.com/media/xUPGcjKy4Agbb6d928/giphy.gif",
    "https://media.giphy.com/media/3o6UB3VhArvomJHtdK/giphy.gif",
    "https://media.giphy.com/media/fxsZjkEjAp0R2b396m/giphy.gif",
    "https://media.giphy.com/media/d3mlE7uhX8KFgEmY/giphy.gif",
    "https://media.giphy.com/media/3oKGzgdoWJAfwXIVcA/giphy.gif",
    "https://media.giphy.com/media/cvez2LViSN6r0vCUu2/giphy.gif",
    "https://media.giphy.com/media/bkcbX8SqTCXHG/giphy.gif",
    "https://media.giphy.com/media/l36kU80xPf0ojG0Erg/giphy.gif",
    "https://media.giphy.com/media/3ndAvMC5LFPNMCzq7m/giphy.gif",
    "https://media.giphy.com/media/L19HQqt7Ctd4L79Wtf/giphy.gif"
];

// Create an array of cards with duplicated GIFs
var cards = gifs.concat(gifs);

// Shuffle the cards array
shuffle(cards);

// Create the game board
var gameBoard = document.getElementById("game-board");

cards.forEach(function (card, index) {
    var cardElement = document.createElement("div");
    cardElement.classList.add("card");

    var imgElement = document.createElement("img");
    imgElement.src = card;

    cardElement.appendChild(imgElement);
    gameBoard.appendChild(cardElement);

      // Add click event listener to each card
      cardElement.addEventListener("click", function () {
          flipCard(cardElement, imgElement, card);
      });
});

var flippedCards = [];
var matchedCards = [];
var clickCounter = 0;
var clickCounterElement = document.getElementById("click-counter");
var bestScore = Number(localStorage.getItem("bestScore")) || "-";
// var bestScoreElement = document.getElementById("best-score");

function flipCard(cardElement, imgElement, card) {
  if (flippedCards.length < 2 && !matchedCards.includes(card) && cardElement !== flippedCards[0]) {
    imgElement.style.display = "block";
    const flipContainer = imgElement.closest('div');
    flipContainer.classList.toggle('flipped');
    flippedCards.push(cardElement);
    incrementClickCounter();

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  var card1 = flippedCards[0];
  var card2 = flippedCards[1];

  if (card1.firstChild.src === card2.firstChild.src) {
    matchedCards.push(card1.firstChild.src);
    card1.removeEventListener("click", flipCard);
    card2.removeEventListener("click", flipCard);
  } else {
    card1.firstChild.style.display = "none";
    card2.firstChild.style.display = "none";
    const flipContainer1 = card1.closest('div');
    flipContainer1.classList.toggle('flipped');
    const flipContainer2 = card2.closest('div');
    flipContainer2.classList.toggle('flipped');
  }

  flippedCards = [];

  if (matchedCards.length === gifs.length) {
    if (clickCounter < bestScore) {
      bestScore = clickCounter;
      localStorage.setItem("bestScore", bestScore);
      // bestScoreElement.textContent = bestScore;
    }

    var playAgain = confirm("Congratulations! You Won The Game! Do You Want To Play Again?");

    if (playAgain) {
      resetGame();
    }
  }
}

function resetGame() {
  // Clear the game board
  gameBoard.innerHTML = "";

  // Clear arrays and counters
  flippedCards = [];
  matchedCards = [];
  clickCounter = 0;
  clickCounterElement.textContent = "0";

  // Shuffle the cards array
  shuffle(cards);

  // Create new card elements
  cards.forEach(function (card, index) {
    var cardElement = document.createElement("div");
    cardElement.classList.add("card");

    var imgElement = document.createElement("img");
    imgElement.src = card;

    cardElement.appendChild(imgElement);
    gameBoard.appendChild(cardElement);

    cardElement.addEventListener("click", function () {
      flipCard(cardElement, imgElement, card);
    });
  });
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function incrementClickCounter() {
  clickCounter++;
  clickCounterElement.textContent = clickCounter;
}

// Update the best score element with the stored value
// bestScoreElement.textContent = bestScore;


function scrollToPage() {
  const scrollDuration = 1000; // 1 second
  const scrollHeight = document.documentElement.scrollHeight;
  const screenHeight = window.innerHeight;
  const scrollTop = scrollHeight - screenHeight;
  document.body.classList.add("scroll-up");
  
  setTimeout(function() {
    const gameBoardElement = document.getElementById("game-board");
    const gameBoardOffsetTop = gameBoardElement.offsetTop;
    
    window.scrollTo({
      top: gameBoardOffsetTop,
      behavior: "smooth"
    });
  }, 50);
  
  setTimeout(function() {
    console.log("Scrolled to game-board element!");
  }, scrollDuration);
}
