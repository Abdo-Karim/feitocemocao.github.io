
const board = document.getElementById("board");
const turnInfo = document.getElementById("turnInfo");
const questionBox = document.getElementById("questionBox");
const questionText = document.getElementById("questionText");
const answersDiv = document.getElementById("answers");
const acertoSom = document.getElementById("acerto");
const erroSom = document.getElementById("erro");

let currentPlayer = 0;
let positions = [0, 0];
const totalSquares = 30;

function createBoard() {
    for (let i = 1; i <= totalSquares; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.textContent = i;
        board.appendChild(square);
    }
}

function updateBoard() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(s => s.classList.remove("active"));
    positions.forEach((pos, index) => {
        if (pos > 0 && pos <= totalSquares) {
            squares[pos - 1].classList.add("active");
        }
    });
}

function rollDice() {
    if (questionBox.style.display === "block") return;
    const roll = Math.floor(Math.random() * 6) + 1;
    turnInfo.textContent = `Jogador ${currentPlayer + 1} tirou ${roll}`;
    askQuestion(roll);
}

function askQuestion(roll) {
    questionBox.style.display = "block";
    const q = perguntas[Math.floor(Math.random() * perguntas.length)];
    questionText.textContent = q.pergunta;
    answersDiv.innerHTML = "";

    q.opcoes.forEach(op => {
        const btn = document.createElement("button");
        btn.textContent = op;
        btn.onclick = () => checkAnswer(op, q.resposta, roll);
        answersDiv.appendChild(btn);
    });
}

function checkAnswer(resposta, correta, roll) {
    questionBox.style.display = "none";
    if (resposta === correta) {
        positions[currentPlayer] += 1;
        acertoSom.play();
        turnInfo.textContent += " - Acertou! Avançou 1 casa.";
    } else {
        positions[currentPlayer] = Math.max(0, positions[currentPlayer] - 2);
        erroSom.play();
        turnInfo.textContent += " - Errou! Voltou 2 casas.";
    }

    updateBoard();

    if (positions[currentPlayer] >= totalSquares) {
        alert(`Jogador ${currentPlayer + 1} venceu!`);
        positions = [0, 0];
        updateBoard();
    }

    currentPlayer = (currentPlayer + 1) % 2;
}
createBoard();
