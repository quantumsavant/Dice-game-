// 1. Get references to the HTML elements
const scoreDisplay = document.getElementById('current-score');
const diceVisual = document.getElementById('dice-visual');
const rollButton = document.getElementById('roll-button');
const messageElement = document.getElementById('message');

let currentScore = 0;

// Array mapping dice values (1-6) to FontAwesome classes
const diceClasses = {
  1: 'fa-dice-one',
  2: 'fa-dice-two',
  3: 'fa-dice-three',
  4: 'fa-dice-four',
  5: 'fa-dice-five',
  6: 'fa-dice-six'
};

/**
 * Simulates a dice roll, updates the visual, and calculates the score.
 */
function rollDice() {
  // 1. Generate a random number between 1 and 6 (inclusive)
  const rollValue = Math.floor(Math.random() * 6) + 1;

  // 2. Update the dice visual
  updateDiceVisual(rollValue);

  // 3. Game Logic: Check for a '1'
  if (rollValue === 1) {
    // Lose condition: Reset score and show message
    currentScore = 0;
    messageElement.textContent = "Bummer! You rolled a 1. Score reset!";
    // Disable the button temporarily to prevent spamming
    rollButton.disabled = true;
    setTimeout(() => {
      rollButton.disabled = false;
    }, 1500); // Re-enable after 1.5 seconds
  } else {
    // Success condition: Add to score and show message
    currentScore += rollValue;
    messageElement.textContent = `You rolled a ${rollValue}. Keep going!`;
  }

  // 4. Update the score display
  scoreDisplay.textContent = currentScore;
}

/**
 * Handles the visual update of the dice icon.
 * @param {number} value - The number rolled (1-6).
 */
function updateDiceVisual(value) {
  // Remove all existing dice classes (fa-dice-one, fa-dice-two, etc.)
  for (let i = 1; i <= 6; i++) {
    diceVisual.classList.remove(diceClasses[i]);
  }

  // Add the class corresponding to the rolled value
  diceVisual.classList.add(diceClasses[value]);

  // Add a quick 'roll' animation effect (a tiny shake)
  diceVisual.style.transform = 'rotate(360deg)';
  setTimeout(() => {
    diceVisual.style.transform = 'rotate(0deg)';
  }, 100);
}

// 5. Attach the rollDice function to the button click event
rollButton.addEventListener('click', rollDice);

// Set initial message
messageElement.textContent = "Click 'Roll Dice!' to start.";

// Initialize the dice to show '1' when the page loads
updateDiceVisual(1);