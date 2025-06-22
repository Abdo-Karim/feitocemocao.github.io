
const board = document.getElementById("board");
const turnInfo = document.getElementById("turnInfo");
const questionBox = document.getElementById("questionBox");

let currentPlayer = 1;
let positions = [0, 0];
let totalSquares = 30;
let currentRoll = 0;

let correctSound = new Audio("correct.mp3");
let wrongSound = new Audio("wrong.mp3");

function createBoard() {
    board.innerHTML = "";
    for (let i = 1; i <= totalSquares; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.textContent = i;
        board.appendChild(square);
    }
}

function updateBoard() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(sq => sq.classList.remove("active"));
    if (positions[0] < totalSquares) squares[positions[0] - 1]?.classList.add("active");
    if (positions[1] < totalSquares) squares[positions[1] - 1]?.classList.add("active");
}

function rollDice() {
    currentRoll = Math.floor(Math.random() * 6) + 1;
    askQuestion();
}

function askQuestion() {
    const perguntaObj = perguntas[Math.floor(Math.random() * perguntas.length)];
    questionBox.innerHTML = `<p>${perguntaObj.pergunta}</p>`;
    perguntaObj.opcoes.forEach(opcao => {
        const btn = document.createElement("button");
        btn.textContent = opcao;
        btn.onclick = () => checkAnswer(opcao, perguntaObj.resposta);
        questionBox.appendChild(btn);
    });
}

function checkAnswer(resposta, correta) {
    if (resposta === correta) {
        correctSound.play();
        positions[currentPlayer - 1] += 1;
        alert("Acertou! Avance 1 casa.");
    } else {
        wrongSound.play();
        positions[currentPlayer - 1] -= 2;
        if (positions[currentPlayer - 1] < 0) positions[currentPlayer - 1] = 0;
        alert("Errou! Volte 2 casas.");
    }

    if (positions[currentPlayer - 1] >= totalSquares) {
        alert(`Jogador ${currentPlayer} venceu!`);
        resetGame();
        return;
    }

    updateBoard();
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    turnInfo.textContent = `Jogador ${currentPlayer}, é a sua vez!`;
    questionBox.innerHTML = "";
}

function resetGame() {
    positions = [0, 0];
    currentPlayer = 1;
    turnInfo.textContent = "Jogador 1, é a sua vez!";
    updateBoard();
    questionBox.innerHTML = "";
}

createBoard();
updateBoard();
