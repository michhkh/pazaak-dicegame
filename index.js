// Variables for the game state
let player1Score = 0;
let player2Score = 0;
let player1Turn = true;
let player1Stand = false;
let player2Stand = false;

// Variables to store references to the necessary DOM nodes
const player1Dice = document.getElementById("player1Dice");
const player2Dice = document.getElementById("player2Dice");
const player1Scoreboard = document.getElementById("player1Scoreboard");
const player2Scoreboard = document.getElementById("player2Scoreboard");
const message = document.getElementById("message");
const rollBtn = document.getElementById("rollBtn");
const resetBtn = document.getElementById("resetBtn");
const doubleBtn = document.getElementById("doubleBtn");
const standBtn = document.getElementById("standBtn");

function showResetButton() {
  rollBtn.style.display = "none";
  doubleBtn.style.display = "none";
  standBtn.style.display = "none";
  resetBtn.style.display = "block";
}

function standChecker() {
  if (player1Stand === true && player1Score < 20) {
    player1Turn = false;
    player1Dice.classList.remove("active");
    player2Dice.classList.add("active");
    message.textContent = "Player 2 Turn";
  } else if (player2Stand === true && player2Score < 20) {
    player1Turn = true;
    player2Dice.classList.remove("active");
    player1Dice.classList.add("active");
    message.textContent = "Player 1 Turn";
  }
}

function checker() {
  if (player1Stand === true && player2Stand === true) {
    if (player1Score > player2Score) {
      message.textContent = "Player 1 Won 🥳";
      showResetButton();
    } else if (player2Score > player1Score) {
      message.textContent = "Player 2 Won 🎉";
      showResetButton();
    } else {
      message.textContent = "Draw";
      showResetButton();
    }
  } else if (player1Score === 20) {
    message.textContent = "Player 1 Won 🥳";
    showResetButton();
  } else if (player2Score === 20) {
    message.textContent = "Player 2 Won 🎉";
    showResetButton();
  } else if (player1Score > 20) {
    message.textContent = "Player 1 Lost. Player 2 Won 🎉";
    showResetButton();
  } else if (player2Score > 20) {
    message.textContent = "Player 2 Lost. Player 1 Won 🎉";
    showResetButton();
  }
}

doubleBtn.addEventListener("click", function () {
  let randomNumber = Math.floor(Math.random() * 7);
  randomNumber += Math.floor(Math.random() * 7);

  if (player1Turn && player1Stand === false) {
    player1Score += randomNumber;
    player1Scoreboard.textContent = player1Score;
    player1Dice.textContent = randomNumber;
    player1Dice.classList.remove("active");
    player2Dice.classList.add("active");
    message.textContent = "Player 2 Turn";
  } else if (player1Turn === false && player2Stand === false) {
    player2Score += randomNumber;
    player2Scoreboard.textContent = player2Score;
    player2Dice.textContent = randomNumber;
    player2Dice.classList.remove("active");
    player1Dice.classList.add("active");
    message.textContent = "Player 1 Turn";
  }

  player1Turn = !player1Turn;
  standChecker();
  checker();
});

// A click event listener to the Roll Dice Button
rollBtn.addEventListener("click", function () {
  const randomNumber = Math.floor(Math.random() * 6) + 1;

  if (player1Turn === true && player1Stand === false) {
    player1Score += randomNumber;
    player1Scoreboard.textContent = player1Score;
    player1Dice.textContent = randomNumber;
    player1Dice.classList.remove("active");
    player2Dice.classList.add("active");
    message.textContent = "Player 2 Turn";
  } else if (player1Turn === false && player2Stand === false) {
    player2Score += randomNumber;
    player2Scoreboard.textContent = player2Score;
    player2Dice.textContent = randomNumber;
    player2Dice.classList.remove("active");
    player1Dice.classList.add("active");
    message.textContent = "Player 1 Turn";
  }

  player1Turn = !player1Turn;
  standChecker();
  checker();
});

standBtn.addEventListener("click", function () {
  if (player1Turn) {
    player1Scoreboard.textContent = player1Score;
    player1Stand = true;
    player1Dice.classList.remove("active");
    player2Dice.classList.add("active");
    message.textContent = "Player 2 Turn";
  } else {
    player2Scoreboard.textContent = player2Score;
    player2Stand = true;
    player2Dice.classList.remove("active");
    player1Dice.classList.add("active");
    message.textContent = "Player 1 Turn";
  }

  checker();
  player1Turn = !player1Turn;
});

resetBtn.addEventListener("click", function () {
  reset();
});

// Reset the game
function reset() {
  player1Score = 0;
  player2Score = 0;
  player1Turn = true;
  player1Stand = false;
  player2Stand = false;
  player1Scoreboard.textContent = 0;
  player2Scoreboard.textContent = 0;
  player1Dice.textContent = "-";
  player2Dice.textContent = "-";
  message.textContent = "Player 1 Turn";
  resetBtn.style.display = "none";
  rollBtn.style.display = "block";
  doubleBtn.style.display = "block";
  standBtn.style.display = "block";
  player2Dice.classList.remove("active");
  player1Dice.classList.add("active");
}
