const board = document.getElementById("board");
const turnInfo = document.getElementById("turnInfo");
const questionBox = document.getElementById("questionBox");
const somAcerto = document.getElementById("somAcerto");
const somErro = document.getElementById("somErro");

let currentPlayer = 0;
let positions = [0, 0];
const totalSquares = 30;

for (let i = 1; i <= totalSquares; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.textContent = i;
    board.appendChild(square);
}

function updateBoard() {
    const squares = document.querySelectorAll(".square");
    squares.forEach((s, i) => {
        s.classList.remove("active", "player1", "player2");
        if (positions[0] - 1 === i) s.classList.add("active", "player1");
        if (positions[1] - 1 === i) s.classList.add("active", "player2");
    });
}

function rollDice() {
    const roll = Math.floor(Math.random() * 6) + 1;
    turnInfo.textContent = `Jogador ${currentPlayer + 1} tirou ${roll}`;
    showQuestion(roll);
}

function showQuestion(roll) {
    const pergunta = perguntas[Math.floor(Math.random() * perguntas.length)];
    questionBox.innerHTML = `<p>${pergunta.pergunta}</p>`;
    pergunta.opcoes.forEach(opcao => {
        const btn = document.createElement("button");
        btn.textContent = opcao;
        btn.onclick = () => checkAnswer(opcao, pergunta.resposta, roll);
        questionBox.appendChild(btn);
    });
}

function checkAnswer(resposta, correta, roll) {
    if (resposta === correta) {
        turnInfo.textContent = `Jogador ${currentPlayer + 1} acertou! Avançou 1 casa.`;
        positions[currentPlayer] += 1;
        somAcerto.play();
    } else {
        turnInfo.textContent = `Jogador ${currentPlayer + 1} errou! Voltou 2 casas.`;
        positions[currentPlayer] -= 2;
        if (positions[currentPlayer] < 0) positions[currentPlayer] = 0;
        somErro.play();
    }

    questionBox.innerHTML = "";

    if (positions[currentPlayer] >= totalSquares) {
        alert(`Jogador ${currentPlayer + 1} venceu!`);
        reiniciarJogo();
        return;
    }

    updateBoard();
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    turnInfo.textContent += ` Agora é a vez do Jogador ${currentPlayer + 1}.`;
}

function reiniciarJogo() {
    positions = [0, 0];
    currentPlayer = 0;
    updateBoard();
    turnInfo.textContent = "Clique em 'Jogar dado' para começar";
    questionBox.innerHTML = "";
}
