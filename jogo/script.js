
const board = document.getElementById("board");
const turnInfo = document.getElementById("turnInfo");
const questionBox = document.getElementById("questionBox");
let currentPlayer = 1;
let positions = [0, 0];
let totalSquares = 30;

for (let i = 1; i <= totalSquares; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.textContent = i;
    board.appendChild(square);
}

function updateBoard() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(s => s.classList.remove("active"));
    if (positions[0] < totalSquares) squares[positions[0] - 1].classList.add("active");
    if (positions[1] < totalSquares) squares[positions[1] - 1].classList.add("active");
}

function rollDice() {
    const roll = Math.floor(Math.random() * 6) + 1;
    turnInfo.textContent = `Jogador ${currentPlayer} tirou ${roll}`;
    positions[currentPlayer - 1] += roll;
    if (positions[currentPlayer - 1] >= totalSquares) {
        alert(`Jogador ${currentPlayer} venceu!`);
        positions = [0, 0];
    }
    updateBoard();
    currentPlayer = currentPlayer === 1 ? 2 : 1;
}
