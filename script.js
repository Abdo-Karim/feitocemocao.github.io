
const board = document.getElementById("board");
const turnInfo = document.getElementById("turnInfo");
const questionBox = document.getElementById("questionBox");
const timer = document.getElementById("timer");
const soundAcerto = document.getElementById("soundAcerto");
const soundErro = document.getElementById("soundErro");

let currentPlayer = 1;
let positions = [0, 0];
const totalSquares = 30;
let tempo = 0;
let interval;

function startTimer() {
    if (interval) clearInterval(interval);
    tempo = 0;
    interval = setInterval(() => {
        tempo++;
        const min = String(Math.floor(tempo / 60)).padStart(2, '0');
        const sec = String(tempo % 60).padStart(2, '0');
        timer.textContent = `⏱️ ${min}:${sec}`;
    }, 1000);
}

function createBoard() {
    board.innerHTML = "";
    for (let i = 1; i <= totalSquares; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        if (i === 1) square.classList.add("start");
        if (i === totalSquares) square.classList.add("end");
        square.textContent = i;
        board.appendChild(square);
    }
}
function updateBoard() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(s => s.classList.remove("active"));
    if (positions[0] > 0 && positions[0] <= totalSquares) squares[positions[0] - 1].classList.add("active");
    if (positions[1] > 0 && positions[1] <= totalSquares) squares[positions[1] - 1].classList.add("active");
}

function rollDice() {
    const roll = Math.floor(Math.random() * 6) + 1;
    turnInfo.textContent = `🎲 Jogador ${currentPlayer} tirou ${roll}`;
    positions[currentPlayer - 1] += roll;
    if (positions[currentPlayer - 1] > totalSquares) positions[currentPlayer - 1] = totalSquares;
    updateBoard();
    showQuestion(roll);
}

function showQuestion(roll) {
    const perguntaIndex = Math.floor(Math.random() * perguntas.length);
    const pergunta = perguntas[perguntaIndex];
    const resposta = prompt(pergunta.pergunta);
    if (resposta !== null && resposta.trim().toLowerCase() === pergunta.resposta.toLowerCase()) {
        questionBox.textContent = "✅ Acertou!";
        soundAcerto.play();
    } else {
        questionBox.textContent = "❌ Errou! Volta uma casa.";
        positions[currentPlayer - 1] = Math.max(positions[currentPlayer - 1] - 1, 0);
        updateBoard();
        soundErro.play();
    }
    if (positions[currentPlayer - 1] === totalSquares) {
        alert(`🎉 Jogador ${currentPlayer} venceu!`);
        restartGame();
        return;
    }
    currentPlayer = currentPlayer === 1 ? 2 : 1;
}

function restartGame() {
    positions = [0, 0];
    currentPlayer = 1;
    updateBoard();
    turnInfo.textContent = "Clique para jogar 🎲";
    questionBox.textContent = "";
    startTimer();
}

createBoard();
startTimer();
