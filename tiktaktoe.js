// Selecting all box elements with the class "box"
let boxes = document.querySelectorAll(".box");

// Selecting the reset button
let resetBtn = document.querySelector("#reset-btn");

// Selecting the new game button
let newGameBtn = document.querySelector("#new-btn");

// Selecting the container where the winning/draw message will be shown
let msgContainer = document.querySelector(".msg-container");

// Selecting the actual message element inside the container
let msg = document.querySelector("#msg");

// Initial turn set to true (Player O starts)
let turnO = true;

// Move counter to track number of moves for draw condition
let count = 0;

// All possible winning combinations (by box index positions)
const winPatterns = [
  [0, 1, 2], // First row
  [0, 3, 6], // First column
  [0, 4, 8], // Diagonal from top-left
  [1, 4, 7], // Second column
  [2, 5, 8], // Third column
  [2, 4, 6], // Diagonal from top-right
  [3, 4, 5], // Second row
  [6, 7, 8], // Third row
];

// Function to reset game state
const resetGame = () => {
  turnO = true; // Reset to player O's turn
  count = 0; // Reset move count
  enableBoxes(); // Enable all boxes and clear text
  msgContainer.classList.add("hide"); // Hide the message container
};

// Loop through all boxes and add a click event listener
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // If the box is already filled, exit early to prevent overwriting
    if (box.innerText !== "") return;

    // Check who's turn it is and update box accordingly
    if (turnO) {
      box.innerText = "O"; // Player O's move
      turnO = false; // Switch turn to player X
    } else {
      box.innerText = "X"; // Player X's move
      turnO = true; // Switch turn to player O
    }

    // Disable the box so it can't be clicked again
    box.disabled = true;

    // Increase move count
    count++;

    // Check if there's a winner after this move
    let isWinner = checkWinner();

    // If all 9 boxes are filled and no winner, it's a draw
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

// Function to handle a draw game
const gameDraw = () => {
  msg.innerText = `It's a Draw.`; // Show draw message
  msgContainer.classList.remove("hide"); // Make message container visible
  disableBoxes(); // Disable all boxes
};

// Function to disable all boxes (end the game)
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true; // Disable each box
  }
};

// Function to enable all boxes and clear them (start new game)
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false; // Enable each box
    box.innerText = ""; // Clear box text
  }
};

// Function to show the winner message
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`; // Show who won
  msgContainer.classList.remove("hide"); // Make message visible
  disableBoxes(); // Stop further moves
};

// Function to check if there's a winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    // Get values from the pattern's 3 box positions
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    // Check if all 3 boxes are not empty and have the same value
    if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val); // Show winner message
      return true; // Return true indicating we have a winner
    }
  }
  return false; // No winner found
};

// Add click event listeners to both buttons to reset the game
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
