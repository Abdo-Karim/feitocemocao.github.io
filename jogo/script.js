
const board = document.getElementById("board");
const turnInfo = document.getElementById("turnInfo");
const questionBox = document.getElementById("questionBox");

let currentPlayer = 1;
let positions = [0, 0];
const totalSquares = 30;

const acertoSom = new Audio("acerto.mp3");
const erroSom = new Audio("erro.mp3");

for (let i = 1; i <= totalSquares; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.textContent = i;
    board.appendChild(square);
}

function updateBoard() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(s => s.classList.remove("active1", "active2"));
    if (positions[0] > 0 && positions[0] <= totalSquares) squares[positions[0] - 1].classList.add("active1");
    if (positions[1] > 0 && positions[1] <= totalSquares) squares[positions[1] - 1].classList.add("active2");
}

function rollDice() {
    if (questionBox.innerHTML !== "") return;
    const roll = Math.floor(Math.random() * 6) + 1;
    turnInfo.textContent = `Jogador ${currentPlayer} tirou ${roll}`;
    askQuestion(roll);
}

function askQuestion(roll) {
    const pergunta = perguntas[Math.floor(Math.random() * perguntas.length)];
    let html = `<p>${pergunta.pergunta}</p>`;
    pergunta.opcoes.forEach(opcao => {
        html += `<button onclick="checkAnswer('${opcao}', '${pergunta.resposta}', ${roll})">${opcao}</button>`;
    });
    questionBox.innerHTML = html;
}

function checkAnswer(resposta, correta, roll) {
    if (resposta === correta) {
        positions[currentPlayer - 1] += 1;
        acertoSom.play();
    } else {
        positions[currentPlayer - 1] = Math.max(positions[currentPlayer - 1] - 2, 0);
        erroSom.play();
    }
    questionBox.innerHTML = "";
    updateBoard();
    if (positions[currentPlayer - 1] >= totalSquares) {
        alert(`Jogador ${currentPlayer} venceu!`);
        positions = [0, 0];
    }
    currentPlayer = currentPlayer === 1 ? 2 : 1;
}
