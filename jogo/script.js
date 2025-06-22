
const board = document.getElementById("board");
const turnInfo = document.getElementById("turnInfo");
const questionBox = document.getElementById("questionBox");
const questionText = document.getElementById("questionText");
const answersDiv = document.getElementById("answers");

const totalSquares = 30;
let currentPlayer = 1;
let positions = [0, 0];

const acertoSom = document.getElementById("acerto");
const erroSom = document.getElementById("erro");

for (let i = 1; i <= totalSquares; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.textContent = i;
    board.appendChild(square);
}

function updateBoard() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(s => s.classList.remove("active1", "active2"));
    if (positions[0] > 0 && positions[0] <= totalSquares)
        squares[positions[0] - 1].classList.add("active1");
    if (positions[1] > 0 && positions[1] <= totalSquares)
        squares[positions[1] - 1].classList.add("active2");
}

function rollDice() {
    const roll = Math.floor(Math.random() * 6) + 1;
    const playerIndex = currentPlayer - 1;
    let newPosition = positions[playerIndex] + roll;

    if (newPosition > totalSquares) {
        turnInfo.textContent = `Jogador ${currentPlayer} tirou ${roll}, mas não pode se mover.`;
        switchPlayer();
        return;
    }

    positions[playerIndex] = newPosition;
    updateBoard();
    showQuestion(playerIndex);
}

function showQuestion(playerIndex) {
    const pergunta = perguntas[Math.floor(Math.random() * perguntas.length)];
    questionBox.classList.remove("hidden");
    questionText.textContent = pergunta.pergunta;
    answersDiv.innerHTML = "";

    pergunta.opcoes.forEach(opcao => {
        const btn = document.createElement("button");
        btn.textContent = opcao;
        btn.onclick = () => {
            if (opcao === pergunta.resposta) {
                acertoSom.play();
                positions[playerIndex]++;
                if (positions[playerIndex] >= totalSquares) {
                    alert(`🎉 Jogador ${playerIndex + 1} venceu!`);
                    resetGame();
                    return;
                }
                turnInfo.textContent = `Jogador ${playerIndex + 1} acertou! Avançou 1 casa.`;
            } else {
                erroSom.play();
                positions[playerIndex] = Math.max(positions[playerIndex] - 2, 0);
                turnInfo.textContent = `Jogador ${playerIndex + 1} errou! Voltou 2 casas.`;
            }
            updateBoard();
            questionBox.classList.add("hidden");
            switchPlayer();
        };
        answersDiv.appendChild(btn);
    });
}

function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    turnInfo.textContent += ` Agora é a vez do Jogador ${currentPlayer}.`;
}

function resetGame() {
    positions = [0, 0];
    currentPlayer = 1;
    updateBoard();
    turnInfo.textContent = "Clique em Jogar Dado";
    questionBox.classList.add("hidden");
}
