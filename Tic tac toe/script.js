const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('gameBoard');
const winningMessageTextElement = document.getElementById('winningMessageText');
const restartButton = document.getElementById('restartButton');
const xWinsElement = document.getElementById('xWins');
const oWinsElement = document.getElementById('oWins');
const tiesElement = document.getElementById('ties');
let xWins = 0;
let oWins = 0;
let ties = 0;
let oTurn;
let gameOver;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    oTurn = false;
    gameOver = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.textContent = '';
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    winningMessageTextElement.innerText = '';
    winningMessageTextElement.style.opacity = '0';
}

function handleClick(e) {
    if (gameOver) return;
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
        updateScoreboard(currentClass);
    } else if (isDraw()) {
        endGame(true);
        updateScoreboard('tie');
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    gameOver = true;
    winningMessageTextElement.style.opacity = '1';
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!';
    } else {
        winningMessageTextElement.innerText = `${oTurn ? "O's" : "X's"} Wins!`;
    }
}

function updateScoreboard(winner) {
    if (winner === X_CLASS) {
        xWins++;
        xWinsElement.innerText = `X Wins: ${xWins}`;
    } else if (winner === O_CLASS) {
        oWins++;
        oWinsElement.innerText = `O Wins: ${oWins}`;
    } else if (winner === 'tie') {
        ties++;
        tiesElement.innerText = `Ties: ${ties}`;
    }
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.textContent = currentClass.toUpperCase();
}

function swapTurns() {
    oTurn = !oTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (oTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}