let score = 0;
let lives = 3;
let fallSpeed = 2;
let emojiInterval = 1000;
let emojiSpawner;
let gameStarted = false;

const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const gameOverScreen = document.getElementById("game-over");
const finalScore = document.getElementById("final-score");
const countdownDisplay = document.getElementById("countdown");

const catchSound = document.getElementById("catch-sound");
const gameoverSound = document.getElementById("gameover-sound");

function randomEmoji() {
  const emojis = ["🍕", "⚽", "❤️", "⭐", "🐶", "🍔", "🌈", "🎮", "🔥"];
  return emojis[Math.floor(Math.random() * emojis.length)];
}

function createEmoji() {
  const emoji = document.createElement("div");
  emoji.classList.add("emoji");
  emoji.textContent = randomEmoji();
  emoji.style.left = Math.random() * 90 + "%";
  emoji.style.top = "0px";

  gameArea.appendChild(emoji);

  let speed = fallSpeed + Math.random() * 2;
  const fall = setInterval(() => {
    const currentTop = parseInt(emoji.style.top);
    if (currentTop < 500) {
      emoji.style.top = currentTop + speed + "px";
    } else {
      clearInterval(fall);
      gameArea.removeChild(emoji);
      loseLife();
    }
  }, 20);

  emoji.addEventListener("click", () => {
    catchSound.currentTime = 0;
    catchSound.play();
    score++;
    scoreDisplay.textContent = score;
    clearInterval(fall);
    gameArea.removeChild(emoji);

    if (score % 5 === 0 && fallSpeed < 7) {
      fallSpeed += 0.5;
      if (emojiInterval > 300) emojiInterval -= 50;
      resetInterval();
    }
  });
}

function loseLife() {
  lives--;
  livesDisplay.textContent = lives;
  if (lives <= 0) {
    endGame();
  }
}

function endGame() {
  clearInterval(emojiSpawner);
  gameoverSound.play();
  gameOverScreen.classList.remove("hidden");
  finalScore.textContent = score;
  document.querySelectorAll(".emoji").forEach(e => e.remove());
}

function restartGame() {
  score = 0;
  lives = 3;
  fallSpeed = 2;
  emojiInterval = 1000;
  scoreDisplay.textContent = score;
  livesDisplay.textContent = lives;
  gameOverScreen.classList.add("hidden");
  startCountdown();
}

function resetInterval() {
  clearInterval(emojiSpawner);
  emojiSpawner = setInterval(createEmoji, emojiInterval);
}

function startCountdown() {
  let count = 3;
  countdownDisplay.textContent = count;
  countdownDisplay.classList.remove("hidden");

  const countdownInterval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownDisplay.textContent = count;
    } else {
      clearInterval(countdownInterval);
      countdownDisplay.classList.add("hidden");
      startGame();
    }
  }, 1000);
}

function startGame() {
  emojiSpawner = setInterval(createEmoji, emojiInterval);
}

// Start on first load
window.onload = () => {
  startCountdown();
};
