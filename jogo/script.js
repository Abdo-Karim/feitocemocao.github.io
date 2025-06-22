
const board = document.getElementById("board");
const turnInfo = document.getElementById("turnInfo");
const questionBox = document.getElementById("questionBox");
const diceResult = document.getElementById("diceResult");
const acertoAudio = document.getElementById("acertoAudio");
const erroAudio = document.getElementById("erroAudio");

let currentPlayer = 1;
let positions = [0, 0];
const totalSquares = 30;

function createBoard() {
    board.innerHTML = "";
    for (let i = 1; i <= totalSquares; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.textContent = i;
        board.appendChild(square);
    }
}
createBoard();

function updateBoard() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(s => {
        s.classList.remove("player1", "player2");
    });
    if (positions[0] > 0 && positions[0] <= totalSquares) {
        squares[positions[0] - 1].classList.add("player1");
    }
    if (positions[1] > 0 && positions[1] <= totalSquares) {
        squares[positions[1] - 1].classList.add("player2");
    }
}

function rollDice() {
    const roll = Math.floor(Math.random() * 6) + 1;
    diceResult.textContent = `🎲 Número tirado: ${roll}`;
    turnInfo.textContent = `Jogador ${currentPlayer}, responda:`;

    const perguntaAtual = perguntas[Math.floor(Math.random() * perguntas.length)];
    questionBox.innerHTML = "<p>" + perguntaAtual.pergunta + "</p>";
    perguntaAtual.opcoes.forEach(op => {
        const btn = document.createElement("button");
        btn.textContent = op;
        btn.onclick = () => {
            if (op === perguntaAtual.resposta) {
                acertoAudio.play();
                positions[currentPlayer - 1] += 1;
                alert("Acertou! Avance 1 casa.");
            } else {
                erroAudio.play();
                positions[currentPlayer - 1] -= 2;
                if (positions[currentPlayer - 1] < 0) positions[currentPlayer - 1] = 0;
                alert("Errou! Volte 2 casas.");
            }

            if (positions[currentPlayer - 1] >= totalSquares) {
                alert(`🎉 Jogador ${currentPlayer} venceu!`);
                reiniciarJogo();
                return;
            }

            updateBoard();
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            turnInfo.textContent = `Agora é a vez do Jogador ${currentPlayer}`;
            questionBox.innerHTML = "";
            diceResult.textContent = "";
        };
        questionBox.appendChild(btn);
    });
}

function reiniciarJogo() {
    positions = [0, 0];
    currentPlayer = 1;
    updateBoard();
    turnInfo.textContent = "Clique para jogar 🎲";
    diceResult.textContent = "";
    questionBox.innerHTML = "";
}
