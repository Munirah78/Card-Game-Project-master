
function shuffle(array) {
var currentIndex = array.length, temporaryValue, randomIndex;

while (0 !== currentIndex) {
randomIndex = Math.floor(Math.random() * currentIndex);
currentIndex -= 1;
temporaryValue = array[currentIndex];
array[currentIndex] = array[randomIndex];
array[randomIndex] = temporaryValue;
}

return array;
}
const cards = document.querySelectorAll('.card');
const restart =document.getElementById('.restart');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

let time = 0;
let timerOut = true;
let timerId;

let moves = 0;
let counter = document.getElementById(".moves");

const stars = document.querySelectorAll(".heart");
let heartList = document.querySelectorAll(".bi-heart-fill");

var openedCards = [];


document.body.onload = startGame();

function startGame(){
 
   
    openedCards = [];

   
    cards = shuffle(cards);
  
    moves = 0;
    counter.innerHTML = moves;
    // reset rating
    for (var i= 0; i < stars.length; i++){
        
        stars[i].style.visibility = "visible";
    }
    //reset timer
    initClock();
    flipCard();
}

function flipCard() {

    this.classList.toggle("open");
    this.classList.add('flip');
  
    if (!hasFlippedCard) {
      // first click
      hasFlippedCard = true;
      firstCard = this;
  
      return;
    }
  
    // second click
    secondCard = this;
  
    checkForMatch();
  }
  function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  
    isMatch ? disableCards() : unflipCards();
  }
  
  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
  
    resetBoard();
  }
  
  function unflipCards() {
    lockBoard = true;
  
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
  
      resetBoard();
    }, 1500);
  }
  
  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  const initClock = () => {
    timerOut = false;
    timerId = setInterval(() => {
      time++;
      timerCount();
    }, 1000);
  };

  const timerCount = () => {
    const timer = document.querySelector("#time-display");
    const min = Math.floor(time / 60);
    const sec = time % 60;
    if (sec < 10) {
      timer.innerHTML = `${min}:0${sec}`;
    } else {
      timer.innerHTML = `${min}:${sec}`;
    }
  };

const stopTimer = () => {
  clearInterval(timerId);
};


start.addEventListener("click", () => {
  if (time == 0) {
    initClock();
    flipCard() ;
  }
});









  cards.forEach(card => card.addEventListener('click', flipCard));
  restart.addEventListener('click',function ())
  {
    stopTimer();
    timerOut = true;
    time = 0;
    timerCount(); 
    startGame();
  };
