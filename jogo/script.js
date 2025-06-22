
const board = document.getElementById("board");
const turnInfo = document.getElementById("turnInfo");
const questionBox = document.getElementById("questionBox");
const diceResult = document.getElementById("diceResult");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");

let currentPlayer = 1;
let positions = [0, 0];
const totalSquares = 30;

function setupBoard() {
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
    squares.forEach(s => s.classList.remove("active"));
    if (positions[0] > 0 && positions[0] <= totalSquares)
        squares[positions[0] - 1].classList.add("active");
    if (positions[1] > 0 && positions[1] <= totalSquares)
        squares[positions[1] - 1].classList.add("active");
}

function rollDice() {
    const roll = Math.floor(Math.random() * 6) + 1;
    diceResult.textContent = `🎲 Jogador ${currentPlayer} tirou ${roll}`;

    askQuestion(roll);
}

function askQuestion(roll) {
    const perguntaAtual = perguntas[Math.floor(Math.random() * perguntas.length)];
    questionBox.innerHTML = `<p>${perguntaAtual.pergunta}</p>`;

    perguntaAtual.opcoes.forEach(opcao => {
        const button = document.createElement("button");
        button.textContent = opcao;
        button.onclick = () => {
            if (opcao === perguntaAtual.resposta) {
                correctSound.play();
                positions[currentPlayer - 1] += 1;
            } else {
                wrongSound.play();
                positions[currentPlayer - 1] = Math.max(0, positions[currentPlayer - 1] - 2);
            }
            positions[currentPlayer - 1] += roll;
            if (positions[currentPlayer - 1] >= totalSquares) {
                alert(`🏁 Jogador ${currentPlayer} venceu!`);
                restartGame();
                return;
            }
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            turnInfo.textContent = `Jogador ${currentPlayer}, sua vez`;
            updateBoard();
            questionBox.innerHTML = "";
        };
        questionBox.appendChild(button);
    });
}

function restartGame() {
    positions = [0, 0];
    currentPlayer = 1;
    turnInfo.textContent = "Jogador 1, sua vez";
    updateBoard();
    questionBox.innerHTML = "";
    diceResult.textContent = "";
}

setupBoard();
updateBoard();
