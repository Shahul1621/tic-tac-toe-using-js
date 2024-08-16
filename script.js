const board = document.getElementById('game-board');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restart-btn');

let currentPlayer = 'X';
let gameActive = true;
const cells = [];

function initializeBoard() {
    board.innerHTML = '';
    cells.length = 0;

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleClick);
        board.appendChild(cell);
        cells.push(cell);
    }

    status.textContent = `Player ${currentPlayer}'s turn`;
}

function handleClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (cell.textContent || !gameActive) return;

    cell.textContent = currentPlayer;

    if (checkWin()) {
        status.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (cells.every(cell => cell.textContent)) {
        status.textContent = 'It\'s a draw!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal
        [2, 4, 6]  // Diagonal
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
    });
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    initializeBoard();
}

restartBtn.addEventListener('click', restartGame);

// Initialize the board on page load
initializeBoard();
